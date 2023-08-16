<template>
  <section class="mb-11 lg:mb-0">
    <div
      :class="[
        display === 'list' && 'container min-h-screen',
        ['grid', 'map'].includes(display)
          ? 'h-[calc(100vh_-_(80px_+_108px))] overflow-y-hidden'
          : '',
      ]"
      class="relative flex flex-col w-full lg:flex-row"
    >
      <div
        class="w-full px-3 pt-8"
        :class="[
          display === 'grid' &&
            'w-full lg:w-1/2 lg:h-full bg-white lg:overflow-y-scroll',
          display === 'map' && 'opacity-0 absolute -left-full',
          display === 'list' && 'w-full',
        ]"
      >
        <LazyHydrate when-visible>
          <!-- <LazyCommonLoadersLoaderLayout :data-length="projects.length">
            <template #loader> -->
          <div
            v-if="!projects.length"
            class="grid w-full min-h-full grid-cols-1 md:grid-cols-2 gap-x-4"
            :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'"
          >
            <CommonProjectCardSkeleton v-for="n in 6" :key="n" />
          </div>
          <!-- </template> -->
          <div
            v-else
            :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'"
            class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-4"
          >
            <ProjectsProjectCard
              v-for="project in projects"
              :key="project.slug"
              :project="project"
              @mouseenter.native="panTo(polyCenter(project.coords))"
              preventRouting
              @openDrawer="openDrawer(project)"
            />
          </div>
          <!-- </LazyCommonLoadersLoaderLayout> -->
        </LazyHydrate>

        <!-- <div class="flex items-center justify-center w-full mt-6">
          <CommonListingPagination
            v-show="projects.length"
            :total-pages="meta.last_page"
            :current-page="meta.current_page"
          />
        </div> -->
      </div>
      <div
        v-show="display != 'list'"
        :class="
          display == 'map'
            ? 'w-full top-0 ltr:right-0 bottom-0 rtl:left-0'
            : 'w-full lg:w-1/2'
        "
        class="order-first h-[calc(100vh_-_215px)] lg:h-[calc(100vh_-_(80px_+_108px))] px-4 transition-all duration-150 mt-6 lg:mt-0 bg-white lg:absolute ltr:right-0 rtl:left-0 lg:px-0 lg:order-last"
      >
        <client-only>
          <GmapMap
            ref="gmap"
            :center="{ lat: 30.0074, lng: 31.4913 }"
            :zoom="mapZoom"
            :options="defaultOptions"
            map-type-id="terrain"
            class="relative w-full h-full"
            @zoom_changed="mapZoom = $event"
            @tilesloaded="tilesloadedEvent"
          >
            <template #visible>
              <CommonMapsZoom
                v-model="mapZoom"
                class="absolute -translate-y-1/2 top-1/2"
              />
            </template>
            <gmap-info-window
              :options="infoOptions"
              :position="projectInfoPosition"
              :opened="projectInfoOpened"
            >
              <div v-show="projectInfoOpened && selectedMark.id">
                <ProjectsProjectMapCard
                  :project="selectedMark"
                  @closeCard="projectInfoOpened = false"
                />
              </div>
            </gmap-info-window>

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
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'
import { debounce } from '~/helpers'

export default Vue.extend({
  data() {
    return {
      title: '',
      mapZoom: 14,
      page: 1,
      defaultOptions: {
        zoomControl: false,
        fullscreenControl: false,
        scaleControl: true,
        disableDefaultUI: true,
        scrollwheel: true,
        mapTypeControl: true,
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
      bounds: {},
    }
  },
  computed: {
    filteredProjects() {
      if (this.$store.state.search.projects.length) {
        return this.$store.state.search?.projects?.filter(p => p.coords?.length)
      }
      return []
    },
    projects(): Project[] {
      return this.$store.state.search.projects
    },
    meta(): Meta {
      // return this.$store.state.project.meta
      return this.$store.state.search.meta
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
  // async mounted() {
  //   this.$router.push({
  //     query: { page: `1` },
  //   })
  //   this.page = +(this.$route.query.page ? this.$route.query.page : 1) as number
  //   this.$store.commit('CHANGE_LOADING', true)
  //   this.$store.commit('SET_MODAL', '')
  //   await this.$store.dispatch('search/getItems', {
  //     milliSearch_api_key: process.env.API_KEY,
  //     page: this.page,
  //     per_page: 25,
  //   } as RequestPayload<ProjectAllowedInclude[]>)

  //   this.$store.commit('CHANGE_LOADING', false)
  // },
  created() {
    ;(this as any).getDataWithBounds = debounce(() => {
      this.$store.dispatch('search/getItems', {
        bounds: this.bounds,
        per_page: 10,
      } as RequestPayload<ProjectAllowedInclude[]>)
    }, 500)
  },
  methods: {
    async panTo(item) {
      await this.$refs.gmap.$mapPromise.then(map => {
        map.panTo({ lat: parseFloat(item.lat), lng: parseFloat(item.lng) })
        this.mapZoom = 14
      })
    },
    closeProjectModal() {
      this.closeModal = true
    },
    openDrawer(project: Project) {
      console.log('project')

      this.selectedMark = project
      this.$store.commit('SET_MODAL', 'ProjectDrawer')
    },
    polyHandler(project: any) {
      this.closeModal = false

      this.selectedMark = project
      this.$store.commit('SET_MODAL', 'ProjectDrawer')
      this.projectInfoOpened = true
      this.projectInfoPosition = this.polyCenter(project?.coords)
    },

    loadMore(value: number) {
      this.page = value
      // this.$store.commit('CHANGE_LOADING', true)
      // await this.$store.dispatch('project/getProjects', {
      //   page: this.page,
      //   include: [
      //     'developer',
      //     'developerCount',
      //     'location',
      //     'locationCount',
      //     'amenities',
      //     'amenitiesCount',
      //     'unitTypes',
      //     'unitTypesCount',
      //     'units',
      //     'unitsCount',
      //     'landmarks',
      //     'roads',
      //   ],
      //   // filters: [{ key: 'name', value: 'water' }],
      //   per_page: 27,
      // } as RequestPayload<ProjectAllowedInclude[]>)
      // this.$store.commit('CHANGE_LOADING', false)
    },
    tilesloadedEvent() {
      this.$refs.gmap.$mapObject.getCenter()
      this.$refs.gmap.$mapObject.getZoom()
      this.$refs.gmap.$mapObject.getBounds().toJSON()
    },
    async mapDragged() {
      const bounds = this?.$refs?.gmap?.$mapObject?.getBounds()
      if (bounds) {
        const northEast = bounds.getNorthEast() // Get the top-right coordinate
        const southWest = bounds.getSouthWest() // Get the bottom-left coordinate
        this.bounds.northEast = [northEast.lat(), northEast.lng()]
        this.bounds.southWest = [southWest.lat(), southWest.lng()]
        this.getDataWithBounds()
      }
    },
  },
})
</script>
