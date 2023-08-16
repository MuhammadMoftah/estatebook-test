<template>
  <div>
    <div v-if="loading && dataLength === 0">
      <slot name="loader"></slot>
    </div>
    <div v-else-if="dataLength">
      <slot></slot>
    </div>
    <div v-else>
      <CommonNoResult :new-search-url="newSearchUrl" />
    </div>

    <!-- <div v-if="loading">
      <slot name="loader"></slot>
    </div>
    <div v-else-if="!loading && dataLength !== 0">
      <slot />
    </div>
    <div v-else-if="dataLength === 0 && !loading">
      <CommonNoResult :new-search-url="newSearchUrl" />
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    dataLength: {
      type: Number,
    },
    newSearchUrl: {
      type: String,
      default: '/',
    } as PropOptions<string>,
  },
  data() {
    return {}
  },
  fetch() {
    if (!this.dataLength) {
      this.$store.commit('CHANGE_LOADING', true)
    }
  },
  computed: {
    loading(): boolean {
      return this.$store.state.loading
    },
  },
})
</script>
