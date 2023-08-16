<template>
  <ul class="flex items-center my-5">
    <li v-for="(link, i) in breadcrumbLinks" :key="i">
      <NuxtLink
        :to="localePath(link.link)"
        class="relative flex items-center text-xs ltr:pr-4 rtl:pl-4 font-normal tracking-[0.0015em] capitalize duration-300"
        :class="
          link.active
            ? 'cursor-default text-text-green pointer-events-none'
            : `hover:text-text-green before:content-['']  text-text-gray  before:absolute ltr:before:right-1 rtl:before:left-1 before:top-[5px] before:w-2 before:h-2 before:bg-svg-pattern before:bg-cover rtl:before:rotate-180 `
        "
      >
        <span @click="handleDiscover(link)">
          {{ link.name }}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    breadcrumbLinks: {
      type: Array,
      default: () => [],
    } as PropOptions<any>,
  },
  methods: {
    handleDiscover(link: string) {
      if (link.discoverTab) {
        this.$store.commit('discoverTab', link.discoverTab)
      }
    },
  },
})
</script>
