<template>
  <NuxtLink
    :to="localePath(`/neighborhoods/${neighbourhood.slug}`)"
    class="relative block w-full overflow-hidden bg-slate-200 rounded-xl group min-h-[209px] cursor-pointer"
    :class="classes"
  >
    <div class="absolute z-10 w-full p-5 bg-hero-pattern pb-28">
      <h3
        class="text-white text-xl leading-8 font-bold tracking-[0.0015em] capitalize"
      >
        {{ neighbourhood.name }}
      </h3>
      <div
        v-if="neighbourhood.projects_count"
        class="flex items-center gap-3 mt-2 text-base font-normal leading-6 text-white capitalize"
      >
        {{ neighbourhood.projects_count }} {{ $t('projects') }}
        <IconsLeftArrowIcon class="text-red-600 rtl:rotate-180" />
      </div>
    </div>
    <img
      :src="neighbourhood.image"
      class="object-cover w-full h-full duration-300 group-hover:scale-110"
      :alt="neighbourhood.name"
      loading="lazy"
    />
  </NuxtLink>
</template>
<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    neighbourhood: {
      type: Object,
      required: true,
    } as PropOptions<Neighbourhood>,
    classes: {
      type: String,
      required: false,
    },
  },
})
</script>
