<template>
  <nuxt-link
    :event="preventRouting ? '' : 'click'"
    :to="localePath(`/projects/${project?.slug}`)"
    @click.native="handleLinkClick"
  >
    <div
      :dir="$t('dir')"
      v-if="project"
      class="relative mt-4 bg-white cursor-pointer drop-shadow-shadowcard rounded-xl group"
      :class="[
        ['iPhone', 'iPod', 'iPad'].includes(currentDevice ?? '')
          ? 'transform-gpu'
          : 'transform-cpu',
      ]"
    >
      <div class="absolute top-0 left-0 z-10 grid w-full grid-cols-2 gap-4 p-5">
        <div>
          <div
            v-if="project.developer && project.developer.logo"
            class="flex items-center justify-center w-12 h-12 bg-white rounded-full"
          >
            <img
              :src="project.developer.logo"
              class="object-contain w-full h-full rounded-full"
              alt="Estate Book"
              loading="lazy"
            />
          </div>
        </div>

        <!-- End logo -->
        <div class="relative flex items-center justify-end gap-2">
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
        </div>
        <!-- End icons -->
      </div>
      <!-- End icon top -->
      <div class="relative block w-full">
        <div class="relative w-full overflow-hidden h-60 rounded-t-xl">
          <img
            v-if="(project.images || []).length"
            :src="project.images[0]"
            class="object-cover w-full h-full"
            alt="Estate Book"
            loading="lazy"
          />

          <div
            class="absolute flex items-center w-10/12 gap-1 p-3 overflow-hidden text-sm text-white capitalize h-9 rounded-xl bg-bg-black bottom-5 ltr:left-5 rtl:right-5 whitespace-nowrap"
          >
            <IconsLocationIcon
              class="flex-shrink-0 min-w-[10px] w-4 h-4 text-white"
            />

            <span class="truncate"> {{ project.address }}</span>
          </div>
        </div>
        <div
          class="flex items-center justify-between w-full px-5 py-6 max-h-[98px] gap-3"
        >
          <div class="flex items-center gap-2">
            <!-- drop-shadow-iconlogo -->
            <div
              class="flex items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-full shrink-0 drop-shadow-shadowcard"
            >
              <img
                :src="project.logo"
                class="object-contain w-full h-full rounded-full"
                alt="Estate Book"
                loading="lazy"
              />
            </div>
            <!-- End logo -->
            <h4 class="text-base font-medium text-black capitalize">
              {{ project.name }}
            </h4>
          </div>
          <div class="shrink-0">
            <span class="text-xs font-normal capitalize text-text-color">
              {{ $t('start_from') }}</span
            >
            <div class="text-xl font-bold text-black">
              {{ $numberFormat(project.start_price) }}
              <span class="text-sm font-medium uppercase">
                {{ $t('EGP') }}</span
              >
            </div>
          </div>
        </div>
        <!-- End Content -->
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import Vue, { PropOptions, defineComponent } from 'vue'
import { getDevice } from '../../helpers'

export default defineComponent({
  props: {
    project: {
      type: Object,
      required: true,
    } as PropOptions<Project>,
    preventRouting: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      comparedItems: {
        isExist: false,
      },
      isFav: this.project.favorite,
      hoverFlag: false,
      currentDevice: '',
    }
  },
  computed: {
    isExist() {
      return !!this.$store.state.compare.items.find(
        el => el?.id === this.project?.id
      )
    },
  },
  methods: {
    handleLinkClick(event: any) {
      if (this.preventRouting) {
        // Prevent the default routing behavior
        this.$emit('openDrawer', true)
        event.preventDefault()

        this.$store.commit('SET_MODAL', 'ProjectDrawer')
      } else {
        // Continue with the default routing behavior
        // This will navigate to the linked page
        this.$router.push(this.localePath(`/projects/${this.project?.slug}`))
      }
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
  mounted() {
    this.currentDevice = getDevice(navigator.userAgent)
  },
})
</script>
