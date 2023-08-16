<template>
  <div class="flex items-center justify-between mb-2 lg:mb-8">
    <h2
      class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
    >
      {{ title }}
    </h2>
    <NuxtLink
      :to="localePath(`/${url}`)"
      class="flex capitalize items-center group1 text-text-gray tracking-[0.0015em] leading-none text-xs lg:text-base font-normal group hover:text-text-green duration-300"
    >
      <span @click="handleURL()">
        {{ $t('show_all') }}
      </span>
      <IconsArrowIcon class="text-text-gray group1-hover:text-text-green" />
    </NuxtLink>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    discoverTab: {
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleURL() {
      if (this.discoverTab) {
        this.$store.commit('discoverTab', this.discoverTab)
      }
    },
  },
})
</script>
