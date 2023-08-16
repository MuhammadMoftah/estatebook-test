<template>
  <!-- fixed ltr:left-4 rtl:right-4 bottom-4 flex items-center w-fit z-[200] -->
  <div
    class="fixed z-30 ltr:left-4 rtl:right-4 bottom-4"
    :class="compareItemsSlide ? 'flex items-center w-fit' : 'w-20 h-20'"
  >
    <div
      class="relative z-[1200] flex items-center justify-center transition-all duration-300 rounded-full shadow-md cursor-pointer w-14 h-14 bg-text-green shrink-0"
      :class="{
        'wobble-hor-bottom': addedItem,
        'ltr:!rounded-r-none rtl:!rounded-l-none': compareItemsSlide,
      }"
      @click="compareItemsSlide = !compareItemsSlide"
    >
      <transition
        enter-active-class="transition-all duration-300 opacity-100"
        leave-active-class="transition-all duration-300 opacity-0"
      >
        <div
          v-if="compareItemsCount !== 0 && !compareItemsSlide"
          class="absolute flex items-center justify-center w-5 h-5 text-sm bg-white rounded-full shadow-md -top-1 -right-1 text-text-green"
        >
          {{ compareItemsCount }}
        </div>
      </transition>
      <IconsCompareIcon class="w-5 h-5 text-white !fill-white" />
    </div>
    <div
      class="relative z-40 flex items-center flex-auto w-full gap-4 px-4 overflow-hidden transition-all duration-300 bg-white shadow-md rtl:rounded-l-full ltr:rounded-r-full h-14"
      :class="{
        'ltr:left-0 rtl:right-0 opacity-100': compareItemsSlide,
        'ltr:-left-full rtl:-right-full opacity-0': !compareItemsSlide,
      }"
    >
      <div
        class="flex items-center gap-4 lg:max-w-5xl md:max-w-md sm:max-w-xs max-w-[80px] overflow-x-auto"
      >
        <div
          v-for="cItem in compareStoreItems"
          :key="`compare-${cItem?.id}`"
          class="w-fit px-2 py-1 bg-text-green/10 text-xs capitalize rounded-[10px] text-text-green flex items-center justify-between gap-4"
        >
          <p class="truncate">
            {{ compareType === 'units' ? cItem?.title : cItem?.name }}
          </p>
          <a
            class="flex items-center justify-center w-5 h-5 text-white bg-red-400 rounded-full cursor-pointer shrink-0"
            @click="removeCompareItem(cItem)"
          >
            <IconsDeleteIcon class="w-4 h-4 fill-text-icons" />
          </a>
        </div>
      </div>
      <NuxtLink
        :to="localePath('/compare')"
        class="py-2 bg-text-green rounded-[10px] text-white capitalize text-sm px-4 flex items-center justify-center"
        @click.native="compareItemsSlide = false"
        >{{ $t('compare') }}</NuxtLink
      >
      <button
        class="px-4 text-sm capitalize bg-transparent border-0 outline-none shrink-0 text-text-green"
        @click="clearAll"
      >
        {{ $t('clear_all') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      addedItem: false as boolean,
      compareItemsSlide: false as boolean,
    }
  },
  computed: {
    compareStoreItems() {
      return this.$store.state.compare.items
    },
    compareItemsCount() {
      return this.$store.state.compare.items_count as number
    },
    compareType() {
      return this.$store.state.compare.compare_type
    },
  },
  watch: {
    compareItemsCount(val: number) {
      if (val) {
        setTimeout(() => {
          this.addedItem = true
        }, 100)
        this.addedItem = false
      }
    },
  },
  methods: {
    removeCompareItem(item: {}) {
      this.$store.dispatch('compare/removeItem', item)
    },
    clearAll() {
      this.$store.dispatch('compare/clearAll')
    },
  },
})
</script>

<style scoped>
.wobble-hor-bottom {
  -webkit-animation: wobble-hor-bottom 0.8s both;
  animation: wobble-hor-bottom 0.8s both;
}
@-webkit-keyframes wobble-hor-bottom {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
    transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
    transform: translateX(15px) rotate(6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
    transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
    transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
    transform: translateX(-6px) rotate(-1.2deg);
  }
}
@keyframes wobble-hor-bottom {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
    transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(6deg);
    transform: translateX(15px) rotate(6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(-3.6deg);
    transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(2.4deg);
    transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(-1.2deg);
    transform: translateX(-6px) rotate(-1.2deg);
  }
}
</style>
