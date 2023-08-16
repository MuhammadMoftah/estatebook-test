<template>
  <div
    :class="[
      display === 'list' && 'container min-h-screen',
      ['grid', 'map'].includes(display)
        ? 'h-[calc(100vh_-_(80px_+_108px))] overflow-y-hidden'
        : '',
    ]"
    class="relative flex flex-col w-full lg:flex-row mb-11 lg:mb-0"
  >
    <div
      ref="unitRef"
      class="w-full px-3 pt-8"
      :class="[
        display === 'map' && 'opacity-0 h-full absolute -left-full',
        display === 'grid' &&
          'w-full lg:w-1/2 bg-white lg:overflow-y-scroll lg:h-full',
        display === 'list' && 'w-full',
      ]"
    >
      <LazyHydrate when-visible>
        <LazyCommonLoadersLoaderLayout :data-length="units.length">
          <template #loader>
            <div
              class="grid w-full min-h-screen grid-cols-1 md:grid-cols-2 gap-x-4"
              :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'"
            >
              <LazyCommonUnitCardSkeleton v-for="n in 6" :key="'unit' + n" />
            </div>
          </template>
          <div
            :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'"
            class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-4"
          >
            <!-- @mouseenter.native="panTo(unit)" -->
            <LazyUnitsUnitCard
              v-for="unit in units"
              :key="unit.slug"
              :unit="unit"
              preventRouting
              @openDrawer="openDrawer(unit)"
            />
            <!-- @click.stop="
                ;(selectedMark = unit), $store.commit('SET_MODAL', 'UnitDrawer')
              " -->
          </div>
        </LazyCommonLoadersLoaderLayout>
      </LazyHydrate>

      <div v-show="meta" class="flex items-center justify-center w-full mt-6">
        <!-- <LazyHydrate when-visible> -->
        <lazyCommonListingPagination
          v-show="units.length"
          :total-pages="meta.totalPages"
          :current-page="meta.page"
          :refs="$refs.unitRef"
        />
        <!-- </LazyHydrate> -->
      </div>
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
        <LazyHydrate when-visible>
          <GmapMap
            ref="mapRef"
            :center="mapCenter"
            :zoom="mapZoom"
            :options="defaultOptions"
            map-type-id="terrain"
            class="relative w-full h-full"
            @zoom_changed="mapZoom = $event"
            @dragend="mapDragged"
          >
            <!-- @tilesloaded="tilesloadedEvent" -->
            <!-- @center_changed="getCameraCenter" -->
            <template #visible>
              <CommonMapsZoom
                v-model="mapZoom"
                class="absolute -translate-y-1/2 top-1/2"
              />
            </template>

            <div v-for="unit in filteredUnits" :key="unit.slug">
              <LazyHydrate when-visible>
                <gmap-custom-marker
                  :marker="
                    unit?.lat && unit?.lng
                      ? { lat: +unit?.lat, lng: +unit?.lng }
                      : { lat: 30.291201, lng: 31.74062 }
                  "
                  :clickable="true"
                  :draggable="true"
                  @click.native="
                    ;(selectedMark = unit),
                      $store.commit('SET_MODAL', 'UnitDrawer')
                  "
                >
                  <!-- <LazyIconsUnitMarkerIcon class="w-10 h-10" /> -->
                  <span class="relative flex w-3 h-3">
                    <span
                      class="absolute inline-flex w-full h-full border-2 border-white rounded-full opacity-75 animate-ping bg-text-green"
                    ></span>
                    <span
                      class="relative inline-flex w-3 h-3 border-2 border-white rounded-full bg-text-green"
                    ></span>
                  </span>
                </gmap-custom-marker>
              </LazyHydrate>
            </div>
          </GmapMap>
        </LazyHydrate>
      </client-only>
    </div>

    <LazyHydrate when-visible>
      <LazyUnitsUnitDrawer
        v-if="$store.state.modal == 'UnitDrawer' && selectedMark"
        :unit="selectedMark"
      ></LazyUnitsUnitDrawer>
    </LazyHydrate>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'
import { debounce } from '~/helpers'

export default Vue.extend({
  data() {
    return {
      title: '',
      sort: '',
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
      mapZoom: 17,
      mapCenter: {
        lat: 30.291201,
        lng: 31.74062,
      },
      selectedMark: {},
      bounds: {},
    }
  },
  created() {
    ;(this as any).getDataWithBounds = debounce(() => {
      this.$store.dispatch('search/getItems', {
        bounds: this.bounds,
        per_page: 10,
      } as RequestPayload<UnitAllowedInclude[]>)
    }, 500)
    this.mapCenter.lat = Number(this.units[0]?.lat)
    this.mapCenter.lng = Number(this.units[0]?.lng)
  },
  computed: {
    units(): Unit[] {
      // return this.$store.state.unit.units
      return this.$store.state.search.units
    },
    meta(): Meta {
      // const meta = this.$store.state.unit.meta
      // return meta
      return this.$store.state.search.meta
    },
    display() {
      return this.$store.state.display
    },
    loading() {
      return this.$store.state.loading
    },
    filteredUnits() {
      return this.$store.state.search.units.filter(p => +p.lat && +p.lng)
    },
    filters() {
      return [...this.$store.state.filter.selectedFilters]
    },
    checkUnitsDataIfSearch() {
      const filters = this.$auth.$storage
        .getLocalStorage('selectedFilters')
        ?.filter(item => item.value.every(i => i))
      if ((filters && filters.length) || this.$store.state.filter.search) {
        return true
      } else {
        return false
      }
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
  // async fetch() {
  //   await this.$store.dispatch('search/getUnits', {
  //     milliSearch_api_key: process.env.API_KEY,
  //     page: this.page,
  //     per_page: 25,
  //   } as RequestPayload<UnitAllowedInclude[]>)
  // },
  // fetchOnServer: true,
  // async mounted() {
  //   this.$router.push({
  //     query: { page: `1` },
  //   })
  //   this.page = +(this.$route.query.page ? this.$route.query.page : 1) as number
  //   this.$store.commit('CHANGE_LOADING', true)

  //   await this.$store.dispatch('search/getItems', {
  //     milliSearch_api_key: process.env.API_KEY,
  //     page: this.page,
  //     per_page: 25,
  //   } as RequestPayload<UnitAllowedInclude[]>)
  //   this.mapCenter.lat = Number(this.units[0]?.lat)
  //   this.mapCenter.lng = Number(this.units[0]?.lng)
  //   this.$store.commit('CHANGE_LOADING', false)
  // },
  methods: {
    async panTo(item) {
      await this.$refs.mapRef?.$mapPromise.then(map => {
        map.panTo({ lat: +item.lat, lng: +item.lng })
        this.mapZoom = 17
      })
    },
    openDrawer(unit) {
      this.selectedMark = unit
      this.$store.commit('SET_MODAL', 'UnitDrawer')
    },
    async loadMore(value: number) {
      this.page = value
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('search/getItems', {
        page: this.page,
      } as RequestPayload<UnitAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
    tilesloadedEvent() {
      this.mapCenter.lat = this.$refs.mapRef.$mapObject.getCenter().lat()
      this.mapCenter.lng = this.$refs.mapRef.$mapObject.getCenter().lng()

      this.$store.commit('search/SET_MAP_CENTER', { ...this.mapCenter })
      console.log(this.mapCenter, 'tilesloadedEvent')

      // this.$refs.gmap.$mapObject.getZoom()
      // this.$refs.gmap.$mapObject.getBounds().toJSON()
    },
    async mapDragged() {
      const bounds = this?.$refs?.mapRef?.$mapObject?.getBounds()
      if (bounds) {
        const northEast = bounds.getNorthEast() // Get the top-right coordinate
        const southWest = bounds.getSouthWest() // Get the bottom-left coordinate
        this.bounds.northEast = [northEast.lat(), northEast.lng()]
        this.bounds.southWest = [southWest.lat(), southWest.lng()]
        this.getDataWithBounds()
      }
    },
    // getDataWithBounds() {
    //   this.debounce(() => {
    //     this.$store.dispatch('search/getItems', {
    //       bounds: this.bounds,
    //       per_page: 10,
    //     } as RequestPayload<UnitAllowedInclude[]>)
    //   }, 500)
    // },
    getCameraCenter() {
      // console.log(this.mapCenter, 'mapCenter')
    },
  },
})
</script>
