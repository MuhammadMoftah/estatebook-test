<template>
  <transition name="slide-in-Y">
    <section
      v-if="show"
      class="fixed top-0 left-0 z-40 w-full transition-all bg-gray-100 drop-shadow-theme headerScroll duration-600 sm:px-6 min-h-12"
    >
      <div
        class="container items-center justify-between px-3 py-5 mx-auto md:flex"
      >
        <div class="flex-wrap items-center justify-between w-full lg:flex">
          <div class="flex items-center justify-between w-full gap-8">
            <div>
              <h3 v-if="type == 'unit'" class="font-bold capitalize">
                {{ data.title }}
              </h3>
              <h3 v-if="type == 'project'" class="font-bold capitalize">
                {{ data.name }}
              </h3>
              <div
                class="flex items-center w-full gap-1 py-1 text-xs text-gray4"
              >
                <IconsUnitMarkerIcon class="self-start w-4 h-4" />
                <p class="max-w-xs truncate md:max-w-sm">
                  {{ data.address }}
                </p>
              </div>
            </div>
            <div class="flex gap-8">
              <div class="flex items-center">
                <!-- End logo -->

                <div class="">
                  <span class="text-xs font-normal capitalize text-text-gray">{{
                    $t('start_from')
                  }}</span>
                  <div
                    v-if="type === 'unit'"
                    class="text-lg font-bold text-black"
                  >
                    {{ $numberFormat(data.price) }}
                    <span class="text-sm font-normal uppercase">{{
                      $t('EGP')
                    }}</span>
                  </div>
                  <div v-else class="text-lg font-bold text-black">
                    {{ $numberFormat(data.start_price) }}
                    <span class="text-sm font-normal uppercase">{{
                      $t('EGP')
                    }}</span>
                  </div>
                </div>
                <!-- End price -->
              </div>
              <div>
                <span class="text-xs font-normal capitalize text-text-gray">
                  {{ $t('min_down_payment') }}</span
                >
                <div class="text-lg font-bold text-black">
                  {{ $numberFormat(data.min_down_payment) }}
                  <span class="text-sm font-normal uppercase">
                    {{ $t('EGP') }}
                  </span>
                </div>
              </div>
              <div>
                <span class="text-xs font-normal capitalize text-text-gray">{{
                  $t('min_monthly_payment')
                }}</span>
                <div class="text-lg font-bold text-black">
                  {{ $numberFormat(data.min_month_payment) }}
                  <span class="text-sm font-normal uppercase">
                    {{ $t('EGP') }}
                  </span>
                </div>
              </div>
            </div>
            <nav class="flex items-center">
              <a
                :href="`tel:${data?.agent?.mobile}`"
                class="flex items-center justify-center p-3 text-sm font-medium text-black capitalize duration-150 border rounded-full border-border-list hover:bg-text-green hover:text-white hover:border-text-green group ltr:mr-2 rtl:ml-2"
              >
                <IconsCallIcon
                  class="w-4 h-4 duration-300 fill-black group-hover:fill-white"
                />

                <!-- {{ $t('call_now') }} -->
              </a>
              <a
                :href="`https://wa.me/${data?.agent?.whatsapp}`"
                target="_blank"
                class="flex items-center justify-center p-3 text-sm font-medium text-white capitalize duration-150 border rounded-full bg-text-green border-text-green"
              >
                <IconsWhatsappIcon
                  class="w-4 h-4 duration-300 shrink-0 fill-white group-hover:fill-white"
                />

                <!-- {{ $t('whatsapp') }} -->
              </a>
            </nav>
            <!-- End Logo & Price -->
          </div>

          <!-- End List -->
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: 'unit',
    },
  },
  data() {
    return {
      show: false,
      menu: false,
      isFav: null,
    }
  },
  mounted() {
    this.isFav = this.data

    window.addEventListener('scroll', this.navShowHandler)
    if (window.scrollY > 250) {
      this.show = true
    } else {
      this.show = false
    }
    document.addEventListener('mousedown', this.checkIfClickedOutside)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.navShowHandler)
    window.removeEventListener('mousedown', this.checkIfClickedOutside)
  },

  methods: {
    favHandler(value, type) {
      if (!this.$auth.user) {
        this.$store.commit('global/modal', 'loginPopup')
        return
      }

      const payload = {
        id: this.data.id,
        type,
        favorite: value,
      }
      this.$axios.post('/favorite', payload).then(res => {
        this.isFav = value
      })
    },
    navShowHandler() {
      if (window.scrollY > 250) {
        this.show = true
      } else {
        this.show = false
      }
    },
    checkIfClickedOutside(e) {
      if (
        this.menu === true &&
        !document.getElementById('shareDropdown').contains(e.target) &&
        !document.getElementById('shareButton').contains(e.target)
      ) {
        this.menu = false
      }
    },
  },
}
</script>

<style scoped>
.inputScroll {
  box-shadow: 0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%) !important;
  border: 0.5px solid rgb(156, 154, 154, 0.2);
}
.headerScroll {
  /* box-shadow: 0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%) !important; */
}
.mainInput {
  animation: mainInput 0.3s forwards;
}
@keyframes mainInput {
  0% {
    top: 0;
    opacity: 1;
    height: 70px;
  }
  80% {
    top: -50px;
    opacity: 0;
  }
  100% {
    height: 0px;
    top: -50px;
    opacity: 0;
  }
}
.appearedInput {
  animation: appearedInput 0.3s forwards;
  opacity: 0;
  position: relative;
}
@keyframes appearedInput {
  0% {
    top: -50px;
    opacity: 0;
  }
  80% {
    top: 0px;
    opacity: 1;
  }
  100% {
    top: 0px;
    opacity: 1;
  }
}
.titleBorder {
  height: 2px;
  width: 0px;
  transition-duration: 0.5s;
}
.title:hover ~ .titleBorder {
  background: #1d9db1;
  width: 100%;
}
.menuTop {
  transition: all 0.5s;
  transform: rotate(-50deg);
}
.menuBottom {
  transition: all 0.5s;
  transform: rotate(50deg);
}
a:hover .share {
  color: white;
}

.polygon {
  position: absolute;
  top: -30px;
  background-color: white;
  clip-path: polygon(50% 0px, 100% 100%, 0px 100%);
  width: 30px;
  height: 11px;
  margin-top: -10px;
  margin-inline-start: 43px;
}
</style>
