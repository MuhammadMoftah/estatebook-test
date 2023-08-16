<template>
  <client-only>
    <section>
      <LazyHydrate when-visible>
        <LazyFiltersMapsFiltersBar
          class="px-4 lg:px-0"
          :class="display === 'list' && 'lg:w-screen lg:max-w-none container'"
          :path="'units'"
        />
      </LazyHydrate>
      <DiscoverTabs
        class="fixed z-20 top-[126px] md:top-[140px] lg:top-48 ltr:left-3 rtl:right-3"
      />

      <DiscoverUnitsPart v-if="discoverTab == 'units'" />
      <DiscoverProjectsPart v-show="discoverTab == 'projects'" />
      <DiscoverNeighborhoodsPart v-show="discoverTab == 'neighborhoods'" />

      <LazyHydrate when-visible>
        <LazyCommonToggleComponent />
      </LazyHydrate>

      <LazyHydrate when-visible>
        <LazyFiltersDiscoverPopup
          v-if="$store.state.modal === 'discoverFiltersModal'"
        />
      </LazyHydrate>
      <LazyHydrate when-visible>
        <LazyFiltersDiscoverMobileFilters
          v-if="$store.state.modal === 'MobileDiscoverFiltersModal'"
        />
      </LazyHydrate>

      <FiltersMobileSearch v-show="$store.state.modal === 'MobileSearch'" />
    </section>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'

export default Vue.extend({
  name: 'Discover',
  data() {
    return {
      tab: 'units',
      title: '',
      sort: '',
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
      mapZoom: 7,
      selectedMark: {},
    }
  },
  async fetch() {
    await this.$store.dispatch('search/getUnits', {
      page: this.page,
      per_page: 25,
    } as RequestPayload<UnitAllowedInclude[]>)
    await this.$store.dispatch('search/getProjects', {
      page: this.page,
      per_page: 25,
    } as RequestPayload<ProjectAllowedInclude[]>)
    await this.$store.dispatch('search/getNeighborhoods', {
      page: this.page,
      per_page: 25,
    } as RequestPayload<NeighbourhoodAllowedInclude[]>)
  },
  fetchOnServer: true,
  computed: {
    units(): Unit[] {
      return this.$store.state.unit.units
    },

    display() {
      return this.$store.state.display
    },
    loading() {
      return this.$store.state.loading
    },
    discoverTab() {
      return this.$store.state.discoverTab
    },
  },
  beforeCreate() {
    this.$store.commit('SET_MODAL', '')
  },
})
</script>

<style scoped>
.tab-style {
  @apply capitalize duration-200 text-xs rounded-md hover:opacity-90 py-2 px-3;
}
</style>
