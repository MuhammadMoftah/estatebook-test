<template>
  <div>
    <div
      :class="[
        display === 'map' && 'overflow-hidden',
        display === 'list' && 'container ',
      ]"
      class="relative flex flex-col w-full min-h-screen lg:flex-row"
    >
      <div
        class="w-full px-3 pt-20"
        :class="[
          display === 'grid' &&
            'w-full lg:w-1/2 bg-white lg:overflow-y-scroll lg:h-screen',
          display === 'map' && 'opacity-0 h-screen absolute -left-full',
          display === 'list' && 'w-full pt-12',
        ]"
      >
        <CommonPageBreadcrumb
          :breadcrumb-links="[
            {
              id: 1,
              name: $t('home'),
              link: localePath('/'),
              active: false,
            },
            {
              id: 2,
              name: $t('projects'),
              link: localePath('/projects'),
              active: true,
            },
          ]"
        />
        <CommonPageHeader
          :title="$t('projects')"
          :placeholder="$t('search_for_projects')"
          store-path="project/getProjects"
          :sort-types="sortTypes"
          :enable-sort="false"
        />

        <CommonLoadersLoaderLayout :data-length="projects.length">
          <template #loader>
            <div
              class="grid w-full min-h-screen grid-cols-1 md:grid-cols-2 gap-x-4"
              :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'"
            >
              <CommonProjectCardSkeleton v-for="n in 6" :key="n" />
            </div>
          </template>
          <div
            :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'"
            class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-4"
          >
            <ProjectsProjectCard
              v-for="project in projects"
              :key="project.slug"
              :project="project"
              @click.native="
                $router.push(localePath(`/projects/${project.slug}`))
              "
            />
          </div>
        </CommonLoadersLoaderLayout>
        <div class="flex items-center justify-center w-full mt-6">
          <CommonListingPagination
            v-if="projects.length"
            :total-pages="meta.last_page"
            :current-page="currentPage"
          />
        </div>
      </div>
      <div
        v-if="display != 'list'"
        :class="
          display == 'map'
            ? 'w-full top-0 ltr:right-0 bottom-0 rtl:left-0'
            : 'w-full lg:w-1/2'
        "
        class="order-first hidden lg:flex h-[40vh] lg:h-screen px-4 transition-all duration-150 mt-6 lg:mt-0 bg-white lg:absolute ltr:right-0 rtl:left-0 lg:px-0 lg:order-last"
      >
        <client-only>
          <GmapMap
            ref="gmap"
            :center="{ lat: 30.0074, lng: 31.4913 }"
            :zoom="mapZoom"
            :options="defaultOptions"
            map-type-id="terrain"
            class="w-full h-full"
            @zoom_changed="mapZoom = $event"
            @tilesloaded="tilesloadedEvent"
          >
            <!-- <template #visible>
              <CommonMapsZoom v-model="mapZoom" />
            </template> -->
            <gmap-info-window
              :options="infoOptions"
              :position="projectInfoPosition"
              :opened="projectInfoOpened"
            >
              <div v-if="projectInfoOpened && selectedMark.id">
                <ProjectsProjectMapCard
                  :project="selectedMark"
                  @closeCard="projectInfoOpened = false"
                />
              </div>
            </gmap-info-window>
            <!-- <gmap-polygon
              :path="[
                [
                  {
                    lat: 31.200281,
                    lng: 30.011915,
                  },
                  {
                    lat: 31.200409,
                    lng: 30.011913,
                  },
                  {
                    lat: 31.200409,
                    lng: 30.011758,
                  },
                  {
                    lat: 31.200337,
                    lng: 30.011764,
                  },
                  {
                    lat: 31.2003,
                    lng: 30.011798,
                  },
                  {
                    lat: 31.200276,
                    lng: 30.011844,
                  },
                ],
              ]"
              :options="{
                clickable: true,
                strokeColor: '#f00',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#f00',
                fillOpacity: 0.6,
              }"
            >
            </gmap-polygon> -->
            <gmap-polygon
              v-for="project in filteredProjects"
              :key="project.slug"
              :path="project?.coords"
              :options="{
                clickable: true,
                strokeColor: '#4CB087',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#4CB087',
                fillOpacity: 0.6,
              }"
              @click="polyHandler(project)"
            >
            </gmap-polygon>
          </GmapMap>
        </client-only>
      </div>

      <div v-if="!closeModal">
        <ProjectsProjectDrawer
          v-if="$store.state.modal == 'ProjectDrawer' && selectedMark"
          :project="selectedMark"
          @modalClosed="closeProjectModal"
        ></ProjectsProjectDrawer>
      </div>
    </div>
    <CommonToggleComponent />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'

export default Vue.extend({
  data() {
    return {
      title: '',
      mapZoom: 10,
      page: 1,
      defaultOptions: {
        zoomControl: false,
        fullscreenControl: false,
        scaleControl: true,
        disableDefaultUI: true,
        scrollwheel: true,
        gestureHandling: 'greedy',
        styles: mapStyles.styles,
      },
      selectedMark: {},
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: 0,
        },
      },
      projectInfoOpened: false,
      projectInfoPosition: null,
      closeModal: false,
    }
  },
  computed: {
    filteredProjects() {
      return this.$store.state.project.projects.filter(p => p.coords.length)
    },
    projects(): Project[] {
      return this.$store.state.project.projects
    },
    meta(): Meta {
      return this.$store.state.project.meta
    },
    loading() {
      return this.$store.state.loading
    },
    sortTypes() {
      return [
        { id: 1, name: 'Latest projects', value: 'latest_projects' },
        { id: 2, name: 'Lowest price', value: 'lowest_price' },
        { id: 3, name: 'Highest price', value: 'highest_price' },
      ]
    },
    display() {
      return this.$store.state.display
    },
    currentPage() {
      return +(this.$route.query.page ? this.$route.query.page : 1) as number
    },
  },
  watch: {
    $route: {
      handler(newVal) {
        const page = +(newVal?.query?.page ? newVal?.query?.page : 1) as number
        this.loadMore(page)
      },
      deep: true,
    },
  },
  async mounted() {
    this.page = +(this.$route.query.page ? this.$route.query.page : 1) as number
    this.$store.commit('CHANGE_LOADING', true)
    this.$store.commit('SET_MODAL', '')
    await this.$store.dispatch('project/getProjects', {
      page: this.page,
      include: [
        'developer',
        'developerCount',
        'location',
        'locationCount',
        'amenities',
        'amenitiesCount',
        'unitTypes',
        'unitTypesCount',
        'units',
        'unitsCount',
        'landmarks',
        'roads',
      ],
      // filters: [{ key: 'name', value: 'water' }],
      per_page: 27,
    } as RequestPayload<ProjectAllowedInclude[]>)
    this.$store.commit('CHANGE_LOADING', false)
  },
  methods: {
    closeProjectModal() {
      this.closeModal = true
    },
    polyHandler(project: any) {
      this.closeModal = false

      this.selectedMark = project
      this.$store.commit('SET_MODAL', 'ProjectDrawer')
      this.projectInfoOpened = true
      this.projectInfoPosition = this.polyCenter(project?.coords)
    },

    async loadMore(value: number) {
      this.page = value
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('project/getProjects', {
        page: this.page,
        include: [
          'developer',
          'developerCount',
          'location',
          'locationCount',
          'amenities',
          'amenitiesCount',
          'unitTypes',
          'unitTypesCount',
          'units',
          'unitsCount',
          'landmarks',
          'roads',
        ],
        // filters: [{ key: 'name', value: 'water' }],
        per_page: 27,
      } as RequestPayload<ProjectAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
    tilesloadedEvent() {
      this.$refs.gmap.$mapObject.getCenter()
      this.$refs.gmap.$mapObject.getZoom()
      this.$refs.gmap.$mapObject.getBounds().toJSON()
    },
    // mounted(){
    //   this.$refs.gmap.$mapPromise.then(map => {
    //   let bounds = new this.$refs.();
    //   for (let m of this.markers) {
    //     bounds.extend(m.position);
    //   }
    //   map.fitBounds(bounds);
    //   map.panToBounds(bounds);
    // });
    // }
  },
})
</script>
