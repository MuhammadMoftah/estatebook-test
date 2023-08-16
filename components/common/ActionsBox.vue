<template>
  <div class="flex gap-4">
    <nav class="flex items-center gap-4">
      <!-- <a
        class="flex items-center justify-center w-10 h-10 text-xs font-medium duration-300 border border-solid rounded-full ltr:mr-4 rtl:ml-4 bg-wight drop-shadow-mapshadow border-bg-ofwight hover:bg-text-green hover:text-white hover:border-text-green group"
      >
        <IconsCompareIcon class="fill-icon-header group-hover:fill-white" />
      </a> -->

      <!-- v-if="type === 'unit'" -->
      <a
        class="flex items-center justify-center w-10 h-10 text-xs font-medium duration-300 border border-solid rounded-full cursor-pointer border-slate-200 compare bg-wight drop-shadow-mapshadow border-bg-ofwight hover:bg-text-green hover:text-white hover:border-text-green group"
        :class="{
          '!bg-text-green': isExist,
        }"
        @click="
          $store.dispatch('compare/setItem', {
            type: type === 'unit' ? 'units' : 'projects',
            item: item,
          })
        "
      >
        <IconsCompareIcon
          class="group-hover:!fill-white"
          :class="{
            '!fill-white': isExist,
          }"
        />
      </a>
      <!-- <a
        class="flex items-center justify-center w-10 h-10 ml-4 text-xs font-medium duration-300 border border-solid rounded-full bg-wight drop-shadow-mapshadow border-bg-ofwight hover:bg-text-green hover:text-white hover:border-text-green group"
      >
        <IconsFavIcon class="group-hover:fill-white" />
      </a> -->
      <button
        class="flex items-center justify-center w-10 h-10 bg-white border rounded-full hover:bg-text-green border-slate-200 group"
        @click="favHandler(!isFav, type, item)"
      >
        <IconsFavIcon v-if="isFav" class="mt-[3px] fill-icon-red" />
        <IconsFavIcon
          v-else
          class="mt-[3px] text-[#BEBEBE] group-hover:text-white"
        />
      </button>
      <CommonShareList
        :item="item"
        :url="url"
        :title-type="titleType"
        class="ltr:ml-auto rtl:mr-auto lg:flex-none"
      >
        <template #share-button>
          <a
            class="flex items-center justify-center w-10 h-10 text-xs font-medium duration-300 border border-solid rounded-full border-slate-200 bg-wight drop-shadow-mapshadow border-bg-ofwight hover:bg-text-green hover:text-white hover:border-text-green group"
          >
            <IconsShareIcon class="fill-icon-header group-hover:fill-white" />
          </a>
        </template>
      </CommonShareList>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/v3-component-props'
export default Vue.extend({
  props: {
    item: {
      type: Object,
      // default: () => {},
    },
    type: {
      type: String,
      // default: () => {},
    },
    titleType: {
      type: String,
      // default: () => {},
    },
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFav: this.item.favorite,
    }
  },
  computed: {
    isExist() {
      return !!this.$store.state.compare.items.find(
        el => el.id === this.item?.id
      )
    },
  },
})
</script>
