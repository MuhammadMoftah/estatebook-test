<template>
  <!-- bg-[#D3D3D380] -->
  <aside class="rounded-lg shadow bg-[#dad9d9eb] rtl:left-2 ltr:right-2">
    <section
      class="relative hidden gap-2 lg:grid justify-items-center"
      @mouseenter="openZoomLevel()"
    >
      <!-- <transition name="slide-in" appear></transition> -->

      <button
        type="button"
        class="p-[10px] bg-white rounded-xl hover:bg-slate-100"
        @click="zoomIn(value)"
      >
        <IconsPlusIcon2 class="w-4 h-4" />
      </button>

      <div class="relative">
        <VueSlider
          direction="btt"
          :height="150"
          :width="5"
          :min="min"
          :max="max"
          :marks="true"
          :hide-label="true"
          tooltip="none"
          :duration="0.3"
          :dot-size="[12, 12]"
          :value="value"
          @change="setZoom($event)"
        />

        <button
          v-for="el in zoomLevels"
          :key="el.id"
          type="button"
          class="absolute rtl:left-9 ltr:right-9 font-medium border border-slate-200 bg-white px-1 py-[3px] rounded-md hover:bg-slate-200 text-[10px] capitalize"
          :class="setActiveClass(el) ? `text-white` : 'text-slate-700'"
          :style="{
            bottom: buttonPosition(el.zoomLevel) + 'px',
            backgroundColor: setActiveClass(el) ? el.color : '',
            borderColor: setActiveClass(el) ? el.color : '',
          }"
          @click="setZoom(el.zoomLevel, el.name)"
        >
          {{ el.name }}
        </button>
      </div>

      <button
        type="button"
        class="p-[10px] bg-white rounded-xl hover:bg-slate-100"
        @click="zoomOut(value)"
      >
        <IconsMinusIcon class="w-4 h-4" />
      </button>
    </section>
  </aside>
</template>

<script>
import zoomLevels from '~/data/zoomLevels'
export default {
  props: {
    value: {
      default: 7,
    },
    max: {
      default: 18,
      type: Number,
    },
    min: {
      default: 0,
      type: Number,
    },
    zoomLevels: {
      default: () => {
        return zoomLevels
      },
    },
  },
  data() {
    return {
      showZoomLevels: false,
      levelsTimer: false,
      activeLevel: null,
    }
  },
  watch: {
    value(n) {
      if (n > 18) {
        this.$emit('input', 18)
      }
    },
  },
  mounted() {},

  methods: {
    setActiveClass(el) {
      if (this.value === el.zoomLevel) {
        return true
      }
      return false
    },
    closeZoomLevel() {
      this.levelsTimer = setTimeout(() => {
        this.showZoomLevels = false
      }, 2000)
    },
    openZoomLevel() {
      clearTimeout(this.levelsTimer)
      this.showZoomLevels = true
    },
    zoomOut(value) {
      if (value >= this.min) {
        this.$emit('input', value - 1)
      }
    },
    zoomIn(value) {
      if (value <= this.max) {
        this.$emit('input', value + 1)
      }
    },
    setZoom(value, type = 'units') {
      this.$store.commit('discoverTab', type)
      this.$emit('input', value)
    },
    buttonPosition(value) {
      const minMaxAvrage = this.max - this.min
      const steps = 150 / minMaxAvrage
      const final = steps * value - 12

      return final
    },
  },
}
</script>

<style scoped>
:deep(.vue-slider-dot) {
  @apply hidden;
}
:deep(.vue-slider-process) {
  @apply bg-[#74D8AF];
}
:deep(.vue-slider-dot-handle-focus) {
  @apply shadow-[#74D8AF] shadow;
}

:deep(.vue-slider-dot-tooltip-inner) {
  @apply border-[#74D8AF] bg-[#74D8AF];
}
:deep(.vue-slider-process) {
  @apply bg-transparent;
}
:deep(.vue-slider-rail) {
  @apply bg-transparent;
}
:deep(.vue-slider-mark) {
  @apply !h-[3px] bg-[#B4B4B4];
}
:deep(.vue-slider-mark-step) {
  @apply !h-[3px] bg-[#B4B4B4];
}
>>> .vue-slider-mark-step {
  @apply rounded-none bg-[#B4B4B4];
}
:deep(.vue-slider-mark-active) {
  @apply !bg-[#7d7d7d];
}
:deep(.vue-slider-mark-step-active) {
  @apply !bg-[#7d7d7d];
}
>>> .vue-slider.vue-slider-btt {
  @apply !w-7 !px-0;
}

:deep(.vue-slider) {
  @apply cursor-pointer;
}

.active {
  @apply bg-[#74D8AF] border-[#74D8AF] text-white;
}
</style>
