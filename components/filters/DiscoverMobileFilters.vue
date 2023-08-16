<template>
  <div
    class="fixed inset-0 flex items-center justify-center w-full min-h-screen overflow-hidden z-[1100] bg-black/40"
  >
    <transition
      :enter-active-class="'slide-top'"
      :leave-active-class="'slide-bottom'"
      appear
    >
      <div
        class="flex flex-col w-full h-full max-h-screen min-h-screen gap-4 px-5 pb-20 overflow-x-hidden overflow-y-scroll bg-white"
      >
        <div
          class="sticky top-0 left-0 flex items-center justify-between py-3 bg-white h-14"
        >
          <p>{{ $t('filters') }}</p>
          <a class="cursor-pointer" @click="$store.commit('SET_MODAL', '')">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9984 19.5754L10.1234 27.4504C9.89844 27.6754 9.63594 27.7879 9.33594 27.7879C9.03594 27.7879 8.77344 27.6754 8.54844 27.4504C8.32344 27.2254 8.21094 26.9629 8.21094 26.6629C8.21094 26.3629 8.32344 26.1004 8.54844 25.8754L16.4234 18.0004L8.54844 10.1254C8.32344 9.90039 8.21094 9.63789 8.21094 9.33789C8.21094 9.03789 8.32344 8.77539 8.54844 8.55039C8.77344 8.32539 9.03594 8.21289 9.33594 8.21289C9.63594 8.21289 9.89844 8.32539 10.1234 8.55039L17.9984 16.4254L25.8734 8.55039C26.0984 8.32539 26.3609 8.21289 26.6609 8.21289C26.9609 8.21289 27.2234 8.32539 27.4484 8.55039C27.6734 8.77539 27.7859 9.03789 27.7859 9.33789C27.7859 9.63789 27.6734 9.90039 27.4484 10.1254L19.5734 18.0004L27.4484 25.8754C27.6734 26.1004 27.7859 26.3629 27.7859 26.6629C27.7859 26.9629 27.6734 27.2254 27.4484 27.4504C27.2234 27.6754 26.9609 27.7879 26.6609 27.7879C26.3609 27.7879 26.0984 27.6754 25.8734 27.4504L17.9984 19.5754Z"
                fill="#BEBEBE"
              />
            </svg>
          </a>
        </div>
        <div>
          <p class="my-2 text-sm font-semibold">{{ $t('type') }}</p>
          <div class="grid grid-cols-2 gap-4">
            <div
              class="w-auto h-10 px-3 rounded-lg capitalize flex items-center justify-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
              :class="[
                type === 'residential' &&
                  '!bg-text-green !border-text-green !text-white',
              ]"
              @click="setType('residential')"
            >
              {{ $t('residential') }}
            </div>
            <div
              class="w-auto h-10 px-3 capitalize rounded-lg flex items-center justify-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
              :class="[
                type === 'commerical' &&
                  '!bg-text-green !border-text-green !text-white',
              ]"
              @click="setType('commerical')"
            >
              {{ $t('commerial') }}
            </div>
          </div>
        </div>
        <div>
          <p class="my-2 text-sm font-semibold">{{ $t('unit_type') }}</p>

          <div v-if="type === 'residential'" class="flex flex-wrap gap-4">
            <div
              v-for="residentialUnitType in residential"
              :key="`unit-type-${residentialUnitType}`"
              class="flex items-center w-auto gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer"
              :class="{
                '!bg-green-50 !border-text-green':
                  selectedUnitTypes.includes(residentialUnitType),
              }"
              @click="setUnitTypes(residentialUnitType), setFilterValue()"
            >
              <div
                class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                :class="{
                  '!border-text-green':
                    selectedUnitTypes.includes(residentialUnitType),
                }"
              >
                <template
                  v-if="selectedUnitTypes.includes(residentialUnitType)"
                >
                  <IconsCheckedIcon class="w-3 h-3 text-black" />
                </template>
              </div>
              <p
                class="text-xs font-normal text-gray-500 capitalize truncate transition-all duration-300"
                :class="{
                  '!text-black':
                    selectedUnitTypes.includes(residentialUnitType),
                }"
              >
                {{ residentialUnitType }}
              </p>
            </div>
          </div>
          <div v-if="type === 'commerical'" class="flex flex-wrap gap-4">
            <div
              v-for="commericalUnitType in commerical"
              :key="`unit-type-${commericalUnitType}`"
              class="flex items-center w-auto gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer"
              :class="{
                '!bg-green-50 !border-text-green':
                  selectedUnitTypes.includes(commericalUnitType),
              }"
              @click.stop="setUnitTypes(commericalUnitType), setFilterValue()"
            >
              <div
                class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                :class="{
                  '!border-text-green':
                    selectedUnitTypes.includes(commericalUnitType),
                }"
              >
                <template v-if="selectedUnitTypes.includes(commericalUnitType)">
                  <IconsCheckedIcon class="w-3 h-3 text-black" />
                </template>
              </div>
              <p
                class="text-xs font-normal text-gray-500 capitalize truncate transition-all duration-300"
                :class="{
                  '!text-black': selectedUnitTypes.includes(commericalUnitType),
                }"
              >
                {{ commericalUnitType }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="my-2 text-sm font-semibold capitalize">
            {{ $t('status') }}
          </p>

          <div class="flex flex-wrap gap-4">
            <div class="flex items-center w-full gap-2 mt-6 lg:mt-0">
              <IconsHomeOutlineIcon class="w-5 h-5 text-[#D6D6D6] shrink-0" />
              <span>{{ $t('property_types') }}</span>
            </div>
            <div class="justify-between lg:flex">
              <div class="flex flex-wrap items-center w-full gap-3">
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
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer shrink-0 w-fit"
          :class="{
            '!bg-green-50 !border-text-green':
              ready_to_move === 'ready_to_move',
          }"
          @click="
            ready_to_move === 'ready_to_move'
              ? setReadyToMove('')
              : setReadyToMove('ready_to_move')
          "
        >
          <div
            class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
            :class="{
              '!border-text-green': ready_to_move === 'ready_to_move',
            }"
          >
            <template v-if="ready_to_move === 'ready_to_move'">
              <IconsCheckedIcon class="w-3 h-3 text-black" />
            </template>
          </div>
          <p
            class="text-sm font-normal text-gray-500 capitalize transition-all duration-300"
            :class="{
              '!text-black': ready_to_move === 'ready_to_move',
            }"
          >
            {{ $t('ready_to_move') }}
          </p>
        </div>
        <div>
          <p class="my-2 text-sm font-semibold">
            {{ $t('property_area') }} ({{ $t('m_2') + '2' }})
          </p>
          <div class="flex items-center w-full gap-4">
            <div
              class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-4"
            >
              <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}:</p>
              <input
                v-model="propertySpace[0]"
                class="max-w-[60px] text-black outline-none border-0 bg-transparent text-sm text-light px-1"
                @input="setPropertySpace(), setFilterValue()"
              />
              <p class="text-sm text-black">{{ $t('m_2') }} <sup>2</sup></p>
            </div>
            <div
              class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-4"
            >
              <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}:</p>
              <input
                v-model="propertySpace[1]"
                class="max-w-[60px] text-black outline-none border-0 bg-transparent text-sm text-light px-1"
                @input="setPropertySpace(), setFilterValue()"
              />
              <p class="text-sm text-black">{{ $t('m_2') }} <sup>2</sup></p>
            </div>
          </div>
        </div>

        <aside>
          <p class="my-2 text-sm font-semibold">
            {{ $t('price') }}
          </p>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <div
                class="relative group flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
              >
                <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}:</p>

                <input
                  ref="price"
                  v-model="price[0]"
                  type="text"
                  class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                  @input="onApplyPrices"
                  @click.stop="openList('priceList1')"
                />
                <div class="text-xs">{{ $t('EGP') }}</div>

                <transition name="slide-fade">
                  <filtersPriceList
                    v-if="priceList1"
                    :prices="millonsArray"
                    place="from"
                    @mouseenter.native="openList('priceList1')"
                    @mouseleave.native="closeList('priceList1')"
                    @priceSelected="
                      ;(price = [$event, price[1]]),
                        (priceList1 = false),
                        onApplyPrices()
                    "
                  />
                </transition>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div
                class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
              >
                <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}</p>

                <input
                  v-model="price[1]"
                  type="text"
                  class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                  @input="onApplyPrice"
                  @click.stop="openList('priceList2')"
                />
                <div class="text-xs">{{ $t('EGP') }}</div>
                <transition name="slide-fade">
                  <filtersPriceList
                    v-if="priceList2"
                    :prices="millonsArray"
                    place="to"
                    @mouseenter.native="openList('priceList2')"
                    @mouseleave.native="closeList('priceList2')"
                    @priceSelected="
                      ;(price = [price[0], $event]),
                        (priceList2 = false),
                        onApplyPrices()
                    "
                  />
                </transition>
              </div>
            </div>
          </div>
        </aside>

        <aside>
          <p class="my-2 text-sm font-semibold">
            {{ $t('down_payment') }}
          </p>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <div
                class="relative group flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
              >
                <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}:</p>

                <input
                  v-model="min_down_payment[0]"
                  step="0.0000000000001"
                  type="number"
                  class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                  @click.stop="openList('priceList3')"
                  @input="onApplyPrices"
                />
                <div class="text-xs">{{ $t('EGP') }}</div>

                <transition name="slide-fade">
                  <filtersPriceList
                    v-if="priceList3"
                    :prices="pricesArray"
                    place="from"
                    @mouseenter.native="openList('priceList3')"
                    @mouseleave.native="closeList('priceList3')"
                    @priceSelected="
                      ;(min_down_payment = [$event, min_down_payment[1]]),
                        (priceList3 = false),
                        onApplyPrices()
                    "
                  />
                </transition>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div
                class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
              >
                <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}</p>

                <input
                  v-model="min_down_payment[1]"
                  step="0.0000000000001"
                  type="number"
                  class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                  @click.stop="openList('priceList4')"
                  @input="onApplyPrices"
                />
                <div class="text-xs">{{ $t('EGP') }}</div>
                <transition name="slide-fade">
                  <filtersPriceList
                    v-if="priceList4"
                    :prices="pricesArray.filter(p => p > +min_down_payment[0])"
                    place="to"
                    @mouseenter.native="openList('priceList4')"
                    @mouseleave.native="closeList('priceList4')"
                    @priceSelected="
                      ;(min_down_payment = [min_down_payment[0], $event]),
                        (priceList4 = false),
                        onApplyPrices()
                    "
                  />
                </transition>
              </div>
            </div>
          </div>
        </aside>

        <aside>
          <p class="my-2 text-sm font-semibold capitalize">
            {{ $t('installments') }}
          </p>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <div
                class="relative group flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
              >
                <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}:</p>

                <input
                  v-model="min_recurring_payment[0]"
                  step="0.0000000000001"
                  type="number"
                  class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                  @click.stop="openList('priceList5')"
                  @input="onApplyPrices"
                />
                <div class="text-xs">{{ $t('EGP') }}</div>

                <transition name="slide-fade">
                  <filtersPriceList
                    v-if="priceList5"
                    :prices="installmentPrices"
                    place="from"
                    @mouseenter.native="openList('priceList5')"
                    @mouseleave.native="closeList('priceList5')"
                    @priceSelected="
                      ;(min_recurring_payment = [
                        $event,
                        min_recurring_payment[1],
                      ]),
                        (priceList5 = false),
                        onApplyPrices()
                    "
                  />
                </transition>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div
                class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
              >
                <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}</p>

                <input
                  v-model="min_recurring_payment[1]"
                  step="0.0000000000001"
                  type="number"
                  class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                  @click.stop="openList('priceList6')"
                  @input="onApplyPrices"
                />
                <div class="text-xs">{{ $t('EGP') }}</div>
                <transition name="slide-fade">
                  <filtersPriceList
                    v-if="priceList6"
                    :prices="
                      installmentPrices.filter(
                        p => p > +min_recurring_payment[0]
                      )
                    "
                    place="to"
                    @mouseenter.native="openList('priceList6')"
                    @mouseleave.native="closeList('priceList6')"
                    @priceSelected="
                      ;(min_recurring_payment = [
                        min_recurring_payment[0],
                        $event,
                      ]),
                        (priceList6 = false),
                        onApplyPrices()
                    "
                  />
                </transition>
              </div>
            </div>
          </div>
        </aside>

        <div>
          <p class="my-2 text-sm font-semibold">{{ $t('rooms') }}</p>

          <div class="flex flex-wrap items-center w-full gap-3">
            <div
              class="w-10 h-10 capitalize rounded-lg flex items-center justify-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
              :class="{
                '!bg-text-green !border-text-green !text-white':
                  selectedRooms.length === 0,
              }"
              @click="setRoomCount('all'), setFilterValue()"
            >
              {{ $t('all') }}
            </div>
            <div
              v-for="n in 5"
              :key="`room-${n}`"
              class="w-fit px-3.5 h-10 rounded-lg flex items-center justify-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer gap-2"
              :class="{
                '!bg-green-50 !border-text-green': !!selectedRooms.find(
                  el => el === n
                ),
              }"
              @click="setRoomCount(n), setFilterValue()"
            >
              <template v-if="!!selectedRooms.find(el => el === n)">
                <IconsCheckedIcon class="w-4 h-4 text-text-green" />
              </template>
              {{ $numberFormat(n) }} {{ n == 5 ? '+' : null }}
            </div>
          </div>
        </div>
        <div>
          <p class="my-2 text-sm font-semibold">{{ $t('baths') }}</p>

          <div class="flex flex-wrap items-center w-full gap-3">
            <div
              class="w-10 h-10 rounded-lg capitalize flex items-center justify-center border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
              :class="{
                '!bg-text-green !border-text-green !text-white':
                  selectedBaths.length === 0,
              }"
              @click="setBathsCount('all'), setFilterValue()"
            >
              {{ $t('all') }}
            </div>
            <div
              v-for="n in 5"
              :key="`baths-${n}`"
              class="w-fit px-3.5 h-10 rounded-lg flex items-center justify-center gap-2 border border-[#DDDDDD] transition-all text-sm font-light text-black duration-300 bg-white cursor-pointer"
              :class="{
                '!bg-green-50 !border-text-green': !!selectedBaths.find(
                  el => el == n
                ),
              }"
              @click="setBathsCount(n), setFilterValue()"
            >
              <template v-if="!!selectedBaths.find(el => el == n)">
                <IconsCheckedIcon class="w-4 h-4 text-text-green" />
              </template>
              {{ $numberFormat(n) }} {{ n == 5 ? '+' : null }}
            </div>
          </div>
        </div>

        <div>
          <p class="my-2 text-sm font-semibold">{{ $t('amenities') }}</p>
          <div v-if="loading" class="flex flex-col items-center justify-center">
            <IconsLoadingIcon class="w-6 h-6 text-text-green" />
          </div>
          <div v-else class="flex flex-wrap gap-4">
            <div
              v-for="amenity in amenities"
              :key="amenity.slug"
              class="flex items-center gap-1 px-3 py-1 text-xs font-light text-black capitalize transition-all duration-300 bg-white border rounded-lg cursor-pointer min-h-[35px]"
              :class="[
                selectedAmenities.find(el => el.id == amenity.id)
                  ? '!bg-green-50 !border-text-green'
                  : 'border-[#DDDDDD]',
              ]"
              @click="setAmenity(amenity)"
            >
              <span>
                {{ amenity.name }}
              </span>
            </div>
          </div>
        </div>
        <div
          class="fixed bottom-0 left-0 grid w-full grid-cols-2 gap-2 px-3 py-3 bg-white"
        >
          <button
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-normal text-black border rounded-md cursor-pointer border-text-green"
            @click="
              resetAll(), (selectedAmenities = []), (type = 'residential')
            "
          >
            <IconsResetIcon class="w-4 h-4 text-icon shrink-0" />
            {{ $t('reset_all') }}
          </button>
          <button
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white capitalize border rounded-md cursor-pointer border-text-green bg-text-green"
            @click="showResult(), submit()"
          >
            {{ $t('show_results') }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import filters from '~/mixins/filters'
export default {
  mixins: [filters],
  data() {
    return {
      loading: false,
      amenities: [],
      selectedAmenities: [],
      type: 'residential',
      property_types: [this.$t('sale'), this.$t('resale'), this.$t('rent')],
      selectedPropertyTypes: [],
    }
  },
  async fetch() {
    const unitTypes = await this.$axios.get('/get-unit-types', {
      params: {
        per_page: '100',
        'filter[get_residentail_commercial]': true,
      },
    })

    const resolvedUnitTypes = (unitTypes.data?.data).reduce(
      (unitTypes, current) => {
        if (current.is_commercial) {
          unitTypes[0].push(current.name)
        } else if (current.is_residentail) {
          unitTypes[1].push(current.name)
        }
        return unitTypes
      },
      [[], []]
    )

    const [commercial, residential] = resolvedUnitTypes

    this.commerical = commercial
    this.residential = residential

    this.unitTypes = unitTypes?.data?.data
  },
  async mounted() {
    this.initFilters()

    // get amenities data
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
    this.filters.forEach(item => {
      switch (item.key) {
        case 'amenities': {
          this.amenities.forEach(amenity => {
            if (item.value.includes(amenity.name)) {
              this.selectedAmenities.push(amenity)
            }
          })
          break
        }
        case 'type': {
          console.log(item.value.flat(), 'item.value.flat()')
          this.type = item?.value?.flat(Infinity)[0]
          break
        }
      }
    })
    this.sliderFormatter = function (v) {
      return (
        `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` +
        ' ' +
        this.$t('m_2')
      )
    }
    this.sliderFormatter2 = function (v) {
      return (
        `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` +
        ' ' +
        this.$t('EGP')
      )
    }
    // add type filter
    this.$store.commit('filter/ADD_SELECTED_FILTERS', {
      key: 'type',
      range: true,
      value: [this.type],
      q: [[['type = ' + this.type]]],
    })
  },
  methods: {
    setType(val) {
      this.type = val
      // this.$store.commit('filter/ADD_SELECTED_FILTERS', {
      //   key: 'type',
      //   value: [this.type],
      // })
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'type',
        range: true,
        value: [this.type],
        q: [[['type = ' + this.type]]],
      })
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
    setAmenity(amenity) {
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
  },
}
</script>
