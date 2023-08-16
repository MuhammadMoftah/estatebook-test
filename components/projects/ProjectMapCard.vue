<template>
  <section v-on-clickaway="close" class="flex z-[99] bg-white">
    <div class="group aspect-square">
      <div class="p-3 bg-white">
        <nuxt-link :to="localePath(`/projects/${project.slug}`)">
          <figure
            class="relative w-[200px] h-[180px] flex flex-col justify-between mb-5 overflow-hidden text-gray-100 md:mb-0 rounded-xl parent"
          >
            <div
              class="absolute top-0 left-0 !z-[4] w-full h-full opacity-50 bg-gradient-to-b from-[#000]/50 to-white/0"
            ></div>

            <img
              :src="
                project.images
                  ? project.images[0]
                  : 'https://a0.muscache.com/im/pictures/81723679/e5e479c0_original.jpg?im_w=1200'
              "
              alt
              class="absolute top-0 left-0 object-cover w-full h-full"
            />
          </figure>
        </nuxt-link>
      </div>

      <div class="flex flex-col gap-1 p-3 bg-slate-100">
        <div class="flex justify-between">
          <p
            v-if="project && project.name"
            class="mt-2 text-lg font-medium text-text-green"
          >
            {{ project.name }}
          </p>

          <button
            to="/"
            class="flex items-center justify-center bg-white rounded-full w-9 h-9"
            @click="favHandler(!isFav, 'project', project)"
          >
            <IconsFavIcon v-if="isFav" class="mt-[3px] fill-icon-red" />
            <IconsFavIcon v-else class="mt-[3px] fill-icon-header" />
          </button>
        </div>
        <div>
          <span class="text-xs font-normal capitalize text-text-color">
            {{ $t('start_from') }}</span
          >
          <div class="text-xl font-bold text-black">
            {{ $numberFormat(project.start_price) }}
            <span class="text-sm font-medium uppercase"> {{ $t('EGP') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    project: {
      type: Object,
      required: true,
    } as PropOptions<Project>,
  },
  data() {
    return {
      isFav: this.project.favorite,
    }
  },
  watch: {
    project: {
      handler(newValue) {
        this.isFav = newValue.favorite
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    close() {
      this.$emit('closeCard')
    },
  },
})
</script>

<style scoped>
div ::v-deep .gm-ui-hover-effect {
  display: none !important;
}
</style>
