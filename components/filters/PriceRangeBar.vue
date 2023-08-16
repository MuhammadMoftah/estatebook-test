<template>
  <div class="relative min-w-[15rem]">
    <div class="flex items-center gap-4 px-4 py-3">
      <div class="flex items-center gap-2">
        <IconsCashIcon class="w-5 h-5 text-[#d6d6d6] shrink-0" />
        <p class="text-base font-light text-black capitalize">
          {{ $t('price') }}
        </p>
      </div>
      <div class="flex flex-col">
        <p class="text-xs text-gray-500">{{ $t('from') }}</p>
        <input
          v-model="priceRange[0]"
          class="w-[80px] text-xs rounded-md border border-gray-200 outline-none px-2 py-1"
        />
      </div>
      <client-only>
        <VueSlider
          v-model="priceRange"
          class="!w-[10rem]"
          :min="300000"
          :max="9999999"
          :tooltip-formatter="sliderFormatter"
          :dot-style="{
            borderWidth: '5px',
            borderColor: 'white',
            backgroundColor: '#4CB087',
          }"
          :process-style="{
            backgroundColor: '#4CB087',
          }"
          :tooltip-style="{
            backgroundColor: '#fff',
            color: '#000',
            padding: '6px 15px',
            borderColor: '#fff',
            boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
          }"
          @change="setPriceRange"
        />
      </client-only>
      <div class="flex flex-col">
        <p class="text-xs text-gray-500">{{ $t('to') }}</p>
        <input
          v-model="priceRange[1]"
          class="w-[80px] text-xs rounded-md border border-gray-200 outline-none px-2 py-1"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    baseType: {
      type: String,
      default: 'units',
    },
    filterType: {
      type: String,
    },
    allowLocalStorage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      priceRange: [300000, 9999999],
      sliderFormatter: null,
    }
  },
  mounted() {
    this.sliderFormatter = function (v: string) {
      return (
        `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` +
        ' ' +
        this.$t('EGP')
      )
    }
    if (this.allowLocalStorage) {
      const filters = this.$auth.$storage.getLocalStorage('filters') as any
      if (filters && filters[`${this.baseType}`]) {
        for (let i = 0; i < filters[`${this.baseType}`].filters?.length; i++) {
          if (filters[`${this.baseType}`].filters[i].key === this.filterType) {
            this.priceRange =
              filters[`${this.baseType}`].filters[i]?.value?.split(',')
          }
        }
      }
    }
  },
  methods: {
    setPriceRange() {
      const payload = {
        path: this.baseType,
        filter: {
          key: this.filterType,
          value: this.priceRange.join(','),
        },
      }
      this.$store.commit('filter/ADD_FILTER', payload)
    },
  },
})
</script>
