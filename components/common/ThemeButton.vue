<template>
  <button
    type="submit"
    class="flex items-center justify-center w-full gap-3 text-base rounded-md h-11"
    :class="loading ? 'opacity-70 pointer-events-none' : ''"
  >
    <IconsSpinnerIcon v-if="loading" class="w-6 h-6" />

    {{ label }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {},
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
