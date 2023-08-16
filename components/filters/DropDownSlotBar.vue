<template>
  <div class="relative min-w-[16rem]">
    <div
      class="flex items-center justify-between px-5 py-4 cursor-pointer"
      @click="menuShow = !menuShow"
    >
      <div class="flex items-center w-full gap-1">
        <slot name="bar-icon"></slot>
        <p class="px-1 text-xs font-light capitalize truncate md:text-sm">
          {{ $t(`${placeholder}`) }}
          <slot name="additional-data"></slot>
        </p>
      </div>
      <IconsArrowDownCheveronIcon
        class="w-3 h-3 ml-auto text-black duration-300 rotate-0 shrink-0"
        :class="{ '-rotate-180': menuShow }"
      />
    </div>
    <div
      v-if="menuShow"
      v-on-clickaway="menuAwayClose"
      class="absolute z-10 flex flex-col w-full mt-[1px] bg-white shadow-md top-full rounded-b-md max-h-[150px] overflow-y-auto"
      :class="menuClass"
    >
      <slot name="drop-content"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    baseType: {
      type: String,
      default: 'units',
    },
    filterType: {
      type: String,
    },
    placeholder: {
      type: String,
      required: true,
    },
    allowLocalStorage: {
      type: Boolean,
      default: false,
    },
    menuClass: {
      type: [String, Array, Object],
      required: false,
    },
  },
  data() {
    return {
      menuShow: false,
    }
  },
  methods: {
    menuAwayClose() {
      this.menuShow = false
    },
  },
})
</script>
