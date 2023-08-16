<template>
  <transition
    appear
    :enter-active-class="$t('dir') == 'ltr' ? 'slide-right' : 'slide-left'"
  >
    <!-- :leave-active-class="$t('dir') == 'ltr' ? ' slide-left' : 'slide-right'" -->
    <section class="fixed inset-0 top-0 left-0 flex z-[900]">
      <div
        class="inset-0 flex-1 order-last"
        @click="$store.commit('SET_MODAL', '')"
      ></div>
      <div
        class="flex flex-col h-full max-h-screen min-h-screen gap-4 px-5 pb-5 overflow-x-hidden overflow-y-scroll bg-white lg:flex-1 drawer-content"
      >
        <div
          class="sticky top-0 left-0 z-50 flex items-center justify-end gap-4 py-3 bg-white"
        >
          <NuxtLink
            :to="localePath(path)"
            target="_blank"
            class="inline-flex items-center justify-center gap-2 px-3 py-2 text-xs text-[#5F5F5F] capitalize transition-colors duration-150 border border-[#B3B3B3] rounded-lg hover:bg-gray-200"
            @click="$store.commit('SET_MODAL', '')"
          >
            <IconsFourArrowsIcon class="w-4 h-4 text-[#B3B3B3]" />
            {{ $t('view_details') }}
          </NuxtLink>
          <button
            class="inline-flex items-center justify-center text-[#B3B3B3] hover:text-gray-500 transition-colors duration-150 rounded-lg"
            @click="$store.commit('SET_MODAL', '')"
          >
            <svg
              viewBox="0 0 20 20"
              class="w-5 h-5"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99961 11.4876L2.56211 18.9251C2.34961 19.1376 2.10169 19.2438 1.81836 19.2438C1.53503 19.2438 1.28711 19.1376 1.07461 18.9251C0.862109 18.7126 0.755859 18.4647 0.755859 18.1813C0.755859 17.898 0.862109 17.6501 1.07461 17.4376L8.51211 10.0001L1.07461 2.5626C0.862109 2.3501 0.755859 2.10218 0.755859 1.81885C0.755859 1.53551 0.862109 1.2876 1.07461 1.0751C1.28711 0.862598 1.53503 0.756348 1.81836 0.756348C2.10169 0.756348 2.34961 0.862598 2.56211 1.0751L9.99961 8.5126L17.4371 1.0751C17.6496 0.862598 17.8975 0.756348 18.1809 0.756348C18.4642 0.756348 18.7121 0.862598 18.9246 1.0751C19.1371 1.2876 19.2434 1.53551 19.2434 1.81885C19.2434 2.10218 19.1371 2.3501 18.9246 2.5626L11.4871 10.0001L18.9246 17.4376C19.1371 17.6501 19.2434 17.898 19.2434 18.1813C19.2434 18.4647 19.1371 18.7126 18.9246 18.9251C18.7121 19.1376 18.4642 19.2438 18.1809 19.2438C17.8975 19.2438 17.6496 19.1376 17.4371 18.9251L9.99961 11.4876Z"
              />
            </svg>
          </button>
        </div>
        <div>
          <CommonPagePreloader v-if="loading" />
          <div v-else class="container px-3 pb-24">
            <slot />
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  props: ['path'],
  computed: {
    loading() {
      return this.$store.state.loading
    },
  },
}
</script>
<style scoped>
.slide-right {
  -webkit-animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@-webkit-keyframes slide-right {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes slide-right {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
.slide-out-left {
  -webkit-animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
@-webkit-keyframes slide-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
}
@keyframes slide-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
}

.slide-left {
  -webkit-animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@-webkit-keyframes slide-left {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes slide-left {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
</style>
