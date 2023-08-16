<template>
  <div class="flex flex-wrap items-center justify-between gap-y-4">
    <div class="flex flex-wrap items-center gap-x-10 gap-y-4">
      <div class="flex items-center">
        <CommonImageOnError
          v-if="item && item.logo"
          :image="item.logo"
          parent-class="flex items-center justify-center w-20 h-20 overflow-hidden bg-white rounded-full ltr:mr-6 rtl:ml-6 drop-shadow-iconlogo"
        />
        <div class="">
          <span
            class="overflow-hidden text-[14px] font-normal capitalize text-text-gray whitespace-nowrap"
          >
            {{ $t('start_from') }}</span
          >
          <div
            class="flex items-end gap-2 mt-1 text-[30px] font-bold text-black lg:text-4xl"
          >
            {{ $numberFormat(startPrice) }}
            <span
              class="font-normal lg:text-2xl text-[20px] uppercase whitespace-nowrap"
            >
              {{ $t('EGP') }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="item && item.min_down_payment" class="">
        <span
          class="overflow-hidden text-[14px] font-normal capitalize text-text-gray whitespace-nowrap"
        >
          {{ $t('min_down_payment') }}</span
        >
        <div
          class="flex items-end gap-2 mt-1 text-[22px] font-bold text-black lg:text-2xl"
        >
          {{ $numberFormat(item.min_down_payment, 'en-US') }}

          <span class="text-[16px] font-normal uppercase">
            {{ $t('EGP') }}
          </span>
        </div>
      </div>
      <div v-if="item && item.min_month_payment" class="">
        <span
          class="overflow-hidden text-[14px] font-normal capitalize text-text-gray whitespace-nowrap"
        >
          {{ $t('min_monthly_payment') }}</span
        >
        <div
          class="flex items-end gap-2 mt-1 text-[22px] font-bold text-black lg:text-2xl"
        >
          {{ $numberFormat(item.min_month_payment) }}

          <span class="text-[16px] font-normal uppercase">
            {{ $t('EGP') }}</span
          >
        </div>
      </div>
    </div>

    <CommonActionsBox
      v-if="type === 'project'"
      :item="item"
      type="project"
      url="projects"
    />
    <CommonCallBox
      v-if="type === 'unit'"
      class="mt-0 4k:mt-6"
      :item="item.agent"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      required: true,
    },
  },

  computed: {
    startPrice() {
      if (this.type === 'unit') {
        return this.item.price
      }
      if (this.type === 'project') {
        return this.item.start_price
      }
      return 'N/A'
    },
  },
})
</script>
