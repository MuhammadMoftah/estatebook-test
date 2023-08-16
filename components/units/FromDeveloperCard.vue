<template>
  <div
    class="relative mt-4 overflow-hidden bg-white drop-shadow-shadowcard rounded-xl group"
    :class="[
      ['iPhone', 'iPod', 'iPad'].includes(currentDevice ?? '')
        ? 'transform-gpu'
        : 'transform-cpu',
    ]"
  >
    <div
      class="absolute top-0 left-0 z-10 flex items-center justify-between w-full p-5"
    >
      <p
        class="flex items-center justify-center w-24 h-8 text-sm font-medium text-black capitalize bg-white rounded-3xl"
      >
        {{ unit.flag }}
      </p>
      <!-- End Premium -->
      <div class="relative flex items-center gap-2">
        <a
          class="flex items-center justify-center transition-all duration-300 bg-white rounded-full cursor-pointer w-9 h-9"
          :class="{
            '!bg-text-green': isExist,
          }"
          @click="
            $store.dispatch('compare/setItem', { type: 'units', item: unit })
          "
          @mouseenter="hoverFlag = true"
          @mouseleave="hoverFlag = false"
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
          @click="favHandler(!isFav, 'unit', unit)"
        >
          <IconsFavIcon v-if="isFav" class="mt-[3px] fill-icon-red" />
          <IconsFavIcon v-else class="mt-[3px] fill-icon-header" />
        </button>
      </div>
      <!-- End icons -->
    </div>
    <!-- End icon top -->
    <NuxtLink :to="localePath(`/units/${unit.slug}`)" class="block w-full">
      <div class="relative w-full h-48 overflow-hidden">
        <img
          :src="unit.main_image"
          class="object-cover w-full h-full duration-300 group-hover:scale-110"
          alt="Estate Book"
          loading="lazy"
        />
        <div
          class="absolute bottom-0 left-0 flex items-center justify-between w-full p-5"
        >
          <div
            v-if="unit && unit.project"
            class="flex items-center justify-center w-12 h-12 bg-white rounded-full"
          >
            <img
              :src="unit.project.logo"
              class="max-w-full max-h-full rounded-full"
              alt="Estate Book"
              loading="lazy"
            />
          </div>
          <!-- End logo -->

          <div
            v-if="unit && unit.developer"
            class="flex items-center justify-center w-10 h-10 bg-white rounded-full"
          >
            <img
              :src="unit.developer.logo"
              class="max-w-full max-h-full rounded-full"
              alt="Estate Book"
              loading="lazy"
            />
          </div>
          <!-- End logo -->
        </div>
        <!-- End icon top -->
      </div>
      <!-- photo -->
      <div class="flex items-center w-full px-5 py-3 bg-bg-green">
        <p class="min-w-[50%] text-xs font-medium text-black capitalize">
          {{ unit.type }}
        </p>
        <p class="min-w-[50%] text-xs font-medium text-black capitalize">
          {{ $t('delivery') }}
          {{ unit.project?.start_delivery?.substring(0, 4) ?? 'N/A' }}
        </p>
      </div>

      <div class="w-full px-5">
        <div class="flex items-center w-full mt-4">
          <div class="min-w-[50%]">
            <span class="text-xs font-normal capitalize text-text-color">
              {{ $t('start_from') }}
            </span>
            <div class="text-lg font-bold text-black">
              {{ $numberFormat(unit.price, 'en-US') }}
              <span class="text-sm"> {{ $t('EGP') }}</span>
            </div>
          </div>
          <!-- End  -->
          <div v-if="unit.duration" class="min-w-[50%]">
            <span class="text-xs font-normal capitalize text-text-color">
              {{ $t('duration') }}
            </span>
            <div class="text-lg font-bold text-black">
              {{ unit.duration }}
              <span class="text-sm capitalize"> {{ $t('years') }}</span>
            </div>
          </div>
          <!-- End  -->
        </div>
        <!-- End price -->
        <div class="flex items-center w-full mt-4">
          <div class="min-w-[50%]">
            <span class="text-xs font-normal capitalize text-text-color">
              {{ $t('min_down_payment') }}
            </span>
            <div class="text-lg font-bold text-black">
              {{
                $numberFormat(
                  unit.min_down_payment,
                  $i18n.locale == 'ar' ? 'ar-EG' : 'en-US'
                )
              }}
              <span class="text-sm"> {{ $t('EGP') }}</span>
            </div>
          </div>
          <!-- End  -->
          <div class="min-w-[50%]">
            <span class="text-xs font-normal capitalize text-text-color">
              {{ $t('min_monthly_payment') }}
            </span>
            <div class="text-lg font-bold text-black">
              {{
                $numberFormat(
                  unit.min_month_payment,
                  $i18n.locale == 'ar' ? 'ar-EG' : 'en-US'
                )
              }}
              <span class="text-sm capitalize"> {{ $t('EGP') }}</span>
            </div>
          </div>
          <!-- End  -->
        </div>
        <!-- End price -->

        <div v-if="unit.address" class="flex items-center gap-2 mt-3">
          <div class="shrink-0">
            <LazyIconsLocationIcon class="w-4 h-4 fill-icon-header" />
          </div>

          <p class="text-xs font-normal truncate">{{ unit.address }}</p>
        </div>
        <!-- End map -->
      </div>
    </NuxtLink>
    <div class="w-full px-5">
      <div
        class="flex items-center justify-around w-full py-6 mt-6 border-t border-solid border-border-top"
      >
        <a :href="`tel:${unit.agent?.mobile}`" class="h-full">
          <LazyIconsCallIcon
            class="w-6 h-6 duration-300 fill-fill-icons hover:fill-text-green"
          />
        </a>

        <a
          :href="`https://wa.me/${unit.agent?.mobile}?text=Hello , I hope you are doing well , I am interested in ${unit?.title} with code ${unit?.reference}`"
          class="h-full"
          target="_blank"
        >
          <LazyIconsWhatsappIcon
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
    <!-- End All Icons -->
  </div>
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
  },
  data() {
    return {
      comparedItems: {
        isExist: false,
      },
      isFav: this.unit.favorite,
      hoverFlag: false,
      currentDevice: '',
    }
  },
  computed: {
    isExist() {
      return !!this.$store.state.compare.items.find(
        el => el?.id === this.unit?.id
      )
    },
  },
  mounted() {
    this.currentDevice = getDevice(navigator.userAgent)
  },
})
</script>
