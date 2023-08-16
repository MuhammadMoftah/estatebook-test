<template>
  <section
    class="relative p-5 mt-4 bg-white cursor-pointer drop-shadow-shadowcard rounded-xl group"
  >
    <img
      v-if="(project.images || []).length"
      :src="project.images[0]"
      alt=""
      class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
    />
    <div class="flex flex-col w-full gap-1 mt-3">
      <div class="flex items-center justify-between text-xs gap-x-4">
        <span class="text-green-600 capitalize"> {{ $t('phases') }}</span>
        <nav class="flex items-center gap-4">
          <a
            style="box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.17)"
            class="flex items-center justify-center transition-all duration-300 bg-white rounded-full cursor-pointer w-9 h-9"
            :class="{
              '!bg-text-green': isExist,
            }"
            @mouseenter="hoverFlag = true"
            @mouseleave="hoverFlag = false"
            @click.stop="
              $store.dispatch('compare/setItem', {
                type: 'projects',
                item: project,
              })
            "
          >
            <IconsCompareIcon
              :class="{
                '!fill-white': isExist,
              }"
            />
            <div
              id="tooltip-default"
              role="tooltip"
              class="absolute z-20 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 -top-9"
              :class="{ '!visible !opacity-100': hoverFlag }"
            >
              {{ $t('compare') }}
              <div
                class="absolute inset-x-0 w-2 h-2 m-auto rotate-45 bg-gray-900 -bottom-1"
                data-popper-arrow
              ></div>
            </div>
          </a>

          <button
            to="/"
            class="flex items-center justify-center bg-white rounded-full w-9 h-9"
            style="box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.17)"
            @click.stop="favHandler(!isFav, 'project', project)"
          >
            <IconsFavIcon v-if="isFav" class="mt-[3px] fill-icon-red" />
            <IconsFavIcon v-else class="mt-[3px] fill-icon-header" />
          </button>
        </nav>
      </div>
      <h3 class="text-lg font-semibold leading-6 text-gray-900 capitalize">
        {{ project.name }}
      </h3>
      <div class="flex justify-between gap-4">
        <p class="text-xs leading-6 text-gray-600 truncate">
          {{ project.description }}
        </p>
        <a
          :href="localePath(`/projects/${project.slug}`)"
          target="_blank"
          class="flex items-center justify-center h-10 gap-2 text-xs font-semibold capitalize border border-green-600 rounded-lg group1 shrink-0 hover:text-white hover:bg-text-green w-36"
        >
          {{ $t('learn_more') }}
          <IconsArrowIcon2
            class="w-4 h-4 text-black group1-hover:text-text-green hover:text-white"
          />
        </a>
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
      comparedItems: {
        isExist: false,
      },
      isFav: this.project.favorite,
      hoverFlag: false,
    }
  },
  computed: {
    isExist() {
      return !!this.$store.state.compare.items.find(
        el => el?.id === this.project?.id
      )
    },
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
})
</script>
