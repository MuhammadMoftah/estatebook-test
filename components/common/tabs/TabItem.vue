<template>
  <div
    v-show="selectedTitle === title"
    class="tabs__content"
    :class="classes"
    @click="$emit('clicked')"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  inject: ['selectedTitle'],
  props: ['title', 'classes'],
})
</script>
