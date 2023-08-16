<template>
  <div class="flex flex-col gap-4 tabs">
    <div class="flex gap-4 border-b border-gray-100">
      <button
        v-for="title in tabTitles"
        :key="title"
        class="p-3 text-sm capitalize border-b border-b-transparent"
        :class="{
          ' text-sm border-b  rounded-sm text-text-green   border-b-text-green bg-bg-icons ':
            selectedTitle === title,
        }"
        @click="selectTitle(title), $emit('selected', title)"
      >
        {{ title }}
      </button>
    </div>

    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  provide() {
    return {
      selectedTitle: computed(() => this.selectedTitle),
    }
  },
  data() {
    return {
      tabTitles: [],
      selectedTitle: '',
    }
  },
  created() {
    this.tabTitles = this.$slots.default
      ?.map(item => item.componentOptions?.propsData?.title)
      .filter(item => item)
    if (this.tabTitles && this.tabTitles.length) {
      this.selectedTitle = this.tabTitles[0]
    }
  },
  methods: {
    selectTitle(title) {
      this.selectedTitle = title
      this.$emit('selectedTitle', this.selectedTitle)
    },
  },
}
</script>
