<template>
  <section class="mb-11 lg:mb-0">
    <div
      :class="[
        display === 'list' && 'container',
        ['grid', 'map'].includes(display)
          ? 'h-[calc(100vh_-_(80px_+_108px))] overflow-y-hidden'
          : '',
      ]"
      class="relative flex flex-col w-full min-h-full lg:flex-row"
    >
      <div
        class="w-full px-3 pt-8"
        :class="[
          display === 'grid' &&
            'w-full lg:w-1/2 bg-white lg:overflow-y-scroll lg:h-full',
          display === 'map' && 'opacity-0 h-full absolute -left-full',

          display === 'list' && 'w-full',
        ]"
      >
        <LazyHydrate when-visible>
          <!-- <LazyCommonLoadersLoaderLayout :data-length="neighbourhoods.length">
            <template #loader> -->
          <div
            v-if="!neighbourhoods.length"
            :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-4'"
            class="grid w-full grid-cols-1 gap-4 my-4 md:grid-cols-2 sm:grid-cols-2"
          >
            <CommonNeighborhoodCardSkeleton v-for="n in 8" :key="n" />
          </div>
          <!-- </template> -->
          <div
            v-else
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
              @mouseenter.native="panTo(polyCenter(loc.coords))"
              preventRouting
              @openDrawer="openDrawer(loc)"
            />
            <!-- @click.native="
                  $store.commit('neighbourhood/SET_NEIGHBOURHOOD', loc),
                    $store.commit('SET_MODAL', 'NeighborhoodDrawer')
                " -->
          </div>
          <!-- </LazyCommonLoadersLoaderLayout> -->
        </LazyHydrate>
        <!-- <div class="flex items-center justify-center w-full mt-6">
          <CommonListingPagination
            v-show="neighbourhoods.length"
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
        <CommonGoogleMap
          ref="mapRef"
          :map-center="{ lat: 30.0074, lng: 31.4913 }"
          :default-map-zoom="9"
          page="neighborhoods"
          :items="filteredNeighbourhoods"
        />
      </div>

      <LazyHydrate when-visible>
        <LazyNeighbourhoodsNeighborhoodDrawer
          v-if="$store.state.modal == 'NeighborhoodDrawer'"
        ></LazyNeighbourhoodsNeighborhoodDrawer>
      </LazyHydrate>
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
      page: 1,
      defaultOptions: {
        zoomControl: true,
        scaleControl: true,
        disableDefaultUI: true,
        scrollwheel: true,
        fullscreenControl: true,
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
      neighborhoodInfoOpened: false,
      neighborhoodInfoPosition: null,
      closeModal: false,
      bounds: {},
    }
  },
  created() {
    ;(this as any).getDataWithBounds = debounce(() => {
      this.$store.dispatch('search/getNeighborhoods', {
        bounds: this.bounds,
        per_page: 10,
      } as RequestPayload<NeighbourhoodAllowedInclude[]>)
    }, 500)
  },
  computed: {
    filteredNeighbourhoods() {
      return this.$store.state.search.neighborhoods.filter(
        p => p.coords?.length
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
      // return this.$store.state.neighbourhood.neighbourhoods
      return this.$store.state.search.neighborhoods
    },
    meta(): Meta {
      // return this.$store.state.neighbourhood.meta
      return this.$store.state.search.meta
    },
    display() {
      return this.$store.state.display
    },
    loading() {
      return this.$store.state.loading
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
  //   } as RequestPayload<NeighbourhoodAllowedInclude[]>)

  //   this.$store.commit('CHANGE_LOADING', false)
  // },
  methods: {
    async panTo(item) {
      await this.$refs.mapRef.$refs.mapRef.$mapPromise.then(map => {
        map.panTo({ lat: parseFloat(item.lat), lng: parseFloat(item.lng) })
        this.$refs.mapRef.zoom = 9
      })
    },
    openDrawer(neighborhood: any) {
      // this.selectedMark = neighborhood
      this.$store.commit('neighbourhood/SET_NEIGHBOURHOOD', neighborhood)
      this.$store.commit('SET_MODAL', 'NeighborhoodDrawer')
    },
    polyHandler(neighborhood: any) {
      this.closeModal = false
      this.selectedMark = neighborhood
      this.$store.commit('SET_MODAL', 'ProjectDrawer')
      this.neighborhoodInfoOpened = true
      this.neighborhoodInfoPosition = this.polyCenter(neighborhood?.coords)
    },
    loadMore(value: number) {
      this.page = value
      // this.$store.commit('CHANGE_LOADING', true)
      // await this.$store.dispatch('neighbourhood/getNeighbourhoods', {
      //   page: this.page,
      //   include: ['projects'],
      //   per_page: 27,
      // } as RequestPayload<NeighbourhoodAllowedInclude[]>)
      // this.$store.commit('CHANGE_LOADING', false)
    },
    async mapDragged() {
      const bounds = this?.$refs?.mapRef?.$refs?.mapRef?.$mapObject?.getBounds()
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
