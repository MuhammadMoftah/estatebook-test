<template>
  <NuxtLink
    :event="preventRouting ? '' : 'click'"
    :to="localePath(`/neighborhoods/${neighbourhood?.slug}`)"
    @click.native="handleLinkClick"
  >
    <div
      class="relative block w-full h-full overflow-hidden cursor-pointer bg-slate-200 rounded-xl group"
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
    </div>
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
    preventRouting: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    handleLinkClick(event: any) {
      if (this.preventRouting) {
        // Prevent the default routing behavior
        this.$emit('openDrawer', true)
        event.preventDefault()

        this.$store.commit('SET_MODAL', 'NeighborhoodDrawer')
      } else {
        // Continue with the default routing behavior
        // This will navigate to the linked page
        this.$router.push(
          this.localePath(`/neighborhoods/${this.neighbourhood?.slug}`)
        )
      }
    },
  },
})
</script>
