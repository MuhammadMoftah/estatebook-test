<template>
  <section>
    <div
      :class="[
        display === 'map' && 'overflow-hidden',
        display === 'list' && 'container',
      ]"
      class="relative flex flex-col w-full min-h-screen lg:flex-row"
    >
      <div
        class="w-full px-3 pt-4"
        :class="[
          display === 'grid' &&
            'w-full lg:w-1/2 bg-white lg:overflow-y-scroll lg:h-screen',
          display === 'map' && 'opacity-0 h-screen absolute -left-full',

          display === 'list' && 'w-full',
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
              name: $t('neighbourhoods'),
              link: localePath('/neighborhoods'),
              active: true,
            },
          ]"
        />
        <CommonPageHeader
          :title="$t('neighbourhoods')"
          :placeholder="$t('search_for_neighbourhoods')"
          :sort-types="sortTypes"
          store-path="neighbourhood/getNeighbourhoods"
          :enable-sort="false"
        />

        <CommonLoadersLoaderLayout :data-length="neighbourhoods.length">
          <template #loader>
            <div
              :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-4'"
              class="grid w-full grid-cols-1 gap-4 my-4 md:grid-cols-2 sm:grid-cols-2"
            >
              <CommonNeighborhoodCardSkeleton v-for="n in 8" :key="n" />
            </div>
          </template>
          <div
            :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-4'"
            class="grid w-full grid-cols-1 gap-4 my-4 md:grid-cols-2 sm:grid-cols-2"
          >
            <NeighbourhoodsNeighborhoodCard
              v-for="(loc, i) in neighbourhoods"
              :key="loc.slug"
              :neighbourhood="loc"
              :class="
                display === 'list' && (i == 0 || i == 2 || i == 7 || i == 9)
                  ? 'row-span-2'
                  : 'h-[210px]'
              "
            />
          </div>
        </CommonLoadersLoaderLayout>
        <div class="flex items-center justify-center w-full mt-6">
          <CommonListingPagination
            v-if="neighbourhoods.length"
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
        <CommonGoogleMap
          :map-center="{ lat: 30.0074, lng: 31.4913 }"
          :default-map-zoom="8"
          page="neighborhoods"
          :items="filteredNeighbourhoods"
        />

        <!-- <client-only>
          <GmapMap
            ref="gmap"
            :center="{ lat: 30.0074, lng: 31.4913 }"
            :zoom="10"
            :options="defaultOptions"
            map-type-id="terrain"
            class="w-full h-full"
          >
            <gmap-polygon
              v-for="neighbourhood in filteredNeighbourhoods"
              :key="neighbourhood.slug"
              :path="neighbourhood?.coords"
              :options="{
                clickable: true,
                strokeColor: '#4CB087',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#4CB087',
                fillOpacity: 0.6,
              }"
              @click="polyHandler(neighbourhood)"
            >
            </gmap-polygon>
          </GmapMap>
        </client-only> -->
      </div>

      <LazyHydrate when-visible>
        <LazyNeighbourhoodsNeighborhoodDrawer
          v-if="$store.state.modal == 'NeighborhoodDrawer'"
        ></LazyNeighbourhoodsNeighborhoodDrawer>
      </LazyHydrate>
    </div>
    <CommonToggleComponent />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'

export default Vue.extend({
  data() {
    return {
      title: '',
      page: 1,
      defaultOptions: {
        zoomControl: true,
        scaleControl: true,
        disableDefaultUI: true,
        scrollwheel: true,
        fullscreenControl: true,
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
      neighborhoodInfoOpened: false,
      neighborhoodInfoPosition: null,
      closeModal: false,
    }
  },
  computed: {
    filteredNeighbourhoods() {
      return this.$store.state.neighbourhood.neighbourhoods.filter(
        p => p.coords.length
      )
    },
    sortTypes() {
      return [
        {
          id: 1,
          name: 'Latest neighbourhoods',
          value: 'latest_neighbourhoods',
        },
        { id: 2, name: 'Lowest price', value: 'lowest_price' },
        { id: 3, name: 'Highest price', value: 'highest_price' },
      ]
    },

    neighbourhoods(): Neighbourhood[] {
      return this.$store.state.neighbourhood.neighbourhoods
    },
    meta(): Meta {
      return this.$store.state.neighbourhood.meta
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
    await this.$store.dispatch('neighbourhood/getNeighbourhoods', {
      page: this.page,
      include: ['projects'],
      per_page: 27,
    } as RequestPayload<NeighbourhoodAllowedInclude[]>)
    this.$store.commit('CHANGE_LOADING', false)
  },
  methods: {
    polyHandler(neighborhood: any) {
      this.closeModal = false
      this.selectedMark = neighborhood
      this.$store.commit('SET_MODAL', 'ProjectDrawer')
      this.neighborhoodInfoOpened = true
      this.neighborhoodInfoPosition = this.polyCenter(neighborhood?.coords)
    },
    async loadMore(value: number) {
      this.page = value
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('neighbourhood/getNeighbourhoods', {
        page: this.page,
        include: ['projects'],
        per_page: 27,
      } as RequestPayload<NeighbourhoodAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
  },
})
</script>
