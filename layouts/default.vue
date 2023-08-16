<template>
  <div :dir="$t('dir')">
    <LayoutMobileNav v-if="mobileNav" class="block lg:hidden" />

    <LayoutTheHeader />
    <nuxt />
    <LayoutTheFooter v-if="showFooter" />

    <LayoutMobileFooter />
    <AuthPopup v-if="$store.state.modal === 'loginPopup'" />

    <transition
      :enter-active-class="
        $t('dir') === 'ltr' ? 'slide-in-blurred-left' : 'slide-in-blurred-right'
      "
      :leave-active-class="
        $t('dir') === 'ltr'
          ? 'slide-out-blurred-left'
          : 'slide-out-blurred-right'
      "
    >
      <CommonCompareCircle v-if="compareItemsCount > 0" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import googleOneTap from 'google-one-tap'
import AuthPopup from '~/components/auth/AuthPopup.vue'

export default Vue.extend({
  components: {
    AuthPopup,
  },
  head() {
    const heads: any = {
      en: {
        title: 'EstateBook',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'It’s Time, to learn, discover, grow, & invest with EstateBook. An ultimate online space for anyone interested in the real estate market.',
            forceMeta: true,
          },
        ],
      },
      ar: {
        title: 'EstateBook',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'EstateBook هو موقع متخصص للمهتمين بسوق العقارات من خلال تقديم تجربة آمنة و معلومات موثوقة للعملاء والشركات العقارية والمطورين العقاريين.',
            forceMeta: true,
          },
        ],
      },
    }

    return heads[this.$i18n.locale]
  },
  data() {
    return {}
  },
  fetch() {
    this.setAxiosHeaders()
  },
  computed: {
    compareItemsCount() {
      return this.$store.state.compare.items_count
    },
    mobileNav() {
      return this.$store.state.mobileNav
    },
    showFooter() {
      const display = this.$store.state.display
      if (display !== 'list' && this.$route.path.includes('discover')) {
        return false
      }
      return true
    },
  },
  mounted() {
    const compareItems = this.$auth.$storage.getLocalStorage('compare_ids')
      ? this.$auth.$storage.getLocalStorage('compare_ids')
      : []

    const compareItemsIds = this.$auth.$storage.getLocalStorage(
      'compare_ids_count'
    )
      ? this.$auth.$storage.getLocalStorage('compare_ids_count')
      : 0
    const compareType = this.$auth.$storage.getLocalStorage('compare_type')
      ? this.$auth.$storage.getLocalStorage('compare_type')
      : 0

    // favourites
    // const favouriteUnitsItems = this.$auth.$storage.getLocalStorage(
    //   'favourite_units_ids'
    // )
    //   ? this.$auth.$storage.getLocalStorage('favourite_units_ids')
    //   : []
    // const favouriteProjectsItems = this.$auth.$storage.getLocalStorage(
    //   'favouriteProjectsItems'
    // )
    //   ? this.$auth.$storage.getLocalStorage('favouriteProjectsItems')
    //   : []

    this.$store.dispatch('compare/setLocalStorageItems', compareItems)
    this.$store.dispatch('compare/setLocalStorageItemsCount', compareItemsIds)
    this.$store.dispatch('compare/setLocalStorageCompareType', compareType)
    this.$store.commit('wishlist/INIT_UNITS_FROM_LOCALSTORAGE')
    this.$store.commit('wishlist/INIT_PROJECTS_FROM_LOCALSTORAGE')

    this.$store.commit('filter/INIT')
    this.$cookies.set(
      'filterQuery',
      this.$auth.$storage.getLocalStorage('filterQuery')
    )
    this.$cookies.setAll(
      'rangeFilter',
      this.$auth.$storage.getLocalStorage('rangeFilter')
    )
    this.$cookies.setAll(
      'selectedFilters',
      this.$auth.$storage.getLocalStorage('selectedFilters')
    )

    // google analytcs
    this.googleAnalytcs()
  },
  beforeMount() {
    this.setFont()

    // suggest login with google
    this.googleLogin()
  },
  methods: {
    googleAnalytcs() {
      if (window) {
        const googleNoscript = document.createElement('noscript')
        googleNoscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NHGX3WR"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        document.body.prepend(googleNoscript)

        window.dataLayer.push({ js: new Date(), config: 'G-GKQ2D0MRPT' })
        ;(function (
          c?: any,
          l?: any,
          a?: any,
          r?: any,
          i?: any,
          t?: any,
          y?: any
        ) {
          c[a] =
            c[a] ||
            function () {
              ;(c[a].q = c[a].q || []).push(arguments)
            }
          t = l.createElement(r)
          t.async = 1
          t.src = 'https://www.clarity.ms/tag/' + i
          y = l.getElementsByTagName(r)[0]
          y.parentNode.insertBefore(t, y)
        })(window, document, 'clarity', 'script', 'h3uee0ahxn')
      }

      //
      ;(function (w: any, d: any, s: any, l: any, i: any) {
        w[l] = w[l] || []
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : ''
        j.async = true
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
        f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', 'GTM-NHGX3WR')
    },
    setAxiosHeaders() {
      const code = this.$i18n.locale
      this.$axios.defaults.headers['Accept-Language'] = code
    },
    setFont() {
      const code = this.$i18n.locale
      this.$axios.defaults.headers['Accept-Language'] = code

      if (code === 'ar') {
        document.documentElement.style.setProperty(
          '--appFont',
          "'Cairo', sans-serif"
        )
      } else {
        document.documentElement.style.setProperty(
          '--appFont',
          "'Poppins', sans-serif"
        )
      }
    },

    googleLogin() {
      const options = {
        client_id: process.env.NUXT_ENV_GOOGLE_CLIENT_ID, // required
        auto_select: false, // optional
        cancel_on_tap_outside: false, // optional
        context: 'signin', // optional
      }
      if (!this.$auth.loggedIn) {
        googleOneTap(options, (response: any) => {
          const base64Url = response.credential.split('.')[1]
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
              })
              .join('')
          )

          const JwtResponse = JSON.parse(jsonPayload)
          // Send response to server
          const payload = {
            name: JwtResponse.name,
            email: JwtResponse.email,
            token: JwtResponse.sub,
            avatar: JwtResponse.picture,
            platform: 'google',
          }
          this.socialLogin(payload)
        })
      }
    },

    socialLogin(payload: any) {
      // this.sent = false;
      this.$axios
        .post('/client-social', payload)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          this.$auth.setUser(user)
          this.$auth.setUserToken(token)

          this.$router.push(this.localePath('/'))
          this.$store.commit('global/modal', '')
        })
        .catch(_err => {
          // this.$toast.error(err.response.data.failed)
        })
    },
  },
})
</script>

<style>
.slide-out-blurred-right {
  -webkit-animation: slide-out-blurred-right 0.45s
    cubic-bezier(0.755, 0.05, 0.855, 0.06) both;
  animation: slide-out-blurred-right 0.45s
    cubic-bezier(0.755, 0.05, 0.855, 0.06) both;
}
@-webkit-keyframes slide-out-blurred-right {
  0% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px) scaleX(2) scaleY(0.2);
    transform: translateX(1000px) scaleX(2) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
}
@keyframes slide-out-blurred-right {
  0% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px) scaleX(2) scaleY(0.2);
    transform: translateX(1000px) scaleX(2) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
}
.slide-out-blurred-left {
  -webkit-animation: slide-out-blurred-left 0.45s
    cubic-bezier(0.755, 0.05, 0.855, 0.06) both;
  animation: slide-out-blurred-left 0.45s cubic-bezier(0.755, 0.05, 0.855, 0.06)
    both;
}
@-webkit-keyframes slide-out-blurred-left {
  0% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px) scaleX(2) scaleY(0.2);
    transform: translateX(-1000px) scaleX(2) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
}
@keyframes slide-out-blurred-left {
  0% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px) scaleX(2) scaleY(0.2);
    transform: translateX(-1000px) scaleX(2) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
}
.slide-in-blurred-right {
  -webkit-animation: slide-in-blurred-right 0.3s cubic-bezier(0.23, 1, 0.32, 1)
    both;
  animation: slide-in-blurred-right 0.3s cubic-bezier(0.23, 1, 0.32, 1) both;
}
@-webkit-keyframes slide-in-blurred-right {
  0% {
    -webkit-transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
    transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
@keyframes slide-in-blurred-right {
  0% {
    -webkit-transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
    transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
.slide-in-blurred-left {
  -webkit-animation: slide-in-blurred-left 0.6s cubic-bezier(0.23, 1, 0.32, 1)
    both;
  animation: slide-in-blurred-left 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
}
@-webkit-keyframes slide-in-blurred-left {
  0% {
    -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
@keyframes slide-in-blurred-left {
  0% {
    -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
.slide-in-top {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
.slide-out-top {
  -webkit-animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
@-webkit-keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
}
@keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
}

.drop-shadow-shadowcard {
  --tw-drop-shadow: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.06));
}

/* ===== Animations ===== */
/* slidefade  */
.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* rotate  */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.3s;
}

.rotate-enter,
.rotate-leave-to {
  transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}

/* start carusel styling */
.slick-slide {
  margin: 0 0.5em !important;
}

/* .vue-slider-dot {
  height: 20px !important;
}
.vue-slider-dot-tooltip-inner {
  background-color: #1d9db1 !important;
  border-color: #1d9db1 !important;
} */

.customContainer {
  max-width: calc(100% - 18.75%);
}

.textShadow {
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
}

.theme-shadow {
  box-shadow: 0px 0px 6px rgba(201, 201, 201, 0.25);
}

/* slide-in-Y */
.slide-in-Y-move {
  transition: opacity 0.1s ease-out, transform 0.3s ease-out;
}

.slide-in-Y-leave-active {
  transition: opacity 0.1s ease-out,
    transform 0.2s cubic-bezier(0.5, 0, 0.7, 0.4);
  transition-delay: calc(0.1s * (var(--total) - var(--i)));
}

.slide-in-Y-enter-active {
  transition: opacity 0.1s ease-out,
    transform 0.2s cubic-bezier(0.2, 0.5, 0.1, 1);
  transition-delay: calc(0.1s * var(--i));
}

.slide-in-Y-enter,
.slide-in-Y-leave-to {
  opacity: 0.4;
}

.slide-in-Y-enter {
  transform: translateY(-5em);
}

.slide-in-Y-leave-to {
  transform: translateY(-5em);
}

/* slide-in */
.slide-in-move {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.slide-in-leave-active {
  transition: opacity 0.3s ease-out,
    transform 0.3s cubic-bezier(0.5, 0, 0.7, 0.4);
  transition-delay: calc(0.1s * (var(--total) - var(--i)));
}

.slide-in-enter-active {
  transition: opacity 0.3s ease-out,
    transform 0.3s cubic-bezier(0.2, 0.5, 0.1, 1);
  transition-delay: calc(0.1s * var(--i));
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
}

.slide-in-enter {
  transform: translateX(-1em);
}

.slide-in-leave-to {
  transform: translateX(1em);
}
</style>
