<template>
  <div
    class="w-full h-full flex items-center justify-center min-h-screen"
    :class="parentClasses"
  >
    <!-- <IconsLoadingIcon class="w-16 h-16 text-text-green" :class="iconClasses" /> -->
    <img src="~/assets/images/logo.svg" class="w-56 animate-pulse" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  iconClasses: {
    type: [Object, Array, String],
  },
  parentClasses: {
    type: [Object, Array, String],
  },
})
</script>
