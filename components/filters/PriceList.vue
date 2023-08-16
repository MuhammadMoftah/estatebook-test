<template>
  <ul
    class="absolute left-0 z-20 w-full overflow-y-auto bg-white border border-green-600 divide-y rounded-md max-h-44 top-10"
  >
    <li
      v-for="(price, i) in prices"
      :key="price"
      class="p-2 text-xs cursor-pointer first:rounded-md last:rounded-md text-slate-700 hover:bg-slate-100"
      @click.stop="$emit('priceSelected', price)"
    >
      {{ price.toLocaleString() }}

      <span v-if="i == 0 && place == 'from'"> or less</span>
      <span v-if="i == prices.length - 1 && place == 'to'"> or more </span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    prices: {
      type: Array,
      default: () => {
        return [1000, 2000, 3000, 4000, 5000]
      },
    },
    place: {
      type: String,
    },
  },
})
</script>

<style scoped>
::-webkit-scrollbar {
  @apply w-[4px] h-[2px];
}
</style>
