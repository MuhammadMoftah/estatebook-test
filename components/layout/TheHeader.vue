<template>
  <div
    class="relative z-30 flex items-center w-full h-16 bg-white md:h-20"
    :class="{
      '!fixed': !displayHide1,
      '!sticky top-0': stickyHeader,
      'drop-shadow-theme fixed top-0': pageOffsetY,
    }"
  >
    <div
      class="flex items-center justify-between px-5"
      :class="shrinkContainerSize ? 'w-full' : 'container'"
    >
      <div class="flex items-center gap-x-3">
        <button
          type="button"
          class="flex items-center justify-center duration-300 bg-white rounded-lg active:scale-105 hover:opacity-75 lg:hidden md:w-min md:h-min focus:outline-none"
          @click="$store.commit('TOGGLE_NAV')"
        >
          <IconsMenuIcon
            class="block w-6 h-6 ltr:scale-x-[-1] text-slate-700"
          />
        </button>

        <NuxtLink :to="localePath('/')" exact>
          <IconsEstatebookLogo />
        </NuxtLink>
        <!-- End Logo -->

        <div
          class="relative top-auto right-auto hidden w-full p-0 bg-transparent lg:block h-fit ltr:lg:ml-20 rtl:lg:mr-20"
        >
          <LayoutNavLinks />
        </div>
        <!-- End Menu -->
      </div>
      <!-- End div Logo and Menu -->
      <section class="items-center hidden gap-4 lg:flex">
        <!-- search button -->
        <!-- <button @click="$store.commit('innerFilters', !innerFilters)">
          <IconsSearchIcon
            class="w-6 h-6 fill-icon-header hover:fill-gray-600"
          />
        </button> -->
        <!-- End search -->
        <div class="relative inline-block group">
          <!-- en -->
          <button
            class="inline-flex items-center text-base gap-x-3"
            @click="changeLang($i18n.locale === 'en' ? 'ar' : 'en')"
          >
            <span class="text-sm text-text-gray font-cairo">
              {{ $i18n.locale === 'en' ? 'العربية' : 'English' }}
            </span>
            <IconsNewGlobalIcon class="w-5 h-5 text-gray-500 fill-current" />
          </button>

          <!-- <IconsLangIcon class="w-6 h-6 text-icon-header hover:fill-gray-600" /> -->
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-5 h-5 text-gray-500 fill-current group-hover:cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"
            />
          </svg>
          <nav
            class="absolute z-30 hidden w-24 overflow-hidden text-gray-700 -translate-x-1/2 bg-white border border-gray-200 rounded-lg left-1/2 drop-shadow-theme top-full font-cairo group-hover:block"
          >
            <NuxtLink
              v-for="lang in locales"
              :key="lang.code"
              class="block p-2 text-sm font-normal cursor-pointer hover:!text-white hover:bg-gray-100"
              @click.native="changeLang(lang.code)"
            >
              <div class="flex items-center gap-x-1">
                <div class="h-3">
                  <img
                    v-if="lang.code === 'en'"
                    src="~/assets/images/flags/us.svg"
                    alt="English"
                    class="object-cover object-center w-full h-full"
                  />
                  <img
                    v-else
                    src="~/assets/images/flags/eg.svg"
                    alt="English"
                    class="object-cover object-center w-full h-full"
                  />
                </div>
                <span class="text-[#222] text-xs">{{
                  lang.name === 'English' ? 'English' : 'العربية'
                }}</span>
              </div>
            </NuxtLink>
          </nav> -->
        </div>

        <div class="relative flex items-center">
          <!-- <button
            @click="
              !$auth.loggedIn
                ? $store.commit('SET_MODAL', 'loginPopup')
                : $router.push(localePath(`/wishlist`))
            "
          >
            <IconsHeartIcon
              class="w-6 h-6 fill-icon-header hover:fill-gray-600"
            />
          </button> -->
          <NuxtLink :to="localePath('/wishlist')">
            <IconsNewHeartIcon class="w-5 h-5 text-gray-500 fill-current" />
          </NuxtLink>
        </div>

        <!-- web button  -->
        <button
          v-if="!$auth.loggedIn"
          class="flex items-center gap-3 px-3 py-2 border rounded-lg"
          @click="$store.commit('SET_MODAL', 'loginPopup')"
        >
          <IconsNewProfileIcon class="w-5 h-5 text-gray-500 fill-current" />
          <span
            class="hidden text-xs font-medium capitalize duration-150 text-text-gray lg:text-sm lg:block"
          >
            {{ $t('login') }}
          </span>
        </button>

        <AuthProfileMenu v-if="$auth.loggedIn" class="hidden lg:block" />
      </section>
      <div class="block lg:hidden">
        <a
          v-if="isReadyUserAgent"
          class="rounded-lg bg-theme px-2.5 py-1.5 text-xs font-semibold uppercase text-white"
          :href="appStore"
          target="_blank"
        >
          {{ $t('get_app') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { LocaleObject } from '@nuxtjs/i18n'
import { i18n } from '~/config'

export default Vue.extend({
  data() {
    return {
      pageOffsetY: 0,
      device: '',
      isReadyUserAgent: false,
    }
  },

  computed: {
    locales(): LocaleObject[] {
      return this.$i18n.locales as LocaleObject[]
    },

    mobileNav() {
      return this.$store.state.mobileNav
    },
    innerFilters() {
      return this.$store.state.innerFilters
    },

    shrinkContainerSize() {
      return (
        ['grid', 'map'].includes(this.$store.state.display) &&
        this.$route.path.includes('discover')
      )
    },

    appStore() {
      const appleStore =
        'https://apps.apple.com/us/app/estatebook-its-time/id6448032499'
      const playStore =
        'https://play.google.com/store/apps/details?id=com.estatebook.app'

      const store = /iPhone|iPod|iPad/.test(this.device)
        ? appleStore
        : /Android/.test(this.device)
        ? playStore
        : '#'

      return store
    },
  },
  mounted() {
    if (window) {
      this.device = navigator.userAgent
      this.isReadyUserAgent = true
    }

    window.addEventListener('scroll', _ => {
      this.pageOffsetY = window.pageYOffset
    })
  },
  methods: {
    changeLang(value: string) {
      this.$axios.defaults.headers['Accept-Language'] = value
      // this.$auth.$storage.setLocalStorage('accept_language', v)
      // if (this.$route.params.id || this.$route.params.slug) {
      //   // this.$router.push(this.localePath('/'))
      // }
      if (value === 'ar') {
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
      this.$i18n.setLocale(value)
      this.$router.push(this.localePath(`/${value === 'en' ? '' : value}`))
    },
  },
})
</script>

<style scoped>
.nuxt-link-active {
  @apply text-text-green;
}
.nuxt-link-exact-active {
  @apply text-text-green;
}
</style>
