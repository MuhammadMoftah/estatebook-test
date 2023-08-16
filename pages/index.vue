<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <div
        class="relative flex items-center justify-center w-full h-auto pt-8 pb-10 bg-gray-900 bg-opacity-5 md:pb-8 md:pt-16"
      >
        <!-- End Photo -->
        <div class="container px-6 md:px-5">
          <div class="relative flex justify-center lg:justify-start">
            <div class="text-center md:text-start">
              <h1
                class="mb-1 text-lg font-semibold text-black md:text-xl lg:text-2xl"
              >
                {{ $t('home_cover_title') }}
                <span class="text-text-green">
                  {{ $t('home_cover_greenword') }}
                </span>
              </h1>
              <p
                class="mt-2 text-text-gray tracking-[0.0015em] leading-7 text-base font-light hidden lg:block"
              >
                {{ $t('home_description_1') }} <br />

                {{ $t('home_description_2') }}
                <br />

                {{ $t('home_description_3') }}
              </p>
              <!-- End text -->
            </div>
            <div
              class="relative justify-end flex-1 hidden lg:flex -mt-[100px] -z-10"
            >
              <img
                src="~/assets/images/buildings.png"
                class="object-center object-contain w-[500px] scale-x-[-1]"
                alt="Estate Book"
              />
            </div>
          </div>

          <!-- Start Search -->
          <LazyHydrate when-visible>
            <div class="flex flex-col lg:-mt-[135px]">
              <!-- <div
                  class="flex items-center gap-1 p-3 bg-white border border-b-0 border-gray-200 rounded-t-2xl w-fit"
                >
                  <a
                    class="py-2 bg-white w-36 flex items-center justify-center rounded-xl text-base hover:bg-[#EEEEEE] duration-200 transition-all capitalize cursor-pointer"
                    :class="{ '!bg-[#EEEEEE] font-medium': saleType === 'buy' }"
                    @click="setSaleType('buy')"
                    >{{ $t('buy') }}
                  </a>
                  <a
                    class="py-2 bg-white w-36 flex items-center justify-center rounded-xl text-base hover:bg-[#EEEEEE] duration-200 transition-all capitalize cursor-pointer"
                    :class="{ '!bg-[#EEEEEE] font-medium': saleType === 'rent' }"
                    @click="setSaleType('rent')"
                    >{{ $t('rent') }}
                  </a>
                </div>
                -->
              <LazyFiltersFilterBar
                :propUnitTypes="unitTypes"
                class="items-center hidden w-full h-16 bg-white rounded-lg ring-1 ring-gray-100 lg:flex"
              />
              <!-- <LazyCommonSearchWithFilter class="z-40" /> -->
            </div>
          </LazyHydrate>
          <div class="lg:hidden" dir="ltr">
            <div
              class="relative grid w-40 grid-cols-2 p-1 mx-auto bg-white rounded-2xl"
            >
              <div
                class="relative flex items-center justify-center p-3 capitalize"
                @click="setType('buy')"
              >
                {{ $t('buy') }}
                <span
                  class="absolute w-full inset-0 translate-x-0 flex items-center !bg-[#16B976]/20 border-none justify-center h-full text-sm font-light text-black capitalize transition-all duration-300 cursor-pointer rounded-2xl"
                  :class="[
                    sale_type === 'rent'
                      ? '!bg-[#16B976]/20 border-none translate-x-full'
                      : 'bg-white',
                  ]"
                ></span>
              </div>

              <div
                class="flex items-center justify-center p-3 capitalize"
                @click="setType('rent')"
              >
                {{ $t('rent') }}
              </div>
            </div>
          </div>
          <!--  mobile -->
          <LazyFiltersMapsFiltersBar
            :propUnitTypes="unitTypes"
            class="mt-2 lg:hidden"
            :path="'units'"
          />

          <!-- End Search -->
        </div>

        <!-- End container -->
      </div>
      <NuxtLink
        :to="localePath('/discover?page=1')"
        class="flex items-center justify-center w-32 gap-2 px-3 py-2 mx-auto text-white capitalize duration-200 -translate-y-5 rounded-lg lg:hidden bg-theme hover:opacity-90"
      >
        <IconsDiscoveryIcon class="w-5 h-5" />
        {{ $t('discover') }}
      </NuxtLink>
    </div>

    <div class="container px-5 mx-auto my-8">
      <!-- <HomePopular /> -->
      <LazyHydrate when-visible>
        <LazyHomePopularRightNow
          :neighbourhoods="neighbourhoods"
          :loading="neighborhoodLoading"
        />
      </LazyHydrate>

      <LazyHydrate when-visible>
        <LazyHomeRecommendedProjects
          :projects="projects"
          :loading="projectsLoading"
        />
      </LazyHydrate>

      <LazyHydrate when-visible>
        <LazyHomeFromDevelopers
          :units="primaryUnits"
          :loading="primaryUnitLoading"
        />
      </LazyHydrate>

      <LazyHydrate when-visible>
        <LazyHomeRecommendedUnits
          :units="resaleUnits"
          :loading="resaleUnitLoading"
        />
      </LazyHydrate>
    </div>
    <!-- {{ neighbourhoods }} -->
    <LazyHydrate when-visible>
      <LazyFiltersTheModal v-if="$store.state.modal === 'filtersModal'" />
    </LazyHydrate>

    <FiltersDiscoverMobileFilters
      v-if="$store.state.modal === 'MobileDiscoverFiltersModal'"
    />
    <FiltersMobileSearch v-if="$store.state.modal === 'MobileSearch'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LazyHydrate from 'vue-lazy-hydration'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    LazyHydrate,
  },
  data() {
    return {
      saleType: 'buy',
      settings: {
        arrows: false,
        dots: false,
        focusOnSelect: true,
        infinite: true,
        autoplay: false,
        rtl: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      primaryUnits: [],
      resaleUnits: [],
      neighborhoodLoading: false,
      projectsLoading: false,
      primaryUnitLoading: false,
      resaleUnitLoading: false,
      sale_type: 'buy',
      unitTypes: null,
    }
  },
  async fetch() {
    await this.$store.dispatch('filter/clearState', {
      path: 'units',
    })
    this.neighborhoodLoading = true
    await this.$store.dispatch('neighbourhood/getNeighbourhoods', {
      page: 1,
      include: ['projects'],
      filters: [{ key: 'status', value: 'active' }],
      per_page: 12,
    } as RequestPayload<NeighbourhoodAllowedInclude[]>)
    this.neighborhoodLoading = false

    this.projectsLoading = true
    await this.$store.dispatch('project/getProjects', {
      page: 1,
      filters: [{ key: 'status', value: 'active' }],
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
      per_page: 10,
    } as RequestPayload<ProjectAllowedInclude[]>)
    this.projectsLoading = false

    // await this.$store.dispatch('unit/getUnits', {
    //   page: 1,
    //   include: ['agent', 'project', 'developer', 'unitType'],
    //   filters: [{ key: 'sale_type', value: 'sale,resale' }],
    //   per_page: 100,
    // } as RequestPayload<UnitAllowedInclude[]>)

    const units = this.$store.state.unit.units
    this.primaryUnitLoading = true

    const saleResponse = await this.$axios.get('/get-units', {
      params: {
        page: 1,
        include: ['agent', 'project', 'developer', 'unitType'].join(','),
        'filter[sale_type]': 'sale',
        per_page: 10,
      },
    })
    this.primaryUnitLoading = true

    this.resaleUnitLoading = true

    const resaleResponse = await this.$axios.get('/get-units', {
      params: {
        page: 1,
        include: ['agent', 'project', 'developer', 'unitType'].join(','),
        'filter[sale_type]': 'resale',
        per_page: 10,
      },
    })
    this.resaleUnitLoading = true

    const primary = saleResponse.data.data
    const resaleUnits = resaleResponse.data.data
    // const [primaryUnits, resaleUnits] = resolvedUnits

    this.primaryUnits = primary
    this.resaleUnits = resaleUnits

    // const payload = {
    //   path: 'search',
    //   filter: {
    //     key: 'sale_type',
    //     value: this.saleType,
    //   },
    // }
    // this.$store.commit('filter/ADD_FILTER', payload)
  },

  computed: {
    neighbourhoods(): Neighbourhood[] {
      return this.$store.state.neighbourhood.neighbourhoods
    },
    projects(): Project[] {
      return this.$store.state.project.projects
    },
    units(): Unit[] {
      return this.$store.state.unit.units
    },
    recommondedUnits() {
      return this.$store.state.units.loadingItemsRecommonded
    },
  },
  async mounted() {
    const filters = this.$auth.$storage.getLocalStorage('filters')
    if (filters && filters.search && filters.search.filters) {
      for (let i = 0; i < filters.search.filters.length; i++) {
        if (filters.search.filters[i].key === 'sale_type') {
          if (filters.search.filters[i].value === 'buy') {
            this.saleType = 'buy'
          }
          if (filters.search.filters[i].value === 'rent') {
            this.saleType = 'rent'
          }
        }
      }
    }

    // set by filter by default
    const saleTypes = ['sale', 'resale']
    const propertyTypesPayload = saleTypes.map(item => {
      return 'sale_type = ' + item
    })
    this.$store.commit('filter/ADD_SELECTED_FILTERS', {
      key: 'sale_type',
      range: true,
      value: [...saleTypes],
      q: [[propertyTypesPayload]],
    })

    // get unit types
    const unitTypes = await this.$axios.get('/get-unit-types', {
      params: {
        per_page: '100',
        'filter[get_residentail_commercial]': true,
      },
    })
    this.unitTypes = { ...unitTypes }
  },
  methods: {
    // setSaleType(value: string) {
    //   this.saleType = value
    //   const payload = {
    //     path: 'search',
    //     filter: {
    //       key: 'sale_type',
    //       value: this.saleType,
    //     },
    //   }
    //   // this.$store.commit('filter/ADD_FILTER', payload)
    // },
    setType(val: string) {
      this.sale_type = val
      const saleTypes = ['sale', 'resale']
      const propertyTypesPayload = saleTypes.map(item => {
        return 'sale_type = ' + item
      })
      switch (this.sale_type) {
        case 'buy':
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'sale_type',
            range: true,
            value: [...saleTypes],
            q: [[propertyTypesPayload]],
          })
          break
        case 'rent':
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'sale_type',
            range: true,
            value: ['rental'],
            q: [['sale_type = rental']],
          })
          break
      }
    },
  },
})
</script>
