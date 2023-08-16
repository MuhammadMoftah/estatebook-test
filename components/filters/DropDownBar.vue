<template>
  <div class="relative h-full group" @click="$emit('clicked', $event)">
    <div
      class="relative flex items-center justify-between h-full gap-1 p-4 px-2 duration-200 bg-white cursor-pointer md:px-4 group-focus:rounded-bl-none"
      :class="menuShow ? 'rounded-t-2xl' : 'rounded-2xl'"
      @click="openMenu()"
    >
      <!-- <span class="absolute top-0 flex w-3 h-3 right-2">
        <span
          class="absolute inline-flex w-full h-full border-2 border-white rounded-full opacity-75 animate-ping bg-text-green"
        ></span>
        <span
          class="relative inline-flex w-3 h-3 border-2 border-white rounded-full bg-text-green"
        ></span>
      </span> -->
      <div class="flex items-center w-full gap-1">
        <slot name="bar-icon"></slot>
        <p class="px-1 text-xs font-light capitalize truncate md:text-sm">
          {{ $t(`${value}`) }}
        </p>
      </div>
      <IconsArrowDownCheveronIcon
        class="w-3 h-3 text-black duration-300 rotate-0 pointer-events-none shrink-0"
        :class="{ '-rotate-180': menuShow }"
      />
    </div>
    <div v-if="menuShow" v-on-clickaway="menuAwayClose" :class="contentClasses">
      <slot name="dropdown-content"> </slot>

      <a
        v-for="d in data"
        :key="`data-${baseType}-${d}`"
        class="w-full px-4 py-3 text-xs font-light capitalize border-b border-gray-200 cursor-pointer md:text-sm hover:text-text-green last:border-b-0"
        @click="setValue(`${d}`)"
        >{{ $t(`${d}`) }}
      </a>

      <!-- <FiltersDropdownActionBtn v-if="!['buy', 'rent'].includes(placeholder)" /> -->
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
    placeholder: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
    },
    allowLocalStorage: {
      type: Boolean,
      default: false,
    },
    contentClasses: {
      type: String,
      default:
        'absolute z-10 flex flex-col w-full mt-[1px] bg-white  border border-gray-10 top-full rounded-b-md max-h-[150px] overflow-y-auto',
    },
    show: {
      type: Boolean,
    },
    customFilter: {
      type: Boolean,
    },
  },
  data() {
    return {
      menuShow: false,
      value: '',
    }
  },
  watch: {
    show(newVal) {
      if (!newVal) {
        this.menuShow = false
      }
    },
  },
  mounted() {
    this.value = this.placeholder
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
    setValue(val: string) {
      this.value = val
      if (!this.customFilter) {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: this.filterType,
          value: [this.value],
        })
      }

      this.menuAwayClose()
      this.$emit('getSelectedValue', val)
      // set search type to VUEX
      if (this.filterType === 'type') {
        this.$store.commit('filter/searchType', val)
      }
    },
    menuAwayClose() {
      this.menuShow = false
    },
    openMenu() {
      this.menuShow = !this.menuShow
      this.$emit('menuOpened', this.menuShow)
    },
  },
})
</script>
