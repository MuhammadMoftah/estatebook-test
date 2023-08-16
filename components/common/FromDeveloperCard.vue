<template>
  <div
    class="relative mt-4 overflow-hidden bg-white drop-shadow-shadowcard rounded-xl group"
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
      <div class="relative flex items-center">
        <NuxtLink
          to="/"
          class="flex items-center justify-center bg-white rounded-full w-9 h-9"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-icon-header"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.4793 4.34446C15.1157 4.34446 14.8182 4.59754 14.8182 4.90685C14.8182 5.21617 15.1157 5.46924 15.4793 5.46924H19.6777V18.5308H15.7273C15.3471 18.5308 15.0661 18.7838 15.0661 19.0931C15.0661 19.4025 15.3471 19.6555 15.7273 19.6555H20.3388C20.7025 19.6555 21 19.4025 21 19.0931V4.90685C21 4.59754 20.7025 4.34446 20.3388 4.34446H15.4793ZM11.3471 4.34446H3.66116C3.29752 4.34446 3 4.59754 3 4.90685V19.0931C3 19.4025 3.29752 19.6555 3.66116 19.6555H11.3471V23.4376C11.3471 23.7469 11.6446 24 12.0083 24C12.3719 24 12.6694 23.7469 12.6694 23.4376V19.0931V0.562389C12.6694 0.253075 12.3719 0 12.0083 0C11.6446 0 11.3471 0.253075 11.3471 0.562389V4.34446Z"
            />
          </svg>
        </NuxtLink>
        <NuxtLink
          to="/"
          class="flex items-center justify-center ml-2 bg-white rounded-full w-9 h-9"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            class="fill-icon-header"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 19.1648L8.975 18.2398C7.21 16.6248 5.75 15.2248 4.6 14.0498C3.45 12.8748 2.535 11.8248 1.85 10.8998C1.165 9.97484 0.685 9.13484 0.41 8.38484C0.14 7.63484 0 6.87984 0 6.11484C0 4.61484 0.505 3.35984 1.515 2.35484C2.525 1.34984 3.77 0.839844 5.25 0.839844C6.2 0.839844 7.08 1.06484 7.885 1.51484C8.695 1.96484 9.4 2.61484 10 3.46484C10.7 2.56484 11.44 1.90484 12.225 1.47984C13.01 1.05484 13.85 0.839844 14.75 0.839844C16.235 0.839844 17.48 1.34484 18.485 2.35484C19.495 3.36484 20 4.61484 20 6.11484C20 6.87984 19.865 7.63984 19.585 8.38984C19.31 9.13984 18.83 9.97984 18.145 10.8998C17.46 11.8248 16.545 12.8748 15.395 14.0498C14.245 15.2248 12.785 16.6198 11.02 18.2398L10 19.1648Z"
            />
          </svg>
        </NuxtLink>
      </div>
      <!-- End icons -->
    </div>
    <!-- End icon top -->
    <NuxtLink :to="localePath(`/units/${unit.slug}`)" class="block w-full">
      <div class="relative w-full h-48 overflow-hidden">
        <img
          src="~/assets/images/projects/img8.jpg"
          class="object-cover w-full h-full duration-300 group-hover:scale-110"
          alt="Estate Book"
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
            />
          </div>
          <!-- End logo -->
        </div>
        <!-- End icon top -->
      </div>
      <!-- photo -->
      <div class="flex items-center w-full px-5 py-3 bg-bg-green">
        <p class="min-w-[50%] text-xs font-medium text-black capitalize">
          Apartment
        </p>
        <p class="min-w-[50%] text-xs font-medium text-black capitalize">
          Delivery - 2023
        </p>
      </div>

      <div class="w-full px-5">
        <div class="flex items-center w-full mt-4">
          <div class="min-w-[50%]">
            <span class="text-xs font-normal capitalize text-text-color"
              >Starting From</span
            >
            <div class="text-xl font-bold text-black">
              {{ $numberFormat(unit.price) }}
              <span class="text-sm">EGP</span>
            </div>
          </div>
          <!-- End  -->
          <div v-if="unit.duration" class="min-w-[50%]">
            <span class="text-xs font-normal capitalize text-text-color"
              >Duration</span
            >
            <div class="text-xl font-bold text-black">
              {{ unit.duration }} <span class="text-sm capitalize">Years</span>
            </div>
          </div>
          <!-- End  -->
        </div>
        <!-- End price -->
        <div class="flex items-center w-full mt-4">
          <div class="min-w-[50%]">
            <span class="text-xs font-normal capitalize text-text-color"
              >Min. Down Payment</span
            >
            <div class="text-xl font-bold text-black">
              {{ $numberFormat(unit.min_down_payment) }}
              <span class="text-sm">EGP</span>
            </div>
          </div>
          <!-- End  -->
          <div class="min-w-[50%]">
            <span class="text-xs font-normal capitalize text-text-color"
              >Min. Monthly Payment</span
            >
            <div class="text-xl font-bold text-black">
              {{ $numberFormat(unit.min_month_payment) }}
              <span class="text-sm capitalize">EGP</span>
            </div>
          </div>
          <!-- End  -->
        </div>
        <!-- End price -->

        <div v-if="unit.address" class="flex items-center gap-2 mt-3">
          <div class="shrink-0">
            <IconsLocationIcon class="w-4 h-4 fill-icon-header" />
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
          <IconsCallIcon class="w-6 h-6" />
        </a>

        <a
          :href="`https://wa.me/${unit.agent?.whatsapp}`"
          class="h-full"
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
    <!-- End All Icons -->
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
  unit: {
    type: Object as PropType<Unit>,
    required: true,
  },
})
</script>
