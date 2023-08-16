<template>
  <section>
    <div
      id="my-modal-2"
      class="fixed inset-0 flex items-center justify-center w-full min-h-screen overflow-hidden z-[1100] bg-black/40"
    >
      <transition name="slide-in-Y" appear>
        <div
          class="p-0 overflow-hidden bg-white rounded-md modal-box"
          :class="maxWidth"
        >
          <div class="flex items-center px-5 py-3 bg-white">
            <p
              class="text-base font-semibold capitalize text-theme-dark-gray-3E"
            >
              <slot name="modal-title"></slot>
            </p>
            <a
              href="#"
              class="flex items-center min-h-0 gap-1 ml-auto transition-all text-theme-light-black-34 hover:text-theme-light-black-34/60"
              @click.prevent="$store.commit('SET_MODAL', '')"
            >
              <IconsCloseIcon class="w-5 h-5" />
            </a>
          </div>
          <div
            class="p-4 overflow-y-scroll"
            :class="maxWidth"
            :style="{ maxHeight }"
          >
            <slot name="modal-content"></slot>
          </div>
          <div class="flex items-center w-full mt-auto">
            <div
              class="flex items-center justify-between w-full px-5 py-6 bg-white"
            >
              <!-- <a
                href="#"
                class="btn text-primary capitalize !rounded-2xl !px-4 !py-2 min-h-0 flex items-center gap-1 !h-auto !text-xs mr-auto transition-all"
                @click.prevent="$store.commit('global/closeModal')"
              >
                <IconsCloseIcon class="w-5 h-5" />Cancel
              </a>-->
              <slot name="modal-action"></slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    maxWidth: {
      type: String,
      required: false,
    },
    maxHeight: {
      type: String,
      default: '400px',
    },
    clickAway: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeOutside() {
      if (this.clickAway) {
        this.$store.commit('SET_MODAL', '')
      }
    },
  },
}
</script>
<style>
/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
