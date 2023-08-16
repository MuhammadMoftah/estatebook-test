<template>
  <NuxtLink
    :event="preventRouting ? '' : 'click'"
    :to="localePath(`/units/${unit?.slug}`)"
    @click.native="handleLinkClick"
  >
    <div :dir="$t('dir')">
      <div
        class="relative mt-4 bg-white shadow cursor-pointer md:shadow-none drop-shadow-shadowcard rounded-xl group"
        :class="[
          ['iPhone', 'iPod', 'iPad'].includes(currentDevice ?? '')
            ? 'transform-gpu'
            : 'transform-cpu',
        ]"
      >
        <div
          class="absolute top-0 left-0 z-10 flex items-center justify-between w-full p-4"
        >
          <p
            class="flex items-center justify-center h-8 px-3 text-xs font-medium text-black capitalize bg-white rounded-3xl"
          >
            {{ saleType[unit.sale_type] }}
          </p>
          <div class="relative flex items-center gap-2">
            <a
              style="box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.17)"
              data-tooltip-target="tooltip-default"
              class="relative flex items-center justify-center transition-all duration-300 bg-white rounded-full cursor-pointer w-9 h-9"
              :class="{
                '!bg-text-green': isExist,
              }"
              @mouseenter="hoverFlag = true"
              @mouseleave="hoverFlag = false"
              @click.stop="
                $store.dispatch('compare/setItem', {
                  type: 'units',
                  item: unit,
                })
              "
            >
              <IconsCompareIcon
                :class="{
                  '!fill-white': isExist,
                }"
              />
              <div
                id="tooltip-default"
                role="tooltip"
                class="absolute z-20 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 -top-9"
                :class="{ '!visible !opacity-100': hoverFlag }"
              >
                {{ $t('compare') }}
                <div
                  class="absolute inset-x-0 w-2 h-2 m-auto rotate-45 bg-gray-900 -bottom-1"
                  data-popper-arrow
                ></div>
              </div>
            </a>

            <button
              class="flex items-center justify-center bg-white rounded-full w-9 h-9"
              style="box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.17)"
              @click.stop="favHandler(!isFav, 'unit', unit)"
            >
              <IconsFavIcon v-if="isFav" class="mt-[3px] fill-icon-red" />
              <IconsFavIcon v-else class="mt-[3px] fill-icon-header" />
            </button>
          </div>
        </div>

        <!-- :to="localePath(`/units/${unit.slug}`)" -->
        <div class="block w-full">
          <div class="relative w-full overflow-hidden h-60 rounded-t-xl">
            <CommonImageOnError
              :image="unit.main_image"
              parent-class="w-full h-full"
              img-class="object-cover w-full h-full"
              class="object-cover rounded-t-xl"
            >
              <template #placeholder-image>
                <div
                  class="relative w-full flex h-full overflow-hidden bg-[#eeeeee] rounded-t-xl"
                >
                  <div class="flex items-center justify-center w-full h-full">
                    <IconsHomeIcon />
                    <div
                      class="absolute bottom-0 left-0 flex items-center justify-between w-full p-5"
                    ></div>
                    <!-- End icon top -->
                  </div>
                  <!-- photo -->
                </div>
              </template>
            </CommonImageOnError>
            <!-- <img
              :src="unit.main_image"
              class="object-cover w-full h-full duration-300 group-hover:scale-110 rounded-t-xl"
              alt="Estate Book"
            /> -->
            <div
              class="absolute bottom-0 left-0 z-10 flex items-center justify-between w-full p-4"
            >
              <div
                class="flex items-center gap-1 bg-[#E8FFF5] py-1 justify-center px-3 text-xs font-medium text-black capitalize rounded-3xl"
              >
                <IconsUnitTypeIcon class="w-5 h-5 text-text-green" />

                <p class="text-text-green">{{ unit?.UnitType?.name }}</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="flex items-center w-full px-5 py-3 bg-bg-green">
              <p
                v-if="unit && unit.developer"
                :title="unit.developer.name"
                class="min-w-[50%] text-xs font-medium text-black capitalize line-clamp-1"
              >
                {{ unit.developer.name }}
              </p>

              <p
                v-show="$isClient"
                class="min-w-[50%] text-xs font-medium text-black capitalize"
              >
                {{ $startDateHandler(unit) }}
              </p>
            </div>
          </div>
          <div
            v-if="unit.payment_type === 'cash'"
            class="flex flex-col w-full px-5 gap-y-4"
          >
            <div class="flex justify-between w-full">
              <div class="min-w-[50%]">
                <span
                  v-if="unit.payment_type === 'cash'"
                  class="text-xs font-normal capitalize text-black/60"
                >
                  {{ $t('price') }}
                </span>
                <span
                  v-if="unit.payment_type === 'installments'"
                  class="text-xs font-normal capitalize text-black/60"
                >
                  {{ $t('start_from') }}
                </span>
                <div class="text-lg font-bold text-black">
                  {{ $numberFormat(unit.price, 'en-US') }}
                  <span class="text-sm"> {{ $t('EGP') }}</span>
                </div>

                <span
                  v-if="unit.project"
                  class="text-xs font-normal capitalize truncate text-black/60"
                >
                  {{ unit.project.name }}
                </span>
              </div>
              <div class="min-w-[50%]">
                <span class="text-xs font-normal capitalize text-black/60">
                  {{ $t('payment') }}
                </span>
                <p class="text-lg font-bold text-black capitalize">
                  {{ $t('cash') }}
                </p>

                <!-- <span class="text-xs font-normal capitalize text-black/60">
                  {{ $t('down_payment') }}
                </span>
                <div class="text-lg font-bold text-black">
                  {{
                    $numberFormat(
                      unit.min_down_payment,
                      $i18n.locale == 'en-US'
                    )
                  }}
                  <span class="text-sm"> {{ $t('EGP') }}</span>
                </div>
                <span
                  v-if="unit.min_month_payment"
                  class="text-xs font-normal capitalize text-black/60"
                >
                  {{
                    $numberFormat(
                      unit.min_month_payment,
                      $i18n.locale == 'en-US'
                    )
                  }}
                  {{ $t('monthly_over') }}
                  {{ unit.duration ? unit.duration : 3 }} {{ $t('years') }}
                </span> -->
              </div>
            </div>
          </div>
          <div
            v-if="unit.payment_type === 'installments'"
            class="flex flex-col w-full px-5 gap-y-4"
          >
            <div class="grid grid-cols-2 gap-[0.5px]">
              <div class="space-y-1">
                <div>
                  <span class="text-xs font-normal capitalize text-black/60">
                    {{ $t('start_price') }}
                  </span>
                  <div class="text-lg font-bold text-black">
                    {{ $numberFormat(unit.price, $i18n.locale == 'en-US') }}
                    <span class="text-sm"> {{ $t('EGP') }}</span>
                  </div>
                </div>
                <span
                  v-if="unit.project"
                  class="text-[10px] sm:text-xs font-normal capitalize line-clamp-1 text-black/60"
                >
                  {{ unit.project.name }}
                </span>
              </div>
              <div class="space-y-1">
                <div>
                  <span class="text-xs font-normal capitalize text-black/60">
                    {{ $t('down_payment') }}
                  </span>
                  <div class="text-lg font-bold text-black">
                    {{
                      $numberFormat(
                        unit.min_down_payment,
                        $i18n.locale == 'en-US'
                      )
                    }}
                    <span class="text-sm"> {{ $t('EGP') }}</span>
                  </div>
                </div>
                <span
                  v-if="unit?.min_month_payment && unit?.sale_type !== 'resale'"
                  class="text-[10px] sm:text-xs font-normal capitalize line-clamp-1 text-black/60"
                >
                  <span class="font-bold">{{
                    $numberFormat(unit?.min_month_payment)
                  }}</span>
                  {{ $t('monthly') }} / {{ unit.duration ?? 1 }}
                  {{ $t('years') }}
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="unit.payment_type === 'leasing'"
            class="flex flex-col w-full px-5 gap-y-4"
          >
            <div class="grid grid-cols-2 gap-2">
              <div>
                <span class="text-xs font-normal capitalize text-black/60">{{
                  $t('price')
                }}</span>
                <p class="text-lg font-bold text-black capitalize">
                  {{ $t('leasing_only') }}
                </p>
                <span
                  v-if="unit.project"
                  class="text-xs font-normal capitalize truncate text-black/60"
                >
                  {{ unit.project.name }}
                </span>
              </div>
              <div>
                <span class="text-xs font-normal capitalize text-black/60">{{
                  $t('rental')
                }}</span>
                <p class="text-lg font-bold text-black capitalize">
                  {{ $t('contract') }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full px-5 my-2 gap-y-3">
            <div v-if="unit.address" class="flex items-center gap-1">
              <div
                class="flex items-center w-full gap-1 overflow-hidden text-xs capitalize text-text-gray whitespace-nowrap"
              >
                <IconsLocationIcon
                  class="flex-shrink-0 w-3 h-3 text-black/60"
                />

                <span class="truncate"> {{ unit.address }}</span>
              </div>
            </div>
            <div
              v-if="unit.type === 'commercial'"
              class="flex items-center gap-x-2"
            >
              <div
                class="flex items-center justify-center w-8 h-8 border border-solid rounded-sm bg-bg-ofwight border-bg-ofwight"
              >
                <IconsAreaIcon class="w-4 h-4" />
              </div>

              <span
                class="text-sm font-medium uppercase truncate text-text-gray"
                >{{ unit.area }} {{ $t('m_2') }} <sup>2</sup></span
              >
            </div>
            <div
              v-else
              class="flex items-center justify-start w-full truncate gap-x-4"
            >
              <div class="flex items-center gap-x-4">
                <div
                  class="flex items-center justify-center w-8 h-8 border border-solid rounded-sm bg-bg-ofwight border-bg-ofwight"
                >
                  <IconsBedroomIcon class="w-5 h-5" />
                </div>

                <span class="text-sm font-medium uppercase text-text-gray">{{
                  unit.bedroom
                }}</span>
              </div>
              <div class="flex items-center gap-x-4">
                <div
                  class="flex items-center justify-center w-8 h-8 border border-solid rounded-sm bg-bg-ofwight border-bg-ofwight"
                >
                  <IconsBathroomIcon class="w-5 h-5" />
                </div>

                <span class="text-sm font-medium uppercase text-text-gray">{{
                  unit.bathroom
                }}</span>
              </div>
              <div class="flex items-center gap-x-4">
                <div
                  class="flex items-center justify-center w-8 h-8 border border-solid rounded-sm bg-bg-ofwight border-bg-ofwight"
                >
                  <IconsAreaIcon class="w-4 h-4" />
                </div>

                <span
                  class="text-sm font-medium uppercase truncate text-text-gray"
                  >{{ unit.area }} {{ $t('m_2') }} <sup>2</sup></span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full gap-5 px-5">
          <div
            class="flex items-center justify-around w-full py-4 mt-3 border-t border-solid border-border-top"
          >
            <a
              :href="`tel:${unit.agent?.mobile}`"
              class="grid duration-300 cursor-pointer w-9 place-content-center fill-fill-icons hover:fill-text-green"
            >
              <IconsCallIcon class="w-6 h-6 duration-300 fill-text-green" />
            </a>

            <a
              :href="`https://wa.me/${unit.agent?.whatsapp}?text=Hello , I hope you are doing well , I am interested in ${unit?.title} with code ${unit?.reference}`"
              class="grid text-center duration-300 cursor-pointer w-9 place-content-center fill-fill-icons"
              target="_blank"
            >
              <IconsWhatsappIcon
                class="w-6 h-6 duration-300 fill-text-green hover:fill-text-green"
              />
            </a>
            <button
              class="grid duration-300 cursor-pointer w-9 place-content-center fill-text-green"
              @click.stop=""
            >
              <CommonShareList
                :item="unit"
                url="units"
                title-type="title"
                classes="!static"
                overlay-class="!inset-0"
              >
                <template #share-button>
                  <IconsShareIcon class="w-6 h-6 mx-auto text-cyan-600" />
                </template>
              </CommonShareList>
            </button>
          </div>
        </div>
      </div>
      <!-- <div
      class="relative mt-4 overflow-hidden bg-white drop-shadow-shadowcard rounded-xl group"
    >
      <div
        class="absolute top-0 left-0 z-10 flex items-center justify-between w-full p-4"
      >
        <p
          class="flex items-center justify-center w-24 h-8 text-sm font-medium text-black capitalize bg-white rounded-3xl"
        >
          {{ unit.flag }}
        </p>
        <div class="relative flex items-center gap-2">
          <a
            class="flex items-center justify-center transition-all duration-300 bg-white rounded-full cursor-pointer w-9 h-9"
            :class="{
              '!bg-text-green': isExist,
            }"
            @click="
              $store.dispatch('compare/setItem', { type: 'units', item: unit })
            "
          >
            <IconsCompareIcon
              :class="{
                '!fill-white': isExist,
              }"
            />
          </a>
          <button
            class="flex items-center justify-center bg-white rounded-full w-9 h-9"
            @click="favHandler(!isFav, 'unit', unit)"
          >
            <IconsFavIcon v-if="isFav" class="mt-[3px] fill-icon-red" />
            <IconsFavIcon v-else class="mt-[3px] fill-icon-header" />
          </button>
        </div>
      </div>
      <NuxtLink :to="localePath(`/units/${unit.slug}`)" class="block w-full">
        <div class="relative w-full overflow-hidden h-52">
          <img
            :src="unit.main_image"
            class="object-cover w-full h-full duration-300 group-hover:scale-110"
            alt="Estate Book"
            loading="lazy"
          />
          <div
            class="absolute bottom-0 left-0 flex items-center justify-between w-full p-4"
          >
            <div
              v-if="unit && unit.project"
              class="flex items-center justify-center w-12 h-12 bg-white rounded-full"
            >
              <img
                :src="unit.project.logo"
                class="object-contain w-full h-full rounded-full"
                alt="Estate Book"
                loading="lazy"
              />
            </div>
  
            <div
              v-if="unit && unit.developer"
              class="flex items-center justify-center w-10 h-10 bg-white rounded-full"
            >
              <img
                :src="unit.developer.logo"
                class="object-contain w-full h-full rounded-full"
                alt="Estate Book"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div class="w-full px-5">
          <div class="flex items-center justify-between w-full mt-4">
            <div class="text-black font-bold text-[22px]">
              {{
                $numberFormat(
                  unit.price
                )
              }}
              <span class="text-sm font-medium uppercase"> {{ $t('EGP') }}</span>
            </div>
            <p
              class="flex items-center justify-center h-8 text-xs font-normal text-black capitalize border border-solid rounded-sm w-28 bg-bg-ofwight border-bg-ofwight"
            >
              {{ unit.type }}
            </p>
          </div>
  
          <div v-if="unit.address" class="flex items-center gap-1 mt-3">
            <div class="shrink-0">
              <IconsLocationIcon class="w-4 h-4 fill-icon-header" />
            </div>
  
            <p class="text-xs font-normal truncate">{{ unit.address }}</p>
          </div>
  
          <div class="flex items-center justify-start w-full mt-7 gap-x-3">
            <div class="flex items-center gap-x-1">
              <div
                class="flex items-center justify-center w-8 h-8 border border-solid rounded-sm bg-bg-ofwight border-bg-ofwight"
              >
                <IconsBedroomIcon class="w-3 h-3" />
              </div>
  
              <span
                class="text-sm font-medium uppercase ltr:ml-2 text-text-gray"
                >{{ unit.bedroom }}</span
              >
            </div>
            <div class="flex items-center gap-x-1">
              <div
                class="flex items-center justify-center w-8 h-8 border border-solid rounded-sm bg-bg-ofwight border-bg-ofwight"
              >
                <IconsBathroomIcon class="w-3 h-3" />
              </div>
  
              <span
                class="ml-3 text-sm font-medium uppercase ltr:ml-2 text-text-gray"
                >{{ unit.bathroom }}</span
              >
            </div>
            <div class="flex items-center gap-x-1">
              <div
                class="flex items-center justify-center w-8 h-8 border border-solid rounded-sm bg-bg-ofwight border-bg-ofwight"
              >
                <IconsAreaIcon class="w-3 h-3" />
              </div>
  
              <span class="text-sm font-medium uppercase ltr:ml-2 text-text-gray"
                >{{ unit.area }} {{ $t('m_2') }} <sup>2</sup></span
              >
            </div>
          </div>
        </div>
      </NuxtLink>
      <div class="w-full px-5">
        <div
          class="flex items-center justify-around w-full py-4 mt-5 border-t border-solid border-border-top"
        >
          <a
            :href="`tel:${unit.agent?.mobile}`"
            class="grid duration-300 cursor-pointer w-9 place-content-center fill-fill-icons hover:fill-text-green"
          >
            <IconsCallIcon
              class="w-6 h-6 duration-300 fill-fill-icons hover:fill-text-green"
            />
          </a>
  
          <a
            :href="`https://wa.me/${unit.agent?.mobile}`"
            class="grid duration-300 cursor-pointer w-9 place-content-center fill-fill-icons hover:fill-text-green"
            target="_blank"
          >
            <IconsWhatsappIcon
              class="w-6 h-6 duration-300 fill-fill-icons hover:fill-text-green"
            />
          </a>
          <button
            class="grid duration-300 cursor-pointer w-9 place-content-center fill-fill-icons hover:fill-text-green"
          >
            <CommonShareList
              :item="unit"
              url="units"
              title-type="title"
              classes="!static"
              overlay-class="!inset-0"
            >
              <template #share-button>
                <IconsShareIcon class="w-6 h-6 mx-auto text-cyan-600" />
              </template>
            </CommonShareList>
          </button>
  
        </div>
      </div>
    </div> -->
    </div>
    <!-- <LazyHydrate when-visible>
      <LazyUnitsUnitDrawer
        v-show="openDrawer && $store.state.modal == 'UnitDrawer' && unit"
        :unit="unit"
      ></LazyUnitsUnitDrawer>
    </LazyHydrate> -->
  </NuxtLink>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'
import { PropOptions } from 'vue/types/umd'
import { getDevice } from '~/helpers'

export default defineComponent({
  name: 'IndexPage',
  props: {
    unit: {
      type: Object,
      required: true,
    } as PropOptions<Unit>,
    localStorageFav: {
      type: Boolean,
      required: false,
    },
    preventRouting: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      comparedItems: {
        isExist: false,
      },
      isFav: this.unit.favorite,
      hoverFlag: false,
      saleType: {
        sale: 'from developer',
        rental: 'rent',
        resale: 'resale',
      },
      currentDevice: '',
      openDrawer: false,
    }
  },
  computed: {
    isExist() {
      return !!this.$store.state.compare.items.find(
        el => el?.id === this.unit?.id
      )
    },
  },
  methods: {
    handleLinkClick(event: any) {
      if (this.preventRouting) {
        // Prevent the default routing behavior
        this.$emit('openDrawer', true)
        event.preventDefault()

        this.$store.commit('SET_MODAL', 'UnitDrawer')
      } else {
        // Continue with the default routing behavior
        // This will navigate to the linked page
        this.$router.push(this.localePath(`/units/${this.unit?.slug}`))
      }
    },
  },

  watch: {
    unit: {
      handler(newValue) {
        this.isFav = newValue.favorite
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.currentDevice = getDevice(navigator.userAgent)
  },
})
</script>
