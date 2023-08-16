<template>
  <div class="relative flex">
    <div
      class="absolute inset-y-0 flex items-center pointer-events-none left-4"
    >
      <IconsOrderIcon />
    </div>

    <select
      class="block lg:w-[200px] capitalize w-full text-xs font-normal bg-white border rounded-lg outline-none appearance-none ltr:pl-9 rtl:pr-9 h-11 text-text-gray border-border-list focus:border-text-green"
      @change="sortSelected($event)"
    >
      <option
        v-for="(el, i) in sortTypes"
        :key="'sort_' + i"
        :value="JSON.stringify(el)"
        class="capitalize"
      >
        {{ el.name }}
      </option>
    </select>

    <div
      class="absolute inset-y-0 flex items-center pointer-events-none right-4"
    >
      <IconsSortIcon />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

interface SortTypes {
  id: number
  name: string
  value: string
}
export default Vue.extend({
  props: {
    sortTypes: {
      type: Array,
      required: true,
    } as PropOptions<SortTypes[]>,
  },
  methods: {
    sortSelected(e: any) {
      const object = JSON.parse(e.target.value)
      this.$emit('sortSelected', object)
    },
  },
})
</script>
