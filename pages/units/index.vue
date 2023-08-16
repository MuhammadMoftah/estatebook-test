<template>
  <section>
    <LazyHydrate when-visible>
      <LazyFiltersMapsFiltersBar :path="'units'" />
    </LazyHydrate>
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
          display === 'map' && 'opacity-0 h-screen absolute -left-full',
          display === 'grid' &&
            'w-full lg:w-1/2 bg-white lg:overflow-y-scroll lg:h-screen',
          display === 'list' && 'w-full',
        ]"
      >
        <!-- <LazyHydrate when-visible>
          <LazyCommonPageBreadcrumb
            :breadcrumb-links="[
              {
                id: 1,
                name: $t('home'),
                link: localePath('/'),
                active: false,
              },
              {
                id: 2,
                name: $t('units'),
                link: localePath('/units'),
                active: true,
              },
            ]"
          />
        </LazyHydrate>

        <LazyHydrate when-visible>
          <LazyCommonPageHeader
            :title="$t('units')"
            :placeholder="$t('search_for_units')"
            store-path="unit/getUnits"
            search-with="title"
            :enable-sort="false"
            :enable-search="false"
            :sort-types="sortTypes"
          />
        </LazyHydrate> -->

        <LazyHydrate when-visible>
          <LazyCommonLoadersLoaderLayout :data-length="units.length">
            <template #loader>
              <div
                class="grid w-full min-h-screen grid-cols-1 md:grid-cols-2 gap-x-4"
                :class="
                  display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'
                "
              >
                <LazyCommonUnitCardSkeleton v-for="n in 6" :key="'unit' + n" />
              </div>
            </template>
            <div
              :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'"
              class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-4"
            >
              <LazyUnitsUnitCard
                v-for="unit in units"
                :key="unit.slug"
                :unit="unit"
                @click.native="$router.push(localePath(`/units/${unit.slug}`))"
              />
            </div>
          </LazyCommonLoadersLoaderLayout>
        </LazyHydrate>

        <div class="flex items-center justify-center w-full mt-6">
          <LazyHydrate when-visible>
            <lazyCommonListingPagination
              v-if="units.length"
              :total-pages="meta.last_page"
              :current-page="currentPage"
            />
          </LazyHydrate>
        </div>
      </div>
      <div
        v-if="display != 'list'"
        :class="
          display == 'map'
            ? 'w-full top-0 ltr:right-0 bottom-0 rtl:left-0'
            : 'w-full lg:w-1/2'
        "
        class="order-first h-[40vh] lg:h-screen px-4 transition-all duration-150 mt-6 lg:mt-0 bg-white lg:absolute ltr:right-0 rtl:left-0 lg:px-0 lg:order-last"
      >
        <client-only>
          <LazyHydrate when-visible>
            <GmapMap
              :center="{ lat: 30.291201, lng: 31.74062 }"
              :zoom="mapZoom"
              :options="defaultOptions"
              map-type-id="terrain"
              class="w-full h-full"
              @zoom_changed="mapZoom = $event"
            >
              <!-- <template #visible>
                <CommonMapsZoom v-model="mapZoom" class="top-8" />
              </template> -->

              <div v-for="unit in units" :key="unit.slug">
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
                    <LazyIconsUnitMarkerIcon class="w-10 h-10" />
                  </gmap-custom-marker>
                </LazyHydrate>
              </div>
            </GmapMap>
          </LazyHydrate>
        </client-only>
        <!-- <GmapGmap
        :mapCenter="{ lat: 26.8206, lng: 30.8025 }"
        :units="units"
        :zoom="6"
      /> -->
      </div>

      <LazyHydrate when-visible>
        <LazyUnitsUnitDrawer
          v-if="$store.state.modal == 'UnitDrawer' && selectedMark"
          :unit="selectedMark"
        ></LazyUnitsUnitDrawer>
      </LazyHydrate>
    </div>

    <LazyHydrate when-visible>
      <LazyCommonToggleComponent />
    </LazyHydrate>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'

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
        gestureHandling: 'greedy',
        styles: mapStyles.styles,
      },
      mapZoom: 7,
      selectedMark: {},
    }
  },
  computed: {
    units(): Unit[] {
      return this.$store.state.unit.units
    },
    meta(): Meta {
      const meta = this.$store.state.unit.meta
      return meta
    },
    sortTypes() {
      return [
        { id: 1, name: this.$t('latest'), value: '' },
        { id: 1, name: this.$t('lowest_price'), value: 'price' },
        { id: 1, name: this.$t('highest_price'), value: '-price' },
        { id: 2, name: this.$t('lowest_area'), value: 'area' },
        { id: 2, name: this.$t('highest_area'), value: '-area' },
        { id: 5, name: this.$t('duration'), value: 'duration' },
        {
          id: 6,
          name: this.$t('min_month_payment'),
          value: 'min_month_payment',
        },
        { id: 7, name: this.$t('min_down_payment'), value: 'min_down_payment' },
        { id: 8, name: this.$t('unit_type'), value: 'unitType.name' },
        { id: 3, name: this.$t('bedrooms'), value: 'bedroom' },
        { id: 4, name: this.$t('bathrooms'), value: 'bathroom' },
      ]
    },
    display() {
      return this.$store.state.display
    },
    loading() {
      return this.$store.state.loading
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
    // await this.$store.dispatch('filter/init')
    this.$store.commit('CHANGE_LOADING', true)
    await this.$store.dispatch('unit/getUnits', {
      page: this.page,
      include: [
        'developer',
        'unitType',
        'city',
        'state',
        'project',
        'agent',
        'agent.company',
        'amenities',
        'amenitiesCount',
      ],
      per_page: 27,
    } as RequestPayload<UnitAllowedInclude[]>)
    this.$store.commit('CHANGE_LOADING', false)
  },
  methods: {
    async loadMore(value: number) {
      this.page = value
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('unit/getUnits', {
        page: this.page,
        include: [
          'developer',
          'unitType',
          'city',
          'state',
          'project',
          'agent',
          'agent.company',
          'amenities',
          'amenitiesCount',
        ],
        per_page: 27,
      } as RequestPayload<UnitAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
  },
})
</script>
