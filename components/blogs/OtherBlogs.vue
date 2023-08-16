<template>
  <div class="flex flex-col w-full gap-4 mt-6">
    <h2
      class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
    >
      {{ $t('articles_you_will_love') }}
    </h2>
    <div
      class="grid w-full grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4"
    >
      <BlogsBlogCard v-for="item in items" :key="item.slug" :item="item" />
    </div>
  </div>
  <!-- container -->
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    items: {
      type: Array,
      default: () => [],
    } as PropOptions<Blog[]>,
  },
})
</script>
