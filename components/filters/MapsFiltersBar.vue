<template>
  <div>
    <!-- mobile view -->
    <div class="flex flex-col justify-center gap-2 lg:hidden">
      <div
        class="relative flex items-center p-2 bg-white border border-gray-200 rounded-2xl mx-3F"
      >
        <FiltersSearchBar
          ref="searchBar"
          class="flex-1 min-w-[33%] !max-w-none shrink-0 lg:flex hidden"
          base-type="search_criteria"
          filter-type="name"
          placeholder="search_for_units"
          :allow-local-storage="true"
        />

        <!-- mobile  -->
        <section
          class="w-11/12"
          @click="$store.commit('SET_MODAL', 'MobileSearch')"
        >
          <FiltersSearchBar
            ref="searchBar"
            class="flex-1 min-w-[33%] !max-w-none shrink-0 lg:hidden pointer-events-none"
            base-type="search_criteria"
            filter-type="name"
            placeholder="search_for_units"
            :allow-local-storage="true"
          />
        </section>

        <!-- <section
          class="flex items-center w-11/12 h-full gap-2 px-3 overflow-hidden bg-white cursor-pointer lg:hidden"
          @click="$store.commit('SET_MODAL', 'MobileSearch')"
        >
          <IconsSearchIcon class="w-5 h-5 text-[#d6d6d6] shrink-0" />

          <input
            class="w-full h-full pointer-events-none focus:outline-none placeholder:text-sm"
            :placeholder="$t('search_for_units')"
          />
        </section> -->

        <div
          class="flex items-center justify-center w-10 h-10 bg-white border cursor-pointer right-5 rounded-xl lg:w-10 text-text-green border-slate-200"
          :class="
            $store.state.filter.selectedFilters?.length
              ? 'border-text-green'
              : 'border-slate-200'
          "
          @click="$store.commit('SET_MODAL', 'MobileDiscoverFiltersModal')"
        >
          <IconsFilterIcon class="w-5 h-5" />
          <span
            v-show="$store.state.filter.selectedFilters?.length"
            class="absolute ltr:right-2 rtl:left-2 flex w-3 h-3 top-[2px]"
          >
            <span
              class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-text-green"
            ></span>
            <span
              class="relative inline-flex w-3 h-3 rounded-full bg-text-green"
            ></span>
          </span>
        </div>
      </div>
    </div>
    <!-- desktop view -->
    <div class="flex-col hidden w-full lg:flex">
      <div
        class="flex flex-wrap items-center w-full bg-white border-gray-200 border-y filtersParent"
      >
        <FiltersSearchBar
          ref="searchBar"
          class="flex-1 min-w-[33%] !max-w-none"
          base-type="search_criteria"
          filter-type="name"
          placeholder="search_for_units"
          :allow-local-storage="true"
        />
        <aside class="w-full max-w-fit shrink-0">
          <FiltersDropDownBar
            ref="unitFeatures"
            base-type="units"
            filter-type="unit_features"
            placeholder="features"
            :allow-local-storage="true"
            content-classes="absolute top-full mt-[1px] flex-col gap-4 right-0 z-20 px-5 py-3 w-full min-w-[400px] rounded-xl rounded-tl-none rounded-tr-none border bg-white
              "
          >
            <template #dropdown-content>
              <section class="grid grid-cols-2 gap-2">
                <div
                  v-for="el in fetchedUnitFeatures"
                  :key="el.id"
                  class="flex items-center w-full gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer"
                  :class="[
                    selectedUnitFeatures.includes(el) &&
                      '!bg-green-50 !border-text-green',
                  ]"
                  @click="setUnitFeatures(el)"
                >
                  <div
                    class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                    :class="[
                      selectedUnitFeatures.includes(el) && '!border-text-green',
                    ]"
                  >
                    <div v-show="selectedUnitFeatures.includes(el)">
                      <IconsCheckedIcon class="w-3 h-3 text-black" />
                    </div>
                  </div>
                  <p
                    class="text-xs font-normal text-gray-500 capitalize truncate transition-all duration-300"
                    :class="[
                      selectedUnitFeatures.includes(el) && '!text-black',
                    ]"
                  >
                    {{ el.name }}
                  </p>
                </div>
              </section>

              <FiltersDropdownActionBtn
                @reset="selectedUnitFeatures = []"
                @apply="onAppliedFeatures"
              />
            </template>
            <template #bar-icon>
              <IconsPropertyTypeIcon
                class="w-5 h-5 shrink-0 text-[#D6D6D6] pointer-events-none"
              />
            </template>
          </FiltersDropDownBar>
        </aside>

        <div class="w-full max-w-fit shrink-0">
          <FiltersDropDownBar
            ref="unitTypes"
            base-type="units"
            filter-type="type"
            placeholder="type"
            :allow-local-storage="true"
            content-classes="absolute top-full mt-[1px] flex-col gap-4 right-0 z-20 px-5 py-3 w-full min-w-[400px] rounded-xl rounded-tl-none rounded-tr-none border bg-white
              "
          >
            <template #dropdown-content>
              <div>
                <CommonTabsTheWrapper
                  filter-type="sale_type"
                  @selected="onTabSelect"
                >
                  <!-- @selectedTitle="unitTypesFiltered($event)" -->
                  <CommonTabsTabItem
                    class="grid grid-cols-2 gap-4"
                    :title="$t('residential')"
                    classes="max-h-[250px] overflow-y-auto"
                  >
                    <div
                      v-for="residentialUnitType in residential"
                      :key="`unit-type-${residentialUnitType.id}`"
                      class="flex items-center w-full gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer"
                      :class="[
                        selectedUnitTypes.includes(residentialUnitType) &&
                          '!bg-green-50 !border-text-green',
                      ]"
                      @click="setUnitTypes(residentialUnitType)"
                    >
                      <div
                        class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                        :class="[
                          selectedUnitTypes.includes(residentialUnitType) &&
                            '!border-text-green',
                        ]"
                      >
                        <div
                          v-show="
                            selectedUnitTypes.includes(residentialUnitType)
                          "
                        >
                          <IconsCheckedIcon class="w-3 h-3 text-black" />
                        </div>
                      </div>
                      <p
                        class="text-xs font-normal text-gray-500 capitalize truncate transition-all duration-300"
                        :class="[
                          selectedUnitTypes.includes(residentialUnitType) &&
                            '!text-black',
                        ]"
                      >
                        {{ residentialUnitType.name }}
                      </p>
                    </div>
                  </CommonTabsTabItem>
                  <CommonTabsTabItem
                    class="grid grid-cols-2 gap-4"
                    :title="$t('commercial')"
                    classes="max-h-[250px] overflow-y-auto"
                  >
                    <div
                      v-for="commericalUnitType in commerical"
                      :key="`unit-type-${commericalUnitType.id}`"
                      class="flex items-center w-full gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer"
                      :class="[
                        selectedUnitTypes.includes(commericalUnitType) &&
                          '!bg-green-50 !border-text-green',
                      ]"
                      @click.stop="setUnitTypes(commericalUnitType)"
                    >
                      <div
                        class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                        :class="[
                          selectedUnitTypes.includes(commericalUnitType) &&
                            '!border-text-green',
                        ]"
                      >
                        <div
                          v-show="
                            selectedUnitTypes.includes(commericalUnitType)
                          "
                        >
                          <IconsCheckedIcon class="w-3 h-3 text-black" />
                        </div>
                      </div>
                      <p
                        class="text-xs font-normal text-gray-500 capitalize truncate transition-all duration-300"
                        :class="[
                          selectedUnitTypes.includes(commericalUnitType) &&
                            '!text-black',
                        ]"
                      >
                        {{ commericalUnitType.name }}
                      </p>
                    </div>
                  </CommonTabsTabItem>
                </CommonTabsTheWrapper>
              </div>
              <FiltersDropdownActionBtn
                @reset="selectedUnitTypes = []"
                @apply="onAppliedType"
              />
            </template>
            <template #bar-icon>
              <IconsPropertyTypeIcon
                class="w-5 h-5 shrink-0 text-[#D6D6D6] pointer-events-none"
              />
            </template>
          </FiltersDropDownBar>
          <!-- <FiltersDropDownBar
          base-type="units"
          filter-type="type"
          class="!min-w-full !max-w-none"
          placeholder="property_types"
          :listData="['residential', 'commercial']"
          :allow-local-storage="true"
        >
          <template #bar-icon>
            <IconsHomeOutlineIcon class="w-5 h-5 shrink-0 text-[#D6D6D6]" />
          </template>
        </FiltersDropDownBar> -->
        </div>

        <div class="w-full max-w-fit shrink-0">
          <FiltersDropDownSlotBar
            ref="properitySpaceMenu"
            base-type="units"
            filter-type="area_range"
            class="!min-w-full !max-w-none"
            :menu-class="'min-w-[400px] w-full right-0 !max-h-fit'"
            placeholder="areas_sqm"
          >
            <template #bar-icon>
              <IconsHomeSpaceIcon class="w-5 h-5 shrink-0 text-[#D6D6D6]" />
            </template>

            <template #drop-content>
              <div
                class="flex flex-col justify-end w-full px-8 py-6 mt-auto border-t border-gray-200"
              >
                <div class="flex flex-col w-full gap-4">
                  <VueSlider
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
                  />
                  <!-- @change="setPropertySpace" -->

                  <div class="flex items-center justify-between w-full">
                    <div
                      class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-4"
                    >
                      <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}:</p>
                      <input
                        v-model.lazy="propertySpace[0]"
                        class="max-w-[60px] text-black outline-none border-0 bg-transparent text-sm text-light px-1"
                      />
                      <!-- @input="setPropertySpace" -->
                      <p class="text-sm text-black">
                        {{ $t('m_2') }} <sup>2</sup>
                      </p>
                    </div>
                    <div
                      class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-4"
                    >
                      <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}:</p>
                      <input
                        v-model.lazy="propertySpace[1]"
                        class="max-w-[60px] text-black outline-none border-0 bg-transparent text-sm text-light px-1"
                      />
                      <!-- @input="setPropertySpace" -->
                      <p class="text-sm text-black">
                        {{ $t('m_2') }} <sup>2</sup>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <FiltersDropdownActionBtn
                @reset="propertySpace = [20, 2000]"
                @apply="setPropertySpace"
              />
            </template>
          </FiltersDropDownSlotBar>
        </div>
        <div class="w-full max-w-fit shrink-0">
          <FiltersDropDownSlotBar
            ref="roomsAndBathsMenu"
            class="!min-w-full !max-w-none"
            :menu-class="'w-full right-0 !max-h-fit'"
            placeholder="baths_&_beds"
          >
            <template #bar-icon>
              <IconsBedroomIcon class="w-5 h-5 text-black shrink-0" />
            </template>
            <template #drop-content>
              <div
                class="flex flex-col w-full gap-4 py-4 border-t border-gray-200"
              >
                <div class="flex flex-col h-full gap-4">
                  <div
                    class="flex items-center w-full gap-2 px-4 mt-6 text-sm lg:mt-0"
                  >
                    <IconsBedIcon class="w-5 h-5 text-[#D6D6D6] shrink-0" />
                    <span>{{ $t('rooms') }}</span>
                  </div>
                  <div class="flex flex-wrap items-center w-full gap-1 px-3">
                    <div
                      class="w-10 h-10 capitalize rounded-lg flex items-center justify-center border border-[#DDDDDD] transition-all text-xs md:text-sm font-light text-black duration-300 bg-white cursor-pointer"
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
                      class="w-fit px-3.5 h-10 rounded-lg flex items-center justify-center border border-[#DDDDDD] transition-all text-xs md:text-sm font-light text-black duration-300 bg-white cursor-pointer gap-2"
                      :class="[
                        !!selectedRooms.find(el => el === n) &&
                          '!bg-green-50 !border-text-green',
                      ]"
                      @click="setRoomCount(n)"
                    >
                      <div v-show="!!selectedRooms.find(el => el === n)">
                        <IconsCheckedIcon class="w-3 h-3 text-text-green" />
                      </div>
                      {{ $numberFormat(n) }} {{ n == 5 ? '+' : null }}
                    </div>
                  </div>
                </div>
                <CommonTheDivider />
                <div class="flex flex-col h-full gap-4">
                  <div
                    class="flex items-center w-full gap-2 px-4 mt-6 text-sm lg:mt-0"
                  >
                    <IconsBathIcon class="w-5 h-5 text-[#D6D6D6] shrink-0" />
                    <span>{{ $t('baths') }}</span>
                  </div>
                  <div class="flex flex-wrap items-center w-full gap-1 px-3">
                    <div
                      class="w-10 h-10 rounded-lg capitalize flex items-center justify-center border border-[#DDDDDD] transition-all text-xs md:text-sm font-light text-black duration-300 bg-white cursor-pointer"
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
                      class="w-fit px-3.5 h-10 rounded-lg flex items-center justify-center gap-2 border border-[#DDDDDD] transition-all text-xs md:text-sm font-light text-black duration-300 bg-white cursor-pointer"
                      :class="[
                        !!selectedBaths.find(el => el == n) &&
                          '!bg-green-50 !border-text-green',
                      ]"
                      @click="setBathsCount(n)"
                    >
                      <div v-show="!!selectedBaths.find(el => el == n)">
                        <IconsCheckedIcon class="w-3 h-3 text-text-green" />
                      </div>
                      {{ $numberFormat(n) }} {{ n == 5 ? '+' : null }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- <FiltersDropdownActionBtn @reset="resetSelection" />-->
              <FiltersDropdownActionBtn
                @reset=";(selectedRooms = []), (selectedBaths = [])"
                @apply="onApplyRoomsAndBaths"
              />
            </template>
          </FiltersDropDownSlotBar>
        </div>
        <div class="w-full max-w-fit shrink-0">
          <FiltersDropDownBar
            ref="pricesMenu"
            base-type="units"
            filter-type="type"
            placeholder="price"
            :allow-local-storage="true"
            content-classes="
             absolute top-full mt-[1px] flex-col gap-4 ltr:right-0 rtl:left-0 z-20 px-5 py-3 w-full min-w-[400px] rounded-xl rounded-tl-none rounded-tr-none border bg-white
              "
            @clicked="onDropdownSelection"
          >
            <template #dropdown-content>
              <div>
                <CommonTabsTheWrapper
                  filter-type="price"
                  @selected="onTabSelect"
                >
                  <CommonTabsTabItem :title="$t('price')">
                    <div class="grid grid-cols-2 gap-4 py-4">
                      <div class="flex flex-col gap-2">
                        <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}</p>
                        <div
                          class="relative group flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                        >
                          <input
                            ref="price"
                            v-model="price[0]"
                            step="0.0000000000001"
                            type="number"
                            class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                            @click.stop="openList('priceList1')"
                          />
                          <div class="text-xs">{{ $t('EGP') }}</div>

                          <transition name="slide-fade">
                            <filtersPriceList
                              v-if="priceList1"
                              :prices="pricesArray"
                              place="from"
                              @mouseenter.native="openList('priceList1')"
                              @mouseleave.native="closeList('priceList1')"
                              @click.stop
                              @priceSelected="
                                ;(price = [$event, price[1]]),
                                  (priceList1 = false)
                              "
                            />
                          </transition>
                          <!-- priceChange($event) -->
                        </div>
                      </div>
                      <div class="flex flex-col gap-2">
                        <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}</p>
                        <div
                          class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                        >
                          <input
                            v-model="price[1]"
                            step="0.0000000000001"
                            type="number"
                            class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                            @click.stop="openList('priceList2')"
                          />
                          <div class="text-xs">{{ $t('EGP') }}</div>
                          <transition name="slide-fade">
                            <filtersPriceList
                              v-if="priceList2"
                              :prices="pricesArray.filter(p => p > +price[0])"
                              place="to"
                              @mouseenter.native="openList('priceList2')"
                              @mouseleave.native="closeList('priceList2')"
                              @click.stop
                              @priceSelected="
                                ;(price = [price[0], $event]),
                                  (priceList2 = false)
                              "
                            />
                          </transition>
                        </div>
                      </div>
                    </div>
                  </CommonTabsTabItem>

                  <CommonTabsTabItem :title="$t('down_payment')">
                    <div class="grid grid-cols-2 gap-4 py-4">
                      <div class="flex flex-col gap-2">
                        <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}</p>
                        <div
                          class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                        >
                          <input
                            v-model="min_down_payment[0]"
                            type="number"
                            step="0.0000000000001"
                            class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                            @click.stop="openList('priceList3')"
                          />

                          <div class="text-xs">{{ $t('EGP') }}</div>
                          <transition name="slide-fade">
                            <filtersPriceList
                              v-if="priceList3"
                              :prices="pricesArray"
                              place="from"
                              @mouseenter.native="openList('priceList3')"
                              @mouseleave.native="closeList('priceList3')"
                              @click.stop
                              @priceSelected="
                                ;(min_down_payment = [
                                  $event,
                                  min_down_payment[1],
                                ]),
                                  (priceList3 = false)
                              "
                            />
                          </transition>
                        </div>
                      </div>
                      <div class="flex flex-col gap-2">
                        <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}</p>
                        <div
                          class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                        >
                          <input
                            v-model="min_down_payment[1]"
                            type="number"
                            step="0.0000000000001"
                            class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                            @click.stop="openList('priceList4')"
                          />
                          <div class="text-xs">{{ $t('EGP') }}</div>
                          <transition name="slide-fade">
                            <filtersPriceList
                              v-if="priceList4"
                              :prices="
                                pricesArray.filter(
                                  p => p > +min_down_payment[0]
                                )
                              "
                              place="to"
                              @mouseenter.native="openList('priceList4')"
                              @mouseleave.native="closeList('priceList4')"
                              @click.stop
                              @priceSelected="
                                ;(min_down_payment = [
                                  min_down_payment[0],
                                  $event,
                                ]),
                                  (priceList4 = false)
                              "
                            />
                          </transition>
                        </div>
                      </div>
                    </div>
                    <!-- <FiltersDropdownActionBtn
                    @reset="min_down_payment = []"
                    @apply="onApplyMinDownPayment"
                  /> -->
                  </CommonTabsTabItem>

                  <CommonTabsTabItem :title="$t('installment')">
                    <div class="grid grid-cols-2 gap-4 py-4" @click.stop>
                      <div class="flex flex-col gap-2">
                        <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}</p>
                        <div
                          class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                        >
                          <input
                            v-model="min_recurring_payment[0]"
                            type="number"
                            step="0.0000000000001"
                            class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                            @click.stop="openList('priceList5')"
                          />
                          <div class="text-xs">{{ $t('EGP') }}</div>
                          <transition name="slide-fade">
                            <filtersPriceList
                              v-if="priceList5"
                              :prices="pricesArray"
                              place="from"
                              @mouseenter.native="openList('priceList5')"
                              @mouseleave.native="closeList('priceList5')"
                              @click.stop
                              @priceSelected="
                                ;(min_recurring_payment = [
                                  $event,
                                  min_recurring_payment[1],
                                ]),
                                  (priceList5 = false)
                              "
                            />
                          </transition>
                        </div>
                      </div>
                      <div class="flex flex-col gap-2" @click.stop>
                        <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}</p>
                        <div
                          class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                        >
                          <input
                            v-model="min_recurring_payment[1]"
                            type="number"
                            step="0.0000000000001"
                            class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                            @click.stop="openList('priceList6')"
                          />
                          <div class="text-xs">{{ $t('EGP') }}</div>
                          <transition name="slide-fade">
                            <filtersPriceList
                              v-if="priceList6"
                              :prices="
                                pricesArray.filter(
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
                                  (priceList6 = false)
                              "
                            />
                          </transition>
                        </div>
                      </div>
                    </div>
                    <!-- <FiltersDropdownActionBtn
                    @reset="min_recurring_payment = []"
                    @apply="onApplyMinRecurringpayment"
                  /> -->
                  </CommonTabsTabItem>
                  <FiltersDropdownActionBtn
                    @reset="
                      ;(price = []),
                        (min_down_payment = []),
                        (min_recurring_payment = [])
                    "
                    @apply="onApplyPrices"
                  />
                </CommonTabsTheWrapper>
              </div>
            </template>
            <template #bar-icon>
              <IconsPriceIcon
                class="w-5 h-5 pointer-events-none shrink-0 fill-icon-header"
              />
            </template>
          </FiltersDropDownBar>
        </div>

        <div
          class="flex items-center justify-center w-full px-2 max-w-fit shrink-0 min-w-[60px]"
        >
          <div
            class="flex justify-center w-full gap-2 px-2 py-2 lg:w-auto lg:py-0"
          >
            <div
              class="relative flex items-center justify-center w-full h-10 bg-white border cursor-pointer rounded-xl lg:w-10 text-text-green"
              :class="
                $store.state.filter.selectedFilters?.length
                  ? 'border-text-green'
                  : 'border-slate-200'
              "
              @click="$store.commit('SET_MODAL', 'discoverFiltersModal')"
            >
              <IconsFilterIcon class="w-5 h-5" />
              <span
                v-show="$store.state.filter.selectedFilters?.length"
                class="absolute right-0 flex w-3 h-3 -top-1"
              >
                <span
                  class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-text-green"
                ></span>
                <span
                  class="relative inline-flex w-3 h-3 rounded-full bg-text-green"
                ></span>
              </span>
            </div>
          </div>
          <button
            class="flex items-center justify-center w-full h-10 text-white rounded-md cursor-pointer shrink-0 lg:w-10 bg-text-green"
            @click="submit"
          >
            <IconsSearchIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center w-full px-3 bg-white border-b border-gray-200 gap-x-6"
      >
        <div
          class="flex flex-wrap items-center flex-shrink-0 gap-2 py-2 md:gap-4"
        >
          <div
            v-for="st in saleTypes"
            :key="`sort-${st}`"
            class="flex items-center justify-center px-2 py-1 text-xs text-black capitalize transition-all duration-200 cursor-pointer md:px-4 md:py-2 md:text-sm hover:bg-text-green hover:text-white rounded-xl hover:border-text-green"
            :class="[
              (selectedSaleTypes.length === 0 && st === 'all') ||
              !!selectedSaleTypes.find(el => el === st)
                ? '!bg-text-green !text-white !border-text-green'
                : 'bg-white border border-gray-200 ',
            ]"
            @click="setSaleType(st)"
          >
            {{
              st.replace(
                new RegExp('\\b' + 'sale' + '\\b'),
                $t('from_developer')
              )
            }}
          </div>
        </div>
        <div
          class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer shrink-0 w-fit"
          :class="[
            ready_to_move === 'ready_to_move' &&
              'bg-green-50 !border-text-green',
          ]"
          @click="
            ready_to_move === 'ready_to_move'
              ? setReadyToMove('')
              : setReadyToMove('ready_to_move')
          "
        >
          <div
            class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
            :class="[ready_to_move === 'ready_to_move' && '!border-text-green']"
          >
            <div v-if="ready_to_move === 'ready_to_move'">
              <IconsCheckedIcon class="w-3 h-3 text-black" />
            </div>
          </div>
          <p
            class="text-sm font-normal text-gray-500 capitalize transition-all duration-300"
            :class="[ready_to_move === 'ready_to_move' && '!text-black']"
          >
            {{ $t('ready_to_move') }}
          </p>
        </div>
        <div class="flex items-center flex-1 gap-4 overflow-x-auto">
          <div
            v-for="filter in filters"
            :key="`filter-${filter.key}`"
            class="flex-nowrap shrink-0"
          >
            <div
              class="flex items-center justify-between gap-2 px-4 py-2 text-xs font-light text-black capitalize border w-fit rounded-xl border-text-green bg-green-50 flex-nowrap shrink-0"
            >
              <span v-show="filter.key.replaceAll('_', ' ') != filter.value">
                {{ filter.key.replaceAll('_', ' ') }} :
              </span>

              <span
                v-if="
                  filter.value &&
                  filter.value.length &&
                  Array.isArray(filter.value)
                "
              >
                {{ filter.value.join(',') }}
                <span v-show="filter.key == 'area'">
                  {{ $t('m_2') }} <sup>2</sup>
                </span>
                <span
                  v-show="
                    filter.key == 'project_id' ||
                    filter.key == 'developer_id' ||
                    filter.key == 'state_id'
                  "
                >
                  {{ filter.value }}
                </span>
                <span
                  v-show="
                    filter.key == 'price' ||
                    filter.key == 'min_down_payment' ||
                    filter.key == 'min_recurring_payment'
                  "
                >
                  {{ $t('EGP') }}
                </span>
              </span>
              <span v-else>
                {{ filter.key.replaceAll('_', ' ') === filter.value }}
                {{ filter.value }}
              </span>

              <a
                class="flex items-center justify-center cursor-pointer"
                @click="removeFilter(filter)"
              >
                <IconsCloseIcon2 class="w-2 h-2 text-black" />
              </a>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <div class="relative w-fit">
            <div
              class="flex items-center justify-between px-4 py-4 cursor-pointer"
              @click="menuShow = !menuShow"
            >
              <div class="flex items-center w-full gap-2">
                <slot name="bar-icon"></slot>
                <p
                  class="px-1 text-xs font-light capitalize truncate md:text-sm"
                >
                  {{ $t('sort_by') }}: {{ $t(`${value}`) }}
                </p>
              </div>
              <IconsArrowDownCheveronIcon
                class="w-3 h-3 text-black duration-300 rotate-0 shrink-0"
                :class="[menuShow && '-rotate-180']"
              />
            </div>
            <div
              v-if="menuShow"
              v-on-clickaway="menuAwayClose"
              class="absolute z-10 flex flex-col w-full mt-[1px] bg-white shadow-md top-full rounded-b-md max-h-[150px] overflow-y-auto"
            >
              <a
                v-for="d in data"
                :key="`data-sort-${d}`"
                class="w-full px-4 py-3 text-xs font-light capitalize border-b border-gray-200 cursor-pointer md:text-sm hover:text-text-green last:border-b-0"
                @click="setValue(`${d}`)"
                >{{ $t(`${d}`) }}</a
              >
            </div>
          </div>

          <div
            class="px-4 text-sm capitalize bg-transparent border-0 outline-none cursor-pointer text-text-green"
            @click="resetAll"
          >
            {{ $t('reset_all') }}
          </div>

          <button
            v-if="false"
            class="px-4 py-2 text-sm text-black capitalize bg-white border outline-none rounded-xl border-text-green"
            @click="saveSearch"
          >
            {{ $t('save_search') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    propUnitTypes: {
      default: null,
    },
    path: {
      type: String,
    },
  },
  data() {
    return {
      unitTypes: [],
      propertySpace: [20, 2000],
      sliderFormatter: null,
      sliderFormatter2: null,
      selectedRooms: [],
      selectedBaths: [],
      selectedSaleTypes: [],
      saleTypes: [
        this.$t('all'),
        this.$t('sale'),
        this.$t('resale'),
        this.$t('rent'),
      ],
      menuShow: false,
      value: 'default_v',
      data: ['default_v', 'price', 'area', 'bedrooms'],
      ready_to_move: '',
      showType: false,
      showPrice: false,
      selectedCommertialUnitTypes: [],
      selectedResidentialUnitTypes: [],
      tabSelection: '',
      defaultTabSelection: {
        type: 'residential',
        price: 'price',
      },
      priceList1: false,
      priceList2: false,
      priceList3: false,
      priceList4: false,
      priceList5: false,
      priceList6: false,
      price: ['', ''],
      min_down_payment: ['', ''],
      min_recurring_payment: ['', ''],
      unitTypeFilter: 'is_residentail',
      selectedUnitTypes: [],
      commerical: [],
      residential: [],
      fetchedUnitFeatures: [],
      selectedUnitFeatures: [],
    }
  },
  async fetch() {
    // get unit features
    const unitFeatures = await this.$axios.get('/unit_features', {
      params: {
        per_page: '100',
      },
    })
    this.fetchedUnitFeatures = unitFeatures.data.data
  },
  computed: {
    filters() {
      return [...this.$store.state.filter.selectedFilters]
    },
    display() {
      return this.$store.state.display
    },
    // selectedUnitTypes() {
    //   return this.selectedCommertialUnitTypes.concat(
    //     this.selectedResidentialUnitTypes
    //   )
    // },
    unitTypesList() {
      return this.selectedUnitTypes.map(item => {
        return 'unit_type_id = ' + item.id
      })
    },
    pricesArray() {
      if (this.$store.state.filter.searchType === 'buy') {
        return [
          100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000,
          900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000,
          1700000, 1800000, 1900000, 2000000, 4000000, 6000000, 8000000,
          10000000, 20000000, 40000000, 60000000, 80000000, 100000000,
        ]
      }
      if (this.$store.state.filter.searchType === 'rent') {
        return [
          2000, 4000, 3000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 40000,
          60000, 80000, 100000, 200000, 300000, 400000, 500000,
        ]
      }
      return []
    },
  },
  watch: {
    propertySpace(newV, oldV) {
      if (!newV[0] || !newV[1]) {
        this.propertySpace = [20, 2000]
      }
    },
  },
  // watch: {
  //   price: {
  //     deep: true,
  //     // immediate: true,
  //     handler(newVal) {
  //       this.$store.commit('filter/ADD_SELECTED_FILTERS', {
  //         key: 'price',
  //         range: true,
  //         q: [`price >= ${newVal[0]}`, `price <= ${newVal[1]}`],
  //         value: [...newVal],
  //       })
  //     },
  //   },
  //   min_down_payment: {
  //     handler(newVal) {
  //       this.$store.commit('filter/ADD_SELECTED_FILTERS', {
  //         key: 'min_down_payment',
  //         range: true,
  //         q: [
  //           `min_down_payment >= ${newVal[0]}`,
  //           `min_down_payment <= ${newVal[1]}`,
  //         ],
  //         value: [...newVal],
  //       })
  //     },
  //     deep: true,
  //     // immediate: true,
  //   },
  //   min_recurring_payment: {
  //     handler(newVal) {
  //       this.$store.commit('filter/ADD_SELECTED_FILTERS', {
  //         key: 'min_recurring_payment',
  //         range: true,
  //         q: [
  //           `min_recurring_payment >= ${newVal[0]}`,
  //           `min_recurring_payment <= ${newVal[1]}`,
  //         ],
  //         value: [...newVal],
  //       })
  //     },
  //     deep: true,
  //     // immediate: true,
  //   },
  // },
  mounted() {
    this.initFilters()
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

    // get unit types
    setTimeout(() => {
      this.getUnitTypes()
    }, 1000)
  },

  methods: {
    async getUnitTypes() {
      if (this.propUnitTypes?.status == 200) {
        const resolvedUnitTypes = (
          this.propUnitTypes.data?.data as any[]
        ).reduce(
          (unitTypes, current) => {
            if (current.is_commercial) {
              unitTypes[0].push(current)
            } else if (current.is_residentail) {
              unitTypes[1].push(current)
            }
            return unitTypes
          },
          [[], []] as [string[], string[]]
        )

        const [commercial, residential] = resolvedUnitTypes
        this.commerical = commercial
        this.residential = residential
        this.unitTypes = this.propUnitTypes?.data?.data
        return
      }

      const unitTypes = await this.$axios.get('/get-unit-types', {
        params: {
          per_page: '100',
          'filter[get_residentail_commercial]': true,
        },
      })
      this.unitTypes = { ...unitTypes }
      const resolvedUnitTypes = (unitTypes.data?.data as any[]).reduce(
        (unitTypes, current) => {
          if (current.is_commercial) {
            unitTypes[0].push(current)
          } else if (current.is_residentail) {
            unitTypes[1].push(current)
          }
          return unitTypes
        },
        [[], []] as [string[], string[]]
      )

      const [commercial, residential] = resolvedUnitTypes
      this.commerical = commercial
      this.residential = residential

      this.unitTypes = unitTypes?.data?.data
    },
    initFilters() {
      this.filters.forEach(item => {
        switch (item.key) {
          case 'sale_type': {
            this.selectedSaleTypes = [...item.value]
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
          case 'price': {
            this.price = [...item.value]
            break
          }
          case 'min_down_payment': {
            this.min_down_payment = [...item.value]
            break
          }
          case 'min_recurring_payment': {
            this.min_recurring_payment = [...item.value]
            break
          }
          case 'unit_type': {
            this.unitTypes.forEach(el => {
              if (item.value.includes(el.name)) {
                this.selectedUnitTypes.push(el)
              }
            })
            break
          }
          case 'unit_features': {
            // this.selectedUnitFeatures = [...item.value]
            this.fetchedUnitFeatures.forEach(el => {
              if (item.value[0].includes(el.name)) {
                this.selectedUnitFeatures.push(el)
              }
            })
            break
          }
        }
      })
    },
    async unitTypesFiltered(e: string) {
      if (e === 'Commercial') {
        this.unitTypeFilter = 'is_commercial'
      } else {
        this.unitTypeFilter = 'is_residentail'
      }
      // const result =
      //   e === 'Commercial'
      //     ? (this.unitTypeFilter = 'is_commercial=true')
      //     : 'is_residential=true'

      const unitTypes = await this.$axios.get('/get-unit-types', {
        params: {
          per_page: '100',
          [`filter[${this.unitTypeFilter}]`]: 'true',
        },
      })
      this.unitTypes = unitTypes?.data?.data
    },
    onTabSelect(val: string) {
      this.tabSelection = val
      this.selectedUnitTypes = []
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'unit_type',
        range: true,
        q: [[this.unitTypesList]],
        value: [...this.selectedUnitTypes],
      })
    },
    onDropdownSelection(e: Event) {
      const text = (e.target as HTMLElement)?.outerText
      if (e && ['Type', 'Price'].includes(text)) {
        const text = (e.target as HTMLElement).outerText
        this.showType = text === 'Type'
        this.showPrice = text === 'Price'
        this.tabSelection = (this.defaultTabSelection as any)[
          text.toLocaleLowerCase()
        ].toLocaleLowerCase()
      }
    },
    resetSelection() {
      switch (this.tabSelection.toLocaleLowerCase()) {
        case 'residential': {
          this.selectedUnitTypes = []
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'unit_type',
            range: true,
            q: [[this.unitTypesList]],
            value: [...this.selectedUnitTypes],
          })

          break
        }
        case 'commercial': {
          this.selectedUnitTypes = []
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'unit_type',
            range: true,
            q: [[this.unitTypesList]],
            value: [...this.selectedUnitTypes],
          })
          break
        }
        case 'price': {
          this.price = ['', '']
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'price',
            range: true,
            q: [`price >= ${this.price[0]}`, `price <= ${this.price[1]}`],
            value: [...this.price],
          })
          break
        }
        case 'down payments': {
          this.min_down_payment = ['', '']
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'min_down_payment',
            range: true,
            q: [
              `min_down_payment >= ${this.min_down_payment[0]}`,
              `min_down_payment <= ${this.min_down_payment[1]}`,
            ],
            value: [...this.min_down_payment],
          })
          break
        }
        case 'installment': {
          this.min_recurring_payment = ['', '']
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'min_recurring_payment',
            range: true,
            q: [
              `min_recurring_payment >= ${this.min_recurring_payment[0]}`,
              `min_recurring_payment <= ${this.min_recurring_payment[1]}`,
            ],
            value: [...this.min_recurring_payment],
          })
          break
        }
      }
    },
    setReadyToMove(status: string) {
      this.ready_to_move = status

      if (this.ready_to_move === 'ready_to_move') {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'ready_to_move',
          value: ['ready to move'],
        })
      } else {
        this.$store.commit('filter/REMOVE_SELECTED_FILTERS', 'ready_to_move')
      }
      this.submit()
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
      this.$refs.properitySpaceMenu.menuShow = false
    },
    // setPrice() {
    //   this.$store.commit('filter/ADD_SELECTED_FILTERS', {
    //     key: 'price',
    //     range: true,
    //     q: [`price >= ${this.price[0]}`, `price <= ${this.price[1]}`],
    //     value: [...this.price],
    //   })
    // },
    setRoomCount(rc: string) {
      if (rc === 'all') {
        this.selectedRooms = []
      } else {
        const index = this.selectedRooms.indexOf(rc)
        if (index > -1) {
          this.selectedRooms.splice(index, 1)
        } else {
          this.selectedRooms.push(rc)
        }
      }
    },
    setBathsCount(bc: string) {
      if (bc === 'all') {
        this.selectedBaths = []
      } else {
        const index = this.selectedBaths.indexOf(bc)
        if (index > -1) {
          this.selectedBaths.splice(index, 1)
        } else {
          this.selectedBaths.push(bc)
        }
      }
    },
    onApplyRoomsAndBaths() {
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

      this.$refs.roomsAndBathsMenu.menuShow = false
    },

    setSaleType(value: string) {
      if (value === 'all') {
        this.selectedSaleTypes = []
      } else {
        const index = this.selectedSaleTypes.indexOf(value)
        if (index > -1) {
          this.selectedSaleTypes.splice(index, 1)
        } else {
          this.selectedSaleTypes.push(value)
        }
      }

      const propertyTypesPayload = this.selectedSaleTypes.map(item => {
        return 'sale_type = ' + item
      })

      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'sale_type',
        range: true,
        value: [...this.selectedSaleTypes],
        q: [[propertyTypesPayload]],
      })
      this.submit()
    },
    // setCommertialUnitType(ut) {
    //   const index = this.selectedUnitTypes.indexOf(ut)
    //   if (index > -1) {
    //     this.selectedUnitTypes.splice(index, 1)
    //   } else {
    //     this.selectedUnitTypes.push(ut)
    //   }

    //   this.$store.commit('filter/ADD_SELECTED_FILTERS', {
    //     key: 'unit_type',
    //     range: true,
    //     q: [[this.unitTypesList]],
    //     value: [...this.selectedUnitTypes],
    //   })
    // },
    // setResidentialUnitType(ut) {
    //   const index = this.selectedUnitTypes.indexOf(ut)
    //   if (index > -1) {
    //     this.selectedUnitTypes.splice(index, 1)
    //   } else {
    //     this.selectedUnitTypes.push(ut)
    //   }

    //   this.$store.commit('filter/ADD_SELECTED_FILTERS', {
    //     key: 'unit_type',
    //     range: true,
    //     q: [[this.unitTypesList]],
    //     value: [...this.selectedUnitTypes],
    //   })
    // },
    setUnitFeatures(value) {
      const index = this.selectedUnitFeatures.indexOf(value)
      if (index > -1) {
        this.selectedUnitFeatures.splice(index, 1)
      } else {
        this.selectedUnitFeatures.push(value)
      }
    },
    setUnitTypes(ut) {
      const index = this.selectedUnitTypes.indexOf(ut)
      if (index > -1) {
        this.selectedUnitTypes.splice(index, 1)
      } else {
        this.selectedUnitTypes.push(ut)
      }
    },
    menuAwayClose() {
      this.menuShow = false
    },
    async setValue(value: string) {
      this.value = value
      this.menuAwayClose()
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('unit/getUnits', {
        page: 1,
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
        sort: this.value === 'default_v' ? '' : this.value,
      })
      this.$store.commit('CHANGE_LOADING', false)
    },
    removeFilter(f: { key: string }) {
      this.$store.commit('filter/REMOVE_SELECTED_FILTERS', f.key)

      if (f.key === 'ready_to_move') {
        this.ready_to_move = ''
      }
      if (f.key === 'sale_type') {
        this.selectedSaleTypes = []
      }

      if (f.key === 'unit_features') {
        this.selectedUnitFeatures = []
      }

      if (f.key === 'unit_type') {
        this.selectedUnitTypes = []
      }

      if (f.key === 'bedroom') {
        this.selectedRooms = []
      }
      if (f.key === 'bathroom') {
        this.selectedBaths = []
      }

      if (f.key === 'area') {
        this.propertySpace = [20, 2000]
      }
      if (f.key === 'price') {
        this.price = ['', '']
      }
      if (f.key === 'search_keywords') {
        this.$refs.searchBar.searchedNames =
          this.$refs.searchBar.searchedNames.filter(el => {
            return el.type !== 'search_keywords'
          })
      }

      if (f.key === 'developer') {
        this.$refs.searchBar.searchedNames =
          this.$refs.searchBar.searchedNames.filter(el => {
            return el.type !== 'developer_id'
          })
      }
      if (f.key === 'project') {
        this.$refs.searchBar.searchedNames =
          this.$refs.searchBar.searchedNames.filter(el => {
            return el.type !== 'project_id'
          })
      }
      if (f.key === 'state') {
        this.$refs.searchBar.searchedNames =
          this.$refs.searchBar.searchedNames.filter(el => {
            return el.type !== 'state_id'
          })
      }

      this.$refs.searchBar.searchPayload = [
        ...this.$refs.searchBar.searchedNames,
      ]

      this.submit()
      // const payload = {
      //   path: 'units',
      //   filter: {
      //     key: f.key,
      //     value: '',
      //   },
      // }
      // this.$store.commit('filter/ADD_FILTER', payload)
    },
    async submit() {
      this.$store.commit('filter/APPLY')
      this.$store.commit('CHANGE_LOADING', true)
      const payload = {
        page: 1,
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
      }
      if (this.value !== 'default_v') {
        payload.sort = this.value
      }
      // await this.$store.dispatch('unit/getUnits', payload)
      await this.$store.dispatch('search/getItems', {
        fromUnits: true,
        page: 1,

        per_page: 25,
      } as RequestPayload<UnitAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
    resetAll() {
      this.selectedBaths = []
      this.value = 'default_v'
      this.selectedRooms = []
      this.propertySpace = [20, 2000]
      this.price = ['', '']
      this.min_down_payment = []
      this.min_recurring_payment = []
      this.selectedSaleTypes = []
      this.ready_to_move = ''
      this.selectedUnitTypes = []
      this.selectedCommertialUnitTypes = []
      this.selectedResidentialUnitTypes = []

      this.$refs.searchBar.searchedNames = []
      this.$refs.searchBar.searchPayload = []

      this.$store.commit('filter/RESET')
      this.submit()

      // this.$store.commit('filter/CLEAR', payload)
      // this.submit()
    },
    saveSearch() {
      this.$store.commit('filter/APPLY')
      this.submit()
    },
    numFormat(value: string) {
      const strArr = value.split(',')
      if (strArr.length === 1) {
        return value
      } else if (strArr.length >= 2) {
        const last = strArr[strArr.length - 1]
        strArr.splice(strArr.length - 1, 1)
        return `${strArr.join(',')} ${this.$t('and')} ${last}`
      }
    },
    openList(list: any) {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /mobile|android/.test(userAgent)

      if (isMobile) {
        // The user is on a mobile platform
        this[list] = true
        return
      }
      if (this[list]) {
        clearTimeout(this[list])
        return
      }

      this[list] = setTimeout(() => {
        this[list] = false
      }, 1500)
    },
    closeList(list: any) {
      this[list] = true
      this[list] = setTimeout(() => {
        this[list] = false
      }, 1500)
    },
    onAppliedType() {
      this.showType = false
      if (this.selectedUnitTypes && this.selectedUnitTypes.length) {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'unit_type',
          range: true,
          q: [[this.unitTypesList]],
          value: this.selectedUnitTypes.map(el => el.name),
        })
      } else {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'unit_type',
          value: [this.tabSelection],
        })
      }
      this.$refs.unitTypes.menuShow = false
    },
    onAppliedFeatures() {
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'unit_features',
        range: true,
        q: [
          [
            this.selectedUnitFeatures.map(item => {
              return 'unit_features.id = ' + item.id
            }),
          ],
        ],
        value: [this.selectedUnitFeatures.map(el => el.name)],
      })

      this.$refs.unitFeatures.menuShow = false
    },
    onApplyPrice() {
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'price',
        range: true,
        q: [`price >= ${this.price[0]}`, `price <= ${this.price[1]}`],
        value: [...this.price],
      })
    },
    onApplyMinDownPayment() {
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'min_down_payment',
        range: true,
        q: [
          `min_down_payment >= ${this.min_down_payment[0]}`,
          `min_down_payment <= ${this.min_down_payment[1]}`,
        ],
        value: [...this.min_down_payment],
      })
    },
    onApplyMinRecurringpayment() {
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'min_recurring_payment',
        range: true,
        q: [
          `min_recurring_payment >= ${this.min_recurring_payment[0]}`,
          `min_recurring_payment <= ${this.min_recurring_payment[1]}`,
        ],
        value: [...this.min_recurring_payment],
      })
    },
    onApplyPrices() {
      // price case
      const price = {
        key: 'price',
        range: true,
        q: [`price >= ${this.price[0]}`, `price <= ${this.price[1]}`],
        value: [...this.price],
      }
      if (this.price[0] === this.pricesArray[0]) {
        price.q.shift()
      }
      if (this.price[1] === this.pricesArray[this.pricesArray.length - 1]) {
        price.q.pop()
      }
      this.$store.commit('filter/ADD_SELECTED_FILTERS', price)

      // min_down_payment case
      const minDownPayment = {
        key: 'min_down_payment',
        range: true,
        q: [
          `min_down_payment >= ${this.min_down_payment[0]}`,
          `min_down_payment <= ${this.min_down_payment[1]}`,
        ],
        value: [...this.min_down_payment],
      }
      if (this.min_down_payment[0] === this.pricesArray[0]) {
        minDownPayment.q.shift()
      }
      if (
        this.min_down_payment[1] ===
        this.pricesArray[this.pricesArray.length - 1]
      ) {
        minDownPayment.q.pop()
      }
      this.$store.commit('filter/ADD_SELECTED_FILTERS', minDownPayment)

      // min_recurring_payment case
      const minRecurringPayment = {
        key: 'min_recurring_payment',
        range: true,
        q: [
          `min_recurring_payment >= ${this.min_recurring_payment[0]}`,
          `min_recurring_payment <= ${this.min_recurring_payment[1]}`,
        ],
        value: [...this.min_recurring_payment],
      }
      if (this.min_recurring_payment[0] === this.pricesArray[0]) {
        minRecurringPayment.q.shift()
      }
      if (
        this.min_recurring_payment[1] ===
        this.pricesArray[this.pricesArray.length - 1]
      ) {
        minRecurringPayment.q.pop()
      }
      this.$store.commit('filter/ADD_SELECTED_FILTERS', minRecurringPayment)

      this.$refs.pricesMenu.menuShow = false
    },

    showResult() {
      this.$store.commit('filter/APPLY')
      // this.$router.push(this.localePath('/discover?page=1'))
      this.$store.commit('SET_MODAL', '')
    },
  },
})
</script>

<style scoped>
:deep(.filtersParent > *) {
  @apply sm:border-l border-[#dddddd] last:border-none;
}
</style>
