<template>
  <div class="flex items-center justify-between mb-8">
    <p class="text-2xl font-semibold">{{ title }}</p>

    <a
      :href="link"
      class="flex items-center text-base font-medium leading-5 capitalize text-gray2"
    >
      {{ $t('show_all') }}
      <IconsArrowIcon class="w-4 h-4 mx-1 rotate-0 rtl:rotate-180" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    link: {
      type: String,
      default: '/',
    },
  },
}
</script>

<style></style>
