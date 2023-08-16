<template>
  <div
    class="fixed inset-0 flex lg:items-center justify-center w-full min-h-screen overflow-hidden z-[1100] bg-black/40"
  >
    <transition name="slide-in-Y" appear>
      <div
        class="relative flex flex-col w-full max-w-3xl gap-4 px-5 py-2 bg-white rounded-md"
      >
        <div
          class="sticky top-0 left-0 flex items-center justify-between w-full py-2 border-b border-[#DDDDDD]"
        >
          <p class="text-base text-black">{{ $t('filter_by') }}</p>
          <!-- , resetAll() -->
          <a
            class="flex items-center justify-center cursor-pointer"
            @click="$store.commit('SET_MODAL', '')"
          >
            <IconsCloseIcon2 class="w-4 h-4 text-black" />
          </a>
        </div>

        <div class="flex flex-col max-h-[500px] overflow-y-auto gap-5 py-2">
          <div v-if="!isCommerical" class="flex flex-col h-full gap-4">
            <div class="flex items-center w-full gap-2 px-4 mt-6 lg:mt-0">
              <IconsHomeOutlineIcon class="w-5 h-5 text-[#D6D6D6] shrink-0" />
              <span>{{ $t('property_types') }}</span>
            </div>
            <div class="justify-between lg:flex">
              <div class="flex flex-wrap items-center w-full gap-3 px-3">
                <div
                  class="w-10 h-10 rounded-lg flex capitalize items-center justify-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
                  :class="[
                    selectedPropertyTypes.length === 0 &&
                      '!bg-text-green !border-text-green !text-white',
                  ]"
                  @click="setPropertyType('all')"
                >
                  {{ $t('all') }}
                </div>
                <div
                  v-for="(pt, i) in property_types"
                  :key="`property-type-${i}`"
                  class="w-fit px-3.5 h-10 rounded-lg flex items-center justify-center gap-2 border border-[#DDDDDD] transition-all capitalize text-sm font-light text-black duration-300 bg-white cursor-pointer"
                  :class="[
                    !!selectedPropertyTypes.find(el => el === pt) &&
                      '!bg-green-50 !border-text-green',
                  ]"
                  @click="setPropertyType(pt)"
                >
                  <template
                    v-if="!!selectedPropertyTypes.find(el => el === pt)"
                  >
                    <IconsCheckedIcon class="w-4 h-4 text-text-green" />
                  </template>
                  {{
                    pt.replace(new RegExp('\\b' + 'sale' + '\\b'), 'primary')
                  }}
                </div>
              </div>
              <div
                class="flex items-center justify-center gap-2 px-4 py-2 mx-3 my-4 border border-gray-200 rounded-lg cursor-pointer lg:mx-0 shrink-0 w-fit lg:my-0"
                :class="[
                  ready_to_move === 'ready_to_move' &&
                    '!bg-green-50 !border-text-green',
                ]"
                @click="
                  ready_to_move === 'ready_to_move'
                    ? setReadyToMove('')
                    : setReadyToMove('ready_to_move')
                "
              >
                <div
                  class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                  :class="[
                    ready_to_move === 'ready_to_move' && '!border-text-green',
                  ]"
                >
                  <template v-if="ready_to_move === 'ready_to_move'">
                    <IconsCheckedIcon class="w-3 h-3 text-black" />
                  </template>
                </div>
                <p
                  class="text-sm font-normal text-gray-500 capitalize transition-all duration-300"
                  :class="[ready_to_move === 'ready_to_move' && '!text-black']"
                >
                  {{ $t('ready_to_move') }}
                </p>
              </div>
            </div>
          </div>
          <CommonTheDivider v-if="!isCommerical" />

          <div class="flex flex-col h-full gap-4">
            <div
              class="flex items-center gap-2 px-4 text-sm font-medium text-black"
            >
              <IconsHomeSpaceIcon class="w-6 h-6 text-[#D6D6D6] shrink-0" />
              <span>{{ $t('property_area') }} ({{ $t('m_2') + '2' }})</span>
            </div>
            <div class="flex flex-col w-full px-4 mt-auto">
              <div class="flex flex-col w-full gap-4">
                <!-- <VueSlider
                  v-model="propertySpace"
                  class="w-full"
                  :min="20"
                  :max="2000"
                  :tooltip-formatter="sliderFormatter"
                  :dot-style="{
                    borderWidth: '5px',
                    borderColor: 'white',
                    backgroundColor: '#4CB087',
                  }"
                  :process-style="{
                    backgroundColor: '#4CB087',
                  }"
                  :tooltip="'none'"
                  @change="setPropertySpace"
                /> -->
                <div class="flex items-center w-full gap-4">
                  <div
                    class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-4"
                  >
                    <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}:</p>
                    <input
                      v-model="propertySpace[0]"
                      class="max-w-[60px] text-black outline-none border-0 bg-transparent text-sm text-light px-1"
                      @input="setPropertySpace"
                    />
                    <p class="text-sm text-black">
                      {{ $t('m_2') }} <sup>2</sup>
                    </p>
                  </div>
                  <div
                    class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-4"
                  >
                    <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}:</p>
                    <input
                      v-model="propertySpace[1]"
                      class="max-w-[60px] text-black outline-none border-0 bg-transparent text-sm text-light px-1"
                      @input="setPropertySpace"
                    />
                    <p class="text-sm text-black">
                      {{ $t('m_2') }} <sup>2</sup>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CommonTheDivider />
          <div v-if="!isCommerical" class="grid h-full grid-cols-2 gap-4">
            <div class="flex flex-col h-full gap-4">
              <div class="flex items-center w-full gap-2 px-4 mt-6 lg:mt-0">
                <IconsBedIcon class="w-5 h-5 text-[#D6D6D6] shrink-0" />
                <span>{{ $t('rooms') }}</span>
              </div>
              <div class="flex flex-wrap items-center w-full gap-3 px-3">
                <div
                  class="w-10 h-10 capitalize rounded-lg flex items-center justify-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
                  :class="[
                    selectedRooms.length === 0 &&
                      '!bg-text-green !border-text-green !text-white',
                  ]"
                  @click="setRoomCount('all')"
                >
                  {{ $t('all') }}
                </div>
                <div
                  v-for="n in 5"
                  :key="`room-${n}`"
                  class="w-fit px-3.5 h-10 rounded-lg flex items-center justify-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer gap-2"
                  :class="[
                    !!selectedRooms.find(el => el === n) &&
                      '!bg-green-50 !border-text-green',
                  ]"
                  @click="setRoomCount(n)"
                >
                  <template v-if="!!selectedRooms.find(el => el === n)">
                    <IconsCheckedIcon class="w-4 h-4 text-text-green" />
                  </template>
                  {{ $numberFormat(n) }} {{ n == 5 ? '+' : null }}
                </div>
              </div>
            </div>
            <div class="flex flex-col h-full gap-4">
              <div class="flex items-center w-full gap-2 px-4 mt-6 lg:mt-0">
                <IconsBathIcon class="w-5 h-5 text-[#D6D6D6] shrink-0" />
                <span>{{ $t('baths') }}</span>
              </div>
              <div class="flex flex-wrap items-center w-full gap-3 px-3">
                <div
                  class="w-10 h-10 rounded-lg capitalize flex items-center justify-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
                  :class="[
                    selectedBaths.length === 0 &&
                      '!bg-text-green !border-text-green !text-white',
                  ]"
                  @click="setBathsCount('all')"
                >
                  {{ $t('all') }}
                </div>
                <div
                  v-for="n in 5"
                  :key="`baths-${n}`"
                  class="w-fit px-3.5 h-10 rounded-lg flex items-center justify-center gap-2 border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
                  :class="[
                    !!selectedBaths.find(el => el == n) &&
                      '!bg-green-50 !border-text-green',
                  ]"
                  @click="setBathsCount(n)"
                >
                  <template v-if="!!selectedBaths.find(el => el == n)">
                    <IconsCheckedIcon class="w-4 h-4 text-text-green" />
                  </template>
                  {{ $numberFormat(n) }} {{ n == 5 ? '+' : null }}
                </div>
              </div>
            </div>
          </div>
          <CommonTheDivider />

          <div class="w-full px-3">
            <div class="flex gap-2 my-6 lg:my-2">
              <IconsBedIcon class="w-5 h-5 text-[#D6D6D6] shrink-0" />
              <span>{{ $t('amenities') }}</span>
            </div>
            <div
              v-if="loading"
              class="flex flex-col items-center justify-center"
            >
              <IconsLoadingIcon class="w-6 h-6 text-text-green" />
            </div>
            <div v-else class="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div
                v-for="amenity in amenities"
                :key="amenity.slug"
                class="flex items-center gap-1 px-3 py-1 text-xs font-light text-black capitalize transition-all duration-300 bg-white border rounded-lg cursor-pointer min-h-[35px]"
                :class="[
                  selectedAmenities.find(el => el.id == amenity.id)
                    ? '!bg-green-50 !border-text-green'
                    : '!border-[#DDDDDD]',
                ]"
                @click="setAmenity(amenity)"
              >
                <!-- <div
                  v-if="selectedAmenities.find(el => el.id == amenity.id)"
                  class="flex items-center"
                ></div>
                <img :src="amenity.logo" class="w-8 h-8" /> -->

                <span>
                  {{ amenity.name }}
                </span>
              </div>
              <!-- <div
                v-for="amenity in amenities"
                :key="amenity.slug"
                class="rounded-lg p-3 flex gap-2 items-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
              >
                <img :src="amenity.logo" class="w-8 h-8" />

                <span class="text-xs capitalize">
                  {{ amenity.name }}
                </span>
              </div> -->
            </div>
          </div>
          <!-- <CommonTheDivider v-if="!isCommerical" />
          <div v-if="!isCommerical" class="flex flex-col h-full gap-4"></div> -->
          <!-- <CommonTheDivider v-if="!isCommerical" /> -->

          <!-- <CommonTheDivider v-if="!isCommerical" />
          <div class="flex flex-col h-full gap-4">
            <div class="flex items-center w-full gap-2 px-4 mt-6 lg:mt-0">
              <IconsHomeOutlineIcon class="w-5 h-5 text-[#D6D6D6] shrink-0" />
              <span>{{ $t('unit_type') }}</span>
            </div>
            <div
              v-if="!loading"
              class="flex flex-wrap items-center h-full gap-3 px-3"
            >
              <div
                v-for="ut in unitTypes"
                :key="`unit-type-${ut.id}`"
                class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer w-fit"
                :class="{
                  'bg-green-50 !border-text-green': !!selectedUnitTypes.find(
                    el => el == ut.id
                  ),
                }"
                @click="setUnitType(ut.id)"
              >
                <div
                  class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                  :class="{
                    '!border-text-green': !!selectedUnitTypes.find(
                      el => el == ut.id
                    ),
                  }"
                >
                  <template v-if="!!selectedUnitTypes.find(el => el == ut.id)">
                    <IconsCheckedIcon class="w-3 h-3 text-black" />
                  </template>
                </div>
                <p
                  class="text-sm font-normal text-gray-500 capitalize transition-all duration-300"
                  :class="{
                    '!text-black': !!selectedUnitTypes.find(el => el == ut.id),
                  }"
                >
                  {{ ut.name }}
                </p>
              </div>
            </div>
            <div
              v-else
              class="w-full min-h-[100px] flex items-center justify-center"
            >
              <IconsLoadingIcon class="w-16 h-16 text-text-green" />
            </div>
          </div> -->
        </div>
        <div class="flex items-center justify-end w-full gap-2 px-3 py-3">
          <button
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-normal text-black border rounded-md cursor-pointer border-text-green"
            @click="resetAll"
          >
            <IconsResetIcon class="w-4 h-4 text-icon shrink-0" />
            {{ $t('reset_all') }}
          </button>
          <button
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white border rounded-md cursor-pointer border-text-green bg-text-green"
            @click="showResult"
          >
            {{ $t('apply') }}
            <!-- {{ $t('results') }} -->
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    baseType: {
      type: String,
      default: 'search',
    },
  },
  data() {
    return {
      propertySpace: [20, 2000],
      ready_to_move: '',
      selectedRooms: [],
      selectedBaths: [],
      // property_types: ['sale', 'resale', 'rent'],
      property_types: [this.$t('sale'), this.$t('resale'), this.$t('rent')],

      selectedPropertyTypes: [],
      unitTypes: [],
      // selectedUnitTypes: [],
      sliderFormatter: null,
      isCommerical: false,
      loading: false,
      amenities: [],
      selectedAmenities: [],
    }
  },
  async fetch() {
    this.loading = true
    const unitTypes = await this.$axios.get('/get-unit-types', {
      params: {
        per_page: '9999',
      },
    })
    this.unitTypes = unitTypes?.data?.data
    this.loading = false
  },
  computed: {
    filters() {
      return [...this.$store.state.filter.selectedFilters]
    },
  },
  // watch: {
  //   propertySpace: {
  //     handler(newVal, oldVal) {
  //       this.$store.commit('filter/ADD_SELECTED_FILTERS', {
  //         key: 'area',
  //         range: true,
  //         q: [`area >= ${newVal[0]}`, `area <= ${newVal[1]}`],
  //         value: [...newVal],
  //       })
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  async mounted() {
    document.body.style.overflowY = 'hidden'
    this.sliderFormatter = function (v) {
      return (
        `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` +
        ' ' +
        this.$t('m_2')
      )
    }
    this.loading = true
    const {
      data: { data: amenities },
    } = await this.$axios.get('/amenities?filter[is_filterable]=1', {
      params: {
        per_page: '25',
      },
    })
    this.amenities = amenities
    this.loading = false
    this.initFilters()
  },
  beforeDestroy() {
    document.body.style.overflowY = 'auto'
  },
  methods: {
    initFilters() {
      this.filters.forEach(item => {
        switch (item.key) {
          case 'sale_type': {
            this.selectedPropertyTypes = [...item.value]
            break
          }
          case 'ready_to_move': {
            this.ready_to_move = 'ready_to_move'
            break
          }
          case 'area': {
            this.propertySpace = [...item.value]
            break
          }
          case 'bedroom': {
            this.selectedRooms = [...item.value]
            break
          }
          case 'bathroom': {
            this.selectedBaths = [...item.value]
            break
          }
          case 'amenities': {
            this.amenities.forEach(amenity => {
              if (item.value.includes(amenity.name))
                this.selectedAmenities.push(amenity)
            })
            break
          }
        }
      })
    },
    setReadyToMove(status: string) {
      this.ready_to_move = status

      const payload = {
        ready_to_move:
          this.ready_to_move === 'ready_to_move' ? 'ready to move' : '',
      }
      if (this.ready_to_move === 'ready_to_move') {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'ready_to_move',
          value: ['ready to move'],
        })
      } else {
        this.$store.commit('filter/REMOVE_SELECTED_FILTERS', 'ready_to_move')
      }

      // this.$store.commit('filter/ADD_FILTER', payload)
    },
    setPropertySpace() {
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'area',
        range: true,
        q: [
          `area >= ${this.propertySpace[0]}`,
          `area <= ${this.propertySpace[1]}`,
        ],
        value: [...this.propertySpace],
      })
      // const payload = {
      //   range: true,
      //   'area_range >=': this.propertySpace[0],
      //   'area_range <=': this.propertySpace[1],
      // }
      // this.$store.commit('filter/ADD_FILTER', payload)
      // const payload = {
      //   path: 'search',
      //   filter: {
      //     key: 'area_range',
      //     value: this.propertySpace.join(','),
      //   },
      // }
      // this.$store.commit('filter/ADD_FILTER', payload)
    },

    setRoomCount(rc) {
      if (rc === 'all') {
        this.selectedRooms = []
      } else {
        const index = this.selectedRooms.indexOf(rc)
        if (index > -1) {
          this.selectedRooms.splice(index, 1)
        } else {
          this.selectedRooms.push(rc)
        }
        const roomspayload = this.selectedRooms.map(item => {
          if (item === 5) {
            return 'bedroom >= ' + item
          }
          return 'bedroom = ' + item
        })
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'bedroom',
          range: true,
          q: [[roomspayload]],
          value: [...this.selectedRooms],
        })
        // const payload = {
        //   range: true,
        //   bedroom: roomspayload,
        // }
        // this.$store.commit('filter/ADD_FILTER', payload)
      }
    },
    setBathsCount(bc) {
      if (bc === 'all') {
        this.selectedBaths = []
      } else {
        const index = this.selectedBaths.indexOf(bc)
        if (index > -1) {
          this.selectedBaths.splice(index, 1)
        } else {
          this.selectedBaths.push(bc)
        }
        const bathspayload = this.selectedBaths.map(item => {
          if (item === 5) {
            return 'bathroom >= ' + item
          }
          return 'bathroom = ' + item
        })

        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'bathroom',
          range: true,
          q: [[bathspayload]],
          value: [...this.selectedBaths],
        })
      }
    },
    setPropertyType(pt) {
      if (pt === 'all') {
        this.selectedPropertyTypes = []
      } else {
        const index = this.selectedPropertyTypes.indexOf(pt)
        if (index > -1) {
          this.selectedPropertyTypes.splice(index, 1)
        } else {
          this.selectedPropertyTypes.push(pt)
        }
      }
      const propertyTypesPayload = this.selectedPropertyTypes.map(item => {
        return 'sale_type = ' + item
      })

      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'sale_type',
        range: true,
        value: [...this.selectedPropertyTypes],
        q: [[propertyTypesPayload]],
      })
    },
    setAmenity(amenity: any) {
      const index = this.selectedAmenities.indexOf(amenity)
      if (index > -1) {
        this.selectedAmenities.splice(index, 1)
      } else {
        this.selectedAmenities.push(amenity)
      }

      const amenitiespayload = this.selectedAmenities.map(item => {
        return 'amenities.id = ' + item.id
      })
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'amenities',
        range: true,
        q: [[amenitiespayload]],
        value: [...this.selectedAmenities.map(item => item.name)],
      })
    },
    // setUnitType(ut) {
    //   const index = this.selectedUnitTypes.indexOf(ut)
    //   if (index > -1) {
    //     this.selectedUnitTypes.splice(index, 1)
    //   } else {
    //     this.selectedUnitTypes.push(ut)
    //   }

    //   const payload = {
    //     path: 'units',
    //     filter: {
    //       key: 'unitType.id',
    //       value: this.selectedUnitTypes.join(','),
    //     },
    //   }
    //   this.$store.commit('filter/ADD_FILTER', payload)
    // },
    resetAll() {
      this.selectedBaths = []
      // this.selectedUnitTypes = []
      this.selectedRooms = []
      this.propertySpace = [20, 2000]
      this.selectedPropertyTypes = []
      this.ready_to_move = ''
      this.selectedAmenities = []

      const payload = {
        path: 'search',
        filters: ['bedroom', 'unitType.id', 'bathroom', 'area_range'],
      }
      this.$store.commit('filter/RESET', payload)
    },
    showResult() {
      this.$store.commit('filter/APPLY')
      // this.$router.push(this.localePath('/discover?page=1'))
      this.$store.commit('SET_MODAL', '')
    },
  },
})
</script>
