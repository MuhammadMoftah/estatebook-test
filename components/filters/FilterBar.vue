<template>
  <div>
    <!-- Mobile -->
    <div
      class="flex h-[120px] w-full min-w-[380px] flex-col rounded-2xl lg:hidden"
    >
      <!-- Dropdowns wrapper -->
      <div
        class="relative flex items-center justify-between w-full border-b divide-x h-1/2"
      >
        <FiltersDropDownBar
          base-type="search"
          filter-type="type"
          placeholder="buy"
          :data="['buy', 'rent']"
          :allow-local-storage="true"
          class="active:rounded-bl-none"
        >
          <template #bar-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 text-gray-300 pointer-events-none fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z"
              />
            </svg>
          </template>
        </FiltersDropDownBar>

        <!-- Dropdown (Property type) -->
        <FiltersDropDownBar
          ref="unitTypes"
          base-type="search"
          filter-type="type"
          placeholder="type"
          :allow-local-storage="true"
          content-classes="absolute top-full mt-[1px] flex-col gap-4 lg:right-0 -right-[157px] z-10 px-5 py-3 w-full min-w-[400px] rounded-xl rounded-tl-none rounded-tr-none border bg-white"
        >
          <!-- class="relative inline-flex items-center justify-center flex-auto h-full gap-2 px-4 group" -->
          <template #dropdown-content>
            <CommonTabsTheWrapper filter-type="sale_type">
              <CommonTabsTabItem
                class="grid grid-cols-2 gap-4"
                :title="$t('residential')"
                classes="max-h-[200px] overflow-y-scroll"
              >
                <div
                  v-for="unit_type in unitTypes"
                  :key="`unit-type-${unit_type.id}`"
                  class="flex items-center w-full gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer"
                  :class="{
                    'bg-green-50 !border-text-green':
                      selectedResidentialUnitTypes.includes(unit_type.name),
                  }"
                  @click="setResidentialUnitType(unit_type.name)"
                >
                  <div
                    class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                    :class="{
                      '!border-text-green':
                        selectedResidentialUnitTypes.includes(unit_type.name),
                    }"
                  >
                    <div
                      v-show="
                        selectedResidentialUnitTypes.includes(unit_type.name)
                      "
                    >
                      <IconsCheckedIcon class="w-3 h-3 text-black" />
                    </div>
                  </div>
                  <p
                    class="text-xs font-normal text-gray-500 capitalize truncate transition-all duration-300"
                    :class="{
                      '!text-black': selectedResidentialUnitTypes.includes(
                        unit_type.id
                      ),
                    }"
                  >
                    {{ unit_type.name }}
                  </p>
                </div>
              </CommonTabsTabItem>
              <CommonTabsTabItem
                class="grid grid-cols-2 gap-4"
                :title="$t('commercial')"
                classes="max-h-[200px] overflow-y-auto"
              >
                <div
                  v-for="unit_type in unitTypes"
                  :key="`unit-type-${unit_type.id}`"
                  class="flex items-center w-full gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer"
                  :class="{
                    'bg-green-50 !border-text-green':
                      selectedCommertialUnitTypes.includes(unit_type.name),
                  }"
                  @click="setCommertialUnitType(unit_type.name)"
                >
                  <div
                    class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                    :class="{
                      '!border-text-green':
                        selectedCommertialUnitTypes.includes(unit_type.name),
                    }"
                  >
                    <div
                      v-show="
                        selectedCommertialUnitTypes.includes(unit_type.name)
                      "
                    >
                      <IconsCheckedIcon class="w-3 h-3 text-black" />
                    </div>
                  </div>
                  <p
                    class="text-xs font-normal text-gray-500 capitalize truncate transition-all duration-300"
                    :class="{
                      '!text-black': selectedCommertialUnitTypes.includes(
                        unit_type.id
                      ),
                    }"
                  >
                    {{ unit_type.name }}
                  </p>
                </div>
              </CommonTabsTabItem>
            </CommonTabsTheWrapper>
          </template>
          <template #bar-icon>
            <IconsPropertyTypeIcon
              class="w-5 h-5 shrink-0 text-[#D6D6D6] pointer-events-none"
            />
          </template>
        </FiltersDropDownBar>

        <!-- Dropdown (Price) -->
        <FiltersDropDownBar
          ref="pricesMenu"
          base-type="search"
          filter-type="type"
          placeholder="price"
          :allow-local-storage="true"
          content-classes="absolute  top-full mt-[1px] flex-col gap-4 right-0 z-10 px-5 py-3 w-full min-w-[400px] rounded-xl rounded-tl-none rounded-tr-none border bg-white"
        >
          <template #dropdown-content>
            <CommonTabsTheWrapper filter-type="price">
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
                        @click="openList('priceList1')"
                      />
                      <div class="text-xs">{{ $t('EGP') }}</div>

                      <transition name="slide-fade">
                        <filtersPriceList
                          v-if="priceList1"
                          :prices="pricesArray"
                          place="from"
                          @mouseenter.native="openList('priceList1')"
                          @mouseleave.native="closeList('priceList1')"
                          @priceSelected="
                            ;(price = [$event, price[1]]), (priceList1 = false)
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
                        @click="openList('priceList2')"
                      />
                      <div class="text-xs">{{ $t('EGP') }}</div>
                      <transition name="slide-fade">
                        <filtersPriceList
                          v-if="priceList2"
                          :prices="pricesArray.filter(p => p > +price[0])"
                          place="to"
                          @mouseenter.native="openList('priceList2')"
                          @mouseleave.native="closeList('priceList2')"
                          @priceSelected="
                            ;(price = [price[0], $event]), (priceList2 = false)
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
                    <!-- <div
                      class="relative group flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                    >
                      <input
                        ref="price"
                        v-model="price[0]"
                        step="0.0000000000001"
                        type="number"
                        class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                        @click="priceList1 = true"
                      />
                      <div class="text-xs">{{ $t('EGP') }}</div> -->
                    <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}</p>
                    <div
                      class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                    >
                      <input
                        v-model="min_down_payment[0]"
                        type="number"
                        step="0.0000000000001"
                        class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                        @click="openList('priceList3')"
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
                        @click="openList('priceList4')"
                      />
                      <div class="text-xs">{{ $t('EGP') }}</div>
                      <transition name="slide-fade">
                        <filtersPriceList
                          v-if="priceList4"
                          :prices="
                            pricesArray.filter(p => p > +min_down_payment[0])
                          "
                          place="to"
                          @mouseenter.native="openList('priceList4')"
                          @mouseleave.native="closeList('priceList4')"
                          @priceSelected="
                            ;(min_down_payment = [min_down_payment[0], $event]),
                              (priceList4 = false)
                          "
                        />
                      </transition>
                    </div>
                  </div>
                </div>
              </CommonTabsTabItem>
              <CommonTabsTabItem :title="$t('installment')">
                <div class="grid grid-cols-2 gap-4 py-4">
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
                        @click="openList('priceList5')"
                      />
                      <div class="text-xs">{{ $t('EGP') }}</div>
                      <transition name="slide-fade">
                        <filtersPriceList
                          v-if="priceList5"
                          :prices="pricesArray"
                          place="from"
                          @mouseenter.native="openList('priceList5')"
                          @mouseleave.native="closeList('priceList5')"
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
                  <div class="flex flex-col gap-2">
                    <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}</p>
                    <div
                      class="flex relative items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                    >
                      <input
                        v-model="min_recurring_payment[1]"
                        type="number"
                        step="0.0000000000001"
                        class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                        @click="openList('priceList6')"
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
                  </div></div
              ></CommonTabsTabItem>
            </CommonTabsTheWrapper>
          </template>
          <template #bar-icon>
            <IconsPriceIcon class="w-5 h-5 shrink-0 fill-icon-header" />
          </template>
        </FiltersDropDownBar>
      </div>

      <!-- Search input field and filter -->
      <div
        class="flex items-center px-3 border-l-0 border-l-none h-1/2 gap-x-2"
      >
        <!-- Search input field -->
        <div class="flex-auto h-full border-l-0">
          <FiltersSearchBar
            base-type="search_criteria"
            filter-base="search"
            filter-type="name"
            placeholder="search_for_units"
            class="flex-auto"
            :allow-local-storage="true"
          />
        </div>

        <!-- Popup button -->

        <div
          class="relative flex items-center justify-center w-10 h-10 bg-white border cursor-pointer rounded-xl text-text-green border-slate-200"
          :class="
            $store.state.filter.selectedFilters?.length
              ? 'border-text-green'
              : 'border-slate-200'
          "
          @click="$store.commit('SET_MODAL', 'filtersModal')"
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

        <!-- Search button -->
        <div class="flex items-center">
          <button
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-transparent bg-[#4CB087]"
            @click="search"
          >
            <IconsSearchIcon class="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div
      class="hidden w-full h-16 border border-gray-200 divide-x rounded-lg group lg:flex"
    >
      <div
        class="relative flex items-center w-full divide-x divide-gray-100 ltr:pr-3 rtl:pl-3"
      >
        <FiltersDropDownBar
          base-type="search"
          filter-type="type"
          placeholder="buy"
          :data="['buy', 'rent']"
          :allow-local-storage="true"
          custom-filter
          @getSelectedValue="getSelectedValue($event)"
        >
          <template #bar-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 text-gray-300 pointer-events-none fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z"
              />
            </svg>
          </template>
        </FiltersDropDownBar>
        <FiltersSearchBar
          base-type="search_criteria"
          filter-base="search"
          filter-type="name"
          placeholder="search_for_units"
          class="flex-auto"
          :allow-local-storage="true"
        />
        <FiltersDropDownBar
          ref="unitTypes"
          base-type="search"
          filter-type="type"
          placeholder="type"
          :allow-local-storage="true"
          content-classes="
              absolute top-full mt-[1px] flex-col gap-4 right-0 z-20 px-5 py-3 w-full min-w-[400px] rounded-xl rounded-tl-none rounded-tr-none border bg-white
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
                    :key="`unit-type-${residentialUnitType}`"
                    class="flex items-center w-full gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer"
                    :class="{
                      'bg-green-50 !border-text-green':
                        selectedUnitTypes.includes(residentialUnitType),
                    }"
                    @click="setUnitTypes(residentialUnitType)"
                  >
                    <div
                      class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                      :class="{
                        '!border-text-green':
                          selectedUnitTypes.includes(residentialUnitType),
                      }"
                    >
                      <div
                        v-show="selectedUnitTypes.includes(residentialUnitType)"
                      >
                        <IconsCheckedIcon class="w-3 h-3 text-black" />
                      </div>
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
                </CommonTabsTabItem>
                <CommonTabsTabItem
                  class="grid grid-cols-2 gap-4"
                  :title="$t('commercial')"
                  classes="max-h-[250px] overflow-y-auto"
                >
                  <div
                    v-for="commericalUnitType in commerical"
                    :key="`unit-type-${commericalUnitType}`"
                    class="flex items-center w-full gap-2 px-4 py-3 border border-gray-200 rounded-lg cursor-pointer"
                    :class="{
                      'bg-green-50 !border-text-green':
                        selectedUnitTypes.includes(commericalUnitType),
                    }"
                    @click.stop="setUnitTypes(commericalUnitType)"
                  >
                    <div
                      class="w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer border border-[#DDDDDD] transition-all duration-300 bg-white"
                      :class="{
                        '!border-text-green':
                          selectedUnitTypes.includes(commericalUnitType),
                      }"
                    >
                      <div
                        v-show="selectedUnitTypes.includes(commericalUnitType)"
                      >
                        <IconsCheckedIcon class="w-3 h-3 text-black" />
                      </div>
                    </div>
                    <p
                      class="text-xs font-normal text-gray-500 capitalize truncate transition-all duration-300"
                      :class="{
                        '!text-black':
                          selectedUnitTypes.includes(commericalUnitType),
                      }"
                    >
                      {{ commericalUnitType }}
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

        <!-- TODO: -->
        <FiltersDropDownBar
          ref="pricesMenu"
          base-type="search"
          filter-type="type"
          placeholder="price"
          :allow-local-storage="true"
          content-classes="absolute top-full mt-[1px] flex-col gap-4 right-0 z-20 px-5 py-3 w-full min-w-[400px] rounded-xl rounded-tl-none rounded-tr-none border bg-white"
        >
          <template #dropdown-content>
            <div>
              <CommonTabsTheWrapper filter-type="price" @selected="onTabSelect">
                <CommonTabsTabItem :title="$t('price')">
                  <div class="grid grid-cols-2 gap-4 py-4">
                    <div class="flex flex-col gap-2">
                      <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}</p>
                      <div
                        class="relative group flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                      >
                        <!-- step="0.0000000000001" -->
                        <input
                          ref="price"
                          v-model="price[0]"
                          type="text"
                          class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
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
                        <!-- step="0.0000000000001" -->
                        <input
                          v-model="price[1]"
                          type="text"
                          class="w-full px-1 text-sm font-medium text-black bg-transparent border-0 outline-none text-light"
                          @click.stop="openList('priceList2')"
                        />
                        <div class="text-xs">{{ $t('EGP') }}</div>
                        <transition name="slide-fade">
                          <!-- millonsArray.filter(
                                p => p > +price[0].replace('m', '')
                              ) -->
                          <filtersPriceList
                            v-if="priceList2"
                            :prices="millonsArray"
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
                              pricesArray.filter(p => p > +min_down_payment[0])
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
                            :prices="installmentPrices"
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
                                (priceList6 = false)
                            "
                          />
                        </transition>
                      </div>
                    </div></div
                ></CommonTabsTabItem>
                <FiltersDropdownActionBtn
                  @reset="resetSelection"
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
        <!-- <FiltersPriceRangeBar base-type="search" filter-type="price_range" /> -->
        <div class="flex">
          <div
            class="flex justify-center w-full gap-2 px-2 py-2 lg:w-auto lg:py-0"
          >
            <div
              class="relative flex items-center justify-center w-full h-10 bg-white border cursor-pointer rounded-xl lg:w-10 text-text-green border-slate-200"
              :class="
                $store.state.filter.selectedFilters?.length
                  ? 'border-text-green'
                  : 'border-slate-200'
              "
              @click="$store.commit('SET_MODAL', 'filtersModal')"
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
          <div
            class="flex items-center justify-center w-full h-10 text-white cursor-pointer rounded-xl lg:w-10 bg-text-green"
            @click="search"
          >
            <IconsSearchIcon class="w-5 h-5" />
          </div>
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
  },
  data() {
    return {
      priceTab: 'price',
      loading: false,
      unitTypes: [],
      commerical: [],
      residential: [],
      selectedCommertialUnitTypes: [],
      selectedResidentialUnitTypes: [],
      price: ['', ''],
      min_down_payment: ['', ''],
      min_recurring_payment: ['', ''],
      priceList1: false,
      priceList2: false,
      priceList3: false,
      priceList4: false,
      priceList5: false,
      priceList6: false,
      unitTypeFilter: 'is_residentail',
      showType: false,
      showPrice: false,
      tabSelection: '',
      defaultTabSelection: {
        type: 'residential',
        price: 'price',
      },
      isOpenedMenu: false,
      selectedUnitTypes: [],
    }
  },
  computed: {
    filters() {
      return [...this.$store.state.filter.selectedFilters]
    },
    millonsArray() {
      const list = ['1 M']
      for (let i = 5; i <= 50; i += 5) {
        list.push(i + ' M')
      }
      return list
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
    installmentPrices() {
      const arr = []
      for (let i = 5000; i <= 500000; i += 5000) {
        arr.push(i)
      }
      return arr
    },

    // allSelectedUnitTypes() {
    //   return this.selectedCommertialUnitTypes.concat(
    //     this.selectedResidentialUnitTypes
    //   )
    // },
    unitTypesList() {
      return this.selectedUnitTypes.map(item => {
        return 'unit_type = ' + item
      })
    },
  },

  async mounted() {
    this.initFilters()

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
              unitTypes[0].push(current.name)
            } else if (current.is_residentail) {
              unitTypes[1].push(current.name)
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
            unitTypes[0].push(current.name)
          } else if (current.is_residentail) {
            unitTypes[1].push(current.name)
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
      this.filters?.forEach(item => {
        switch (item.key) {
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
            this.selectedUnitTypes = [...item.value]
            break
          }
        }
      })
    },
    getSelectedValue(val: string) {
      const saleTypes = ['sale', 'resale']
      const propertyTypesPayload = saleTypes.map(item => {
        return 'sale_type = ' + item
      })
      switch (val) {
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

    resetSelection() {
      switch (this.tabSelection.toLocaleLowerCase()) {
        case 'residential': {
          this.selectedResidentialUnitTypes = []
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'unit_type',
            range: true,
            q: [[this.unitTypesList]],
            value: [...this.selectedUnitTypes],
          })

          break
        }
        case 'commercial': {
          this.selectedCommertialUnitTypes = []
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
            q: [
              `price >= ${this.price[0].replace(' M', '')}`,
              `price <= ${this.price[1].replace(' M', '')}`,
            ],
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

    search() {
      this.$store.commit('filter/APPLY')
      this.$router.push(this.localePath('/discover?page=1'))
    },
    priceTabHandler(val: string) {
      this.priceTab = val
    },
    setUnitTypes(ut) {
      const index = this.selectedUnitTypes.indexOf(ut)
      if (index > -1) {
        this.selectedUnitTypes.splice(index, 1)
      } else {
        this.selectedUnitTypes.push(ut)
      }
    },

    setCommertialUnitType(ut) {
      const index = this.selectedUnitTypes.indexOf(ut)
      if (index > -1) {
        this.selectedUnitTypes.splice(index, 1)
      } else {
        this.selectedUnitTypes.push(ut)
      }

      const unitTypesList = this.selectedUnitTypes.map(item => {
        return 'unit_type = ' + item
      })

      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'unit_type',
        range: true,
        q: [[unitTypesList]],
        value: [...this.selectedUnitTypes],
      })
    },
    setResidentialUnitType(ut) {
      const index = this.selectedUnitTypes.indexOf(ut)
      if (index > -1) {
        this.selectedUnitTypes.splice(index, 1)
      } else {
        this.selectedUnitTypes.push(ut)
      }

      const unitTypesList = this.selectedUnitTypes.map(item => {
        return 'unit_type = ' + item
      })

      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'unit_type',
        range: true,
        q: [[unitTypesList]],
        value: [...this.selectedUnitTypes],
      })
    },
    onAppliedType() {
      this.showType = false
      if (this.selectedUnitTypes && this.selectedUnitTypes.length) {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'unit_type',
          range: true,
          q: [[this.unitTypesList]],
          value: [...this.selectedUnitTypes],
        })
      } else {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'unit_type',
          value: [this.tabSelection],
        })
      }
      this.$refs.unitTypes.menuShow = false
    },
    onApplyPrices() {
      // price case
      const price = {
        key: 'price',
        range: true,
        q: [
          `price >= ${this.price[0].replace(' M', '000000')}`,
          `price <= ${this.price[1].replace(' M', '000000')}`,
        ],
        value: [...this.price.map(item => item.replace(' M', '000000'))],
      }
      if (this.price[0] === this.millonsArray[0]) {
        price.q.shift()
      }
      if (this.price[1] === this.millonsArray[this.millonsArray.length - 1]) {
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
      if (this.min_recurring_payment[0] === this.installmentPrices[0]) {
        minRecurringPayment.q.shift()
      }
      if (
        this.min_recurring_payment[1] ===
        this.installmentPrices[this.installmentPrices.length - 1]
      ) {
        minRecurringPayment.q.pop()
      }
      this.$store.commit('filter/ADD_SELECTED_FILTERS', minRecurringPayment)

      this.$refs.pricesMenu.menuShow = false
    },
  },
})
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}

.slide-fade-enter-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
