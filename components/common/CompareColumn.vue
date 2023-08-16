<template>
  <div class="flex flex-col shrink-[1] flex-1 basis-0">
    <div class="relative w-full px-5 overflow-hidden rounded-t-lg">
      <NuxtLink
        :to="localePath(`/units/${item.slug}`)"
        class="flex w-full overflow-hidden h-44"
      >
        <CommonImageOnError
          :image="item.main_image"
          class="w-full h-full overflow-hidden rounded-t-lg"
          img-class="object-cover !w-full min-h-[200px] h-full duration-150 group-hover:scale-110"
        />
      </NuxtLink>

      <a
        class="absolute flex items-center justify-center w-6 h-6 bg-red-500 rounded-full cursor-pointer ltr:right-5 rtl:left-8 top-"
        @click="removeCompareItem(item)"
      >
        <IconsDeleteIcon class="w-4 h-4 text-white fill-white" />
      </a>

      <div
        class="ml-auto mr-auto flex items-center overflow-hidden justify-center w-12 h-12 bg-white rounded-full drop-shadow-shadcom mt-[-24px]"
      >
        <CommonImageOnError
          v-if="item.project"
          :image="item.project.logo"
          img-class="max-w-full max-h-full"
        />
      </div>
    </div>
    <!-- photo -->
    <h2 class="mt-6 text-xl font-semibold text-center text-black capitalize">
      {{ item.title }}
    </h2>
    <a
      class="flex items-center justify-center px-4 mt-4 ml-auto mr-auto text-xs font-medium text-black capitalize duration-150 border rounded-lg cursor-pointer w-52 h-9 border-text-green hover:bg-text-green hover:text-white group"
      :class="{
        '!pointer-events-none !bg-gray-50 !text-gray-300 !fill-gray-300 !border-gray-300': true,
      }"
    >
      <IconsDownloadIcon
        class="duration-150 fill-black group-hover:fill-white ltr:mr-2 rtl:ml-2"
        :class="{ '!fill-gray-300': true }"
      />

      {{ $t('download_brochoure') }}
    </a>
    <ul class="flex flex-col mt-10 list">
      <li>{{ index === 0 ? $t('start_price') : '' }}</li>
      <li>
        {{
          item.price
            ? parseFloat(item.price).toLocaleString() + $t('EGP')
            : null
        }}
      </li>
      <li>{{ index === 0 ? $t('min_down_payment') : '' }}</li>
      <li>
        {{
          item.min_down_payment
            ? parseFloat(item.min_down_payment).toLocaleString() + $t('EGP')
            : null
        }}
      </li>
      <li>{{ index === 0 ? $t('unit_type') : '' }}</li>
      <li>{{ item.unitType ? item.unitType.name : null }}</li>
      <li>{{ index === 0 ? $t('min_monthly_payment') : '' }}</li>
      <li>
        {{
          item.min_month_payment
            ? parseFloat(item.min_month_payment).toLocaleString() + $t('EGP')
            : null
        }}
        / {{ $t('per_month') }}
      </li>
      <li>{{ $t('area') }}</li>
      <li>
        {{
          item.area ? parseFloat(item.area).toLocaleString() + $t('EGP') : null
        }}
        {{ $t('m_2') }} <sup>2</sup>
      </li>
      <li>{{ index === 0 ? $t('description') : '' }}</li>
      <li class="p-3 !min-h-[160px]">
        <p class="text-sm">
          {{ item.short_description }}
        </p>
      </li>
      <li>{{ index === 0 ? $t('developer') : '' }}</li>
      <li>
        <nuxt-link
          v-if="item.developer"
          :to="localePath(`/developers/${item.developer.slug}`)"
          class="text-sm underline"
          >{{ item.developer ? item.developer.name : null }}</nuxt-link
        >
      </li>
      <li>{{ index === 0 ? $t('project') : '' }}</li>
      <li>
        <nuxt-link
          v-if="item.project"
          :to="localePath(`/projects/${item.project.slug}`)"
          class="text-sm underline"
          >{{ item.project ? item.project.name : null }}</nuxt-link
        >
      </li>
      <li>{{ index === 0 ? $t('location') : '' }}</li>
      <li class="p-3 text-sm !min-h-[130px]">{{ item.address }}</li>
      <li>{{ index === 0 ? $t('amenities') : '' }}</li>
      <li>
        <div
          v-if="item.amenities"
          class="flex items-center w-full mt-1 lg:flex-wrap"
        >
          <div
            v-for="amn in item.amenities"
            :key="`amen-${amn.name}`"
            class="min-w-[74px] max-w-[74px] mt-4 ltrtl:mr-5 ltr:ml-5"
          >
            <div
              class="flex items-center justify-center w-full h-[72px] drop-shadow-formrequest rounded-lg border border-border-list"
            >
              <CommonImageOnError :image="amn.logo" img-class="w-10 h-10" />
            </div>
            <h4 class="mt-4 text-sm font-normal text-center text-black">
              {{ amn.name }}
            </h4>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: {} as Unit,
    } as PropOptions<Unit>,
    index: {
      type: Number,
    },
  },
  methods: {
    removeCompareItem(item: Unit) {
      this.$store.dispatch('compare/removeItem', item)
    },
  },
})
</script>
