<template>
  <div class="relative min-w-[16rem]">
    <div
      class="flex items-center justify-between px-5 py-4 cursor-pointer"
      @click="menuShow = !menuShow"
    >
      <div class="flex items-center w-full gap-1">
        <slot name="bar-icon"></slot>
        <p class="px-1 text-xs font-light capitalize truncate md:text-sm">
          {{ value }}
        </p>
      </div>
      <IconsArrowDownCheveronIcon
        class="w-3 h-3 text-black duration-300 rotate-0 shrink-0"
        :class="{ '-rotate-180': menuShow }"
      />
    </div>
    <div
      v-if="menuShow"
      v-on-clickaway="menuAwayClose"
      class="absolute z-10 flex flex-col w-full mt-[1px] bg-white shadow-md top-full rounded-b-md max-h-[150px] overflow-y-auto"
    >
      <a
        class="w-full px-4 py-3 text-sm font-light capitalize border-b border-gray-200 cursor-pointer hover:text-text-green last:border-b-0"
        @click="setValue({ name: 'all', id: '' })"
        >{{ $t('all') }}</a
      >
      <a
        v-for="d in data"
        :key="`data-${baseType}-${d.id}`"
        class="w-full px-4 py-3 text-xs font-light capitalize border-b border-gray-200 cursor-pointer md:text-sm hover:text-text-green last:border-b-0"
        @click="setValue(d)"
        >{{ d.name }}</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    baseType: {
      type: String,
      default: 'units',
    },
    filterType: {
      type: String,
    },
    placeholder: {
      type: String,
      required: false,
    },
    data: {
      type: Array,
    } as PropOptions<UnitType[]>,
    allowLocalStorage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuShow: false,
      value: this.$t('all'),
    }
  },
  mounted() {
    if (this.allowLocalStorage) {
      const filters = this.$auth.$storage.getLocalStorage('filters') as any
      if (filters && filters[`${this.baseType}`]) {
        for (let i = 0; i < filters[`${this.baseType}`].filters?.length; i++) {
          if (filters[`${this.baseType}`].filters[i].key === this.filterType) {
            this.value = filters[`${this.baseType}`].filters[i]?.value
          }
        }
      }
    }
  },
  methods: {
    setValue(val: UnitType) {
      this.value = val.name
      // const payload = {
      //   path: this.baseType,
      //   filter: {
      //     key: this.filterType,
      //     value: val.id,
      //   },
      // }
      // const payload = {
      //   [this.filterType]: val.name,
      // }
      // this.$store.commit('filter/ADD_FILTER', payload)

      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: this.filterType,
        value: [val.name],
      })
      this.menuAwayClose()
    },
    menuAwayClose() {
      this.menuShow = false
    },
  },
})
</script>
