<template>
  <div class="w-full bg-white rounded-xl">
    <!-- Mobile -->
    <div
      class="flex h-[120px] w-full min-w-[380px] flex-col rounded-2xl border border-gray-200 lg:hidden"
    >
      <!-- Dropdowns wrapper -->
      <div class="flex items-center w-full border-b divide-x h-1/2">
        <!-- Dropdown (Buy/Rend) -->
        <button
          class="relative inline-flex items-center justify-center h-full px-4 group"
        >
          <div class="flex items-center justify-center gap-2">
            <!-- home.svg -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 text-gray-300 fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z"
              />
            </svg>
            <span class="text-sm">Buy</span>
            <!-- down_arrow.svg -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 mt-1 transition-transform fill-current group-focus:rotate-180"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
              />
            </svg>
          </div>

          <!-- Dropdown -->
          <div
            class="absolute left-0 z-10 hidden w-full bg-white border divide-y divide-gray-100 top-full rounded-bl-xl rounded-br-xl group-focus:block"
          >
            <ul class="py-2 text-sm text-left">
              <li class="block px-4 py-2 hover:bg-gray-100">Buy</li>
              <li class="block px-4 py-2 hover:bg-gray-100">Rent</li>
            </ul>
          </div>
        </button>

        <!-- Dropdown (Property type) -->
        <button
          class="relative inline-flex items-center justify-center flex-auto h-full gap-2 px-4 group"
        >
          <div class="flex items-center justify-center gap-2">
            <!-- menu.svg -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 text-gray-300 fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
            </svg>
            <span class="text-sm">Type</span>
            <!-- down_arrow.svg -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 mt-1 transition-transform fill-current group-focus:rotate-180"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
              />
            </svg>
          </div>

          <!-- Dropdown menu -->
          <div
            class="absolute left-0 z-10 hidden w-full bg-white border divide-y divide-gray-100 top-full rounded-bl-xl rounded-br-xl group-focus:block"
          >
            <ul class="py-2 text-sm text-left">
              <li class="block px-4 py-2 hover:bg-gray-100">Commercial</li>
              <li class="block px-4 py-2 hover:bg-gray-100">Residential</li>
            </ul>
          </div>
        </button>

        <!-- Dropdown (Price) -->
        <button
          class="inline-flex items-center justify-center h-full gap-2 px-4"
        >
          <!-- dollar.svg -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5 text-gray-300 fill-current"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.5-6H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z"
            />
          </svg>
          <span class="text-sm">Price</span>
          <!-- down_arrow.svg -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5 mt-1 transition-transform fill-current group-focus:rotate-180"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
            />
          </svg>
        </button>
      </div>

      <!-- Search input field and filter -->
      <div
        class="flex items-center px-3 border-l-0 border-l-none h-1/2 gap-x-2"
      >
        <!-- Search input field -->
        <div class="flex-auto h-full border-l-0">
          <input
            type="text"
            class="w-full h-full border-l-0 placeholder:text-sm focus:outline-none"
            placeholder="Search for locations, units and projects"
          />
        </div>

        <!-- Popup button -->
        <div class="flex items-center">
          <button
            class="inline-flex items-center justify-center border border-gray-300 h-11 w-11 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5 fill-current text-[#4CB087]"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M6.17 18a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2v-2h4.17zm6-7a3.001 3.001 0 0 1 5.66 0H22v2h-4.17a3.001 3.001 0 0 1-5.66 0H2v-2h10.17zm-6-7a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2V4h4.17zM9 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              />
            </svg>
          </button>
        </div>

        <!-- Search button -->
        <div class="flex items-center">
          <button
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-transparent bg-[#4CB087]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 text-white fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div
      class="hidden w-full h-16 border border-gray-200 divide-x group rounded-xl focus-within:rounded-bl-none lg:flex"
    >
      <!-- Dropdown (Buy/Rent) -->
      <button
        class="relative inline-flex items-center justify-center px-3 group rounded-tl-xl"
      >
        <div
          class="flex items-center justify-center gap-x-2 focus:rounded-bl-none"
        >
          <!-- home.svg -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5 text-gray-300 fill-current"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z"
            />
          </svg>
          <span class="text-sm">Buy</span>
          <!-- down_arrow.svg -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5 mt-1 transition-transform fill-current group-focus:rotate-180"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
            />
          </svg>
        </div>

        <!-- Dropdown menu -->
        <div
          class="absolute left-0 z-10 hidden w-full bg-white border divide-y divide-gray-100 top-full rounded-bl-xl rounded-br-xl group-focus:block"
        >
          <ul class="py-2 text-sm text-left">
            <li class="block px-4 py-2 hover:bg-gray-100">Buy</li>
            <li class="block px-4 py-2 hover:bg-gray-100">Rent</li>
          </ul>
        </div>
      </button>

      <!-- Search input field -->
      <div class="flex items-center flex-auto h-full px-3 gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-5 h-5 text-gray-300 fill-current"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for locations, units and projects..."
          class="w-full h-full focus:outline-none"
        />
      </div>
      <FiltersDropDownBar
        base-type="search"
        filter-type="type"
        placeholder="property_type"
        :data="['residential', 'commercial']"
        :allow-local-storage="true"
      >
        <template #bar-icon>
          <IconsPropertyTypeIcon class="w-5 h-5 shrink-0 text-[#D6D6D6]" />
        </template>
      </FiltersDropDownBar>
      <!-- <button
        class="group relative inline-flex min-w-[200px] max-w-lg items-center justify-center px-3"
      >
        <div class="flex items-center justify-center gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5 text-gray-300 fill-current"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path
              d="M21 18v2H3v-2h18zM6.596 3.904L8.01 5.318 4.828 8.5l3.182 3.182-1.414 1.414L2 8.5l4.596-4.596zM21 11v2h-9v-2h9zm0-7v2h-9V4h9z"
            />
          </svg>
          <span class="text-sm">Type</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5 mt-1 transition-transform fill-current group-focus:rotate-180"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
            />
          </svg>
        </div>


        <div
          class="absolute left-0 z-10 hidden w-full bg-white border divide-y divide-gray-100 rounded-tl-none rounded-tr-none top-full rounded-xl group-focus:block"
        >
          <ul class="py-2 text-sm text-left">
            <li class="block px-4 py-2 hover:bg-gray-100">Residential</li>
            <li class="block px-4 py-2 hover:bg-gray-100">Commercial</li>
          </ul>
        </div>
      </button> -->

      <div class="flex items-center justify-center pr-3 gap-x-2">
        <!-- <FiltersPriceRangeBar base-type="search" filter-type="price_range" /> -->
        <FiltersDropDownBar
          base-type="search"
          filter-type="type"
          placeholder="price"
          :allow-local-storage="true"
          content-classes="absolute  top-full mt-[5px] flex-col gap-4 right-0 z-10 px-5 py-3 w-full min-w-[400px] rounded-xl rounded-tl-none rounded-tr-none border bg-white"
        >
          <template #dropdown-content>
            <div class="flex justify-between gap-6 border-b border-gray-100">
              <button
                class="text-sm"
                :class="{
                  'p-3 text-sm border-b  rounded-sm text-text-green   border-text-green bg-bg-icons':
                    priceTab === 'price',
                }"
                @click="priceTabHandler('price')"
              >
                {{ $t('price') }}
              </button>
              <button
                :class="{
                  'p-3 text-sm border-b  rounded-sm text-text-green border-text-green bg-bg-icons border-spacing-2':
                    priceTab === 'down_payment',
                }"
                class="text-sm"
                @click="priceTabHandler('down_payment')"
              >
                {{ $t('down_payment') }}
              </button>
              <button
                :class="{
                  'p-3 text-sm border-b border-separate rounded-sm text-text-green border-text-green bg-bg-icons border-spacing-2':
                    priceTab === 'installment',
                }"
                class="text-sm capitalize"
                @click="priceTabHandler('installment')"
              >
                {{ $t('installment') }}
              </button>
            </div>

            <div class="grid grid-cols-2 gap-4 py-4">
              <div class="flex flex-col gap-2">
                <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}</p>
                <div
                  class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                >
                  <input
                    class="w-full px-1 text-sm text-black bg-transparent border-0 outline-none text-light"
                  />
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}</p>
                <div
                  class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                >
                  <input
                    class="w-full px-1 text-sm text-black bg-transparent border-0 outline-none text-light"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #bar-icon>
            <IconsPropertyTypeIcon class="w-5 h-5 shrink-0 text-[#D6D6D6]" />
          </template>
        </FiltersDropDownBar>
        <!-- Dropdown (Price) -->
        <!-- <div
          class="relative inline-flex items-center justify-center h-full px-3 cursor-pointer group"
        >
          <button class="flex items-center justify-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 text-gray-300 fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.5-6H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z"
              />
            </svg>
            <span class="text-sm">Price</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 mt-1 transition-transform fill-current group-focus:rotate-180"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
              />
            </svg>
          </button>

          <div
            class="absolute group-focus:block top-full hidden flex-col gap-4 right-0 z-10 px-5 py-3 w-full min-w-[400px] rounded-xl rounded-tl-none rounded-tr-none border bg-white"
          >
            <div class="flex justify-between gap-6 border-b border-gray-100">
              <button
                class="text-sm"
                :class="{
                  'p-3 text-sm border-b  rounded-sm text-text-green   border-text-green bg-bg-icons':
                    priceTab === 'price',
                }"
                @click="priceTabHandler('price')"
              >
                {{ $t('price') }}
              </button>
              <button
                :class="{
                  'p-3 text-sm border-b  rounded-sm text-text-green border-text-green bg-bg-icons border-spacing-2':
                    priceTab === 'down_payment',
                }"
                class="text-sm"
                @click="priceTabHandler('down_payment')"
              >
                {{ $t('down_payment') }}
              </button>
              <button
                :class="{
                  'p-3 text-sm border-b border-separate rounded-sm text-text-green border-text-green bg-bg-icons border-spacing-2':
                    priceTab === 'installment',
                }"
                class="text-sm capitalize"
                @click="priceTabHandler('installment')"
              >
                {{ $t('installment') }}
              </button>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <p class="text-xs text-[#5F5F5F]">{{ $t('from') }}</p>
                <div
                  class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                >
                  <input
                    class="w-full px-1 text-sm text-black bg-transparent border-0 outline-none text-light"
                  />
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-xs text-[#5F5F5F]">{{ $t('to') }}</p>
                <div
                  class="flex items-center gap-1 border border-[#DDDDDD] bg-white rounded-md py-2 px-2"
                >
                  <input
                    class="w-full px-1 text-sm text-black bg-transparent border-0 outline-none text-light"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- Filter button -->
        <button
          class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#4CB087]"
          @click="$store.commit('SET_MODAL', 'filtersModal')"
        >
          <!-- svg -->

          <IconsFilterIcon class="w-5 h-5 fill-current text-text-green" />
        </button>

        <!-- Search button -->
        <button
          class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-transparent bg-[#4CB087]"
        >
          <!-- svg -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5 text-white fill-current"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      priceTab: 'price',
    }
  },
  methods: {
    priceTabHandler(val: string) {
      this.priceTab = val
    },
  },
})
</script>
