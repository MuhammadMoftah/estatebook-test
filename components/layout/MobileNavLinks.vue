<template>
  <ul class="flex items-center text-sm text-start">
    <li class="!px-0 route-style" @click="$store.commit('CLOSE_NAV')">
      <NuxtLink
        :to="localePath('/discover?page=1')"
        class="flex items-center justify-center gap-2 !text-white capitalize !py-2 px-3 duration-200 rounded-lg bg-theme hover:opacity-90"
      >
        <IconsDiscoveryIcon class="w-5 h-5" />
        {{ $t('discover') }}
      </NuxtLink>
    </li>

    <li class="route-style" @click="$store.commit('CLOSE_NAV')">
      <NuxtLink :to="localePath('/')">
        {{ $t('home') }}
      </NuxtLink>
    </li>

    <li class="route-style" @click="$store.commit('CLOSE_NAV')">
      <!-- <button
        :to="localePath('/discover?page=1')"
        class="capitalize"
        @click="
          $router.push(localePath('/discover?page=1')),
            $store.commit('discoverTab', 'projects')
        "
      >
        {{ $t('projects') }}
      </button> -->
      <NuxtLink :to="localePath('/projects?page=1')">
        {{ $t('projects') }}
      </NuxtLink>
    </li>
    <li class="route-style" @click="$store.commit('CLOSE_NAV')">
      <NuxtLink :to="localePath('/developers?page=1')">
        {{ $t('developers') }}
      </NuxtLink>
    </li>

    <li class="route-style" @click="$store.commit('CLOSE_NAV')">
      <NuxtLink :to="localePath('/blogs?page=1')">
        {{ $t('blogs') }}
      </NuxtLink>
    </li>

    <li
      class="route-style"
      @click="changeLang($i18n.locale === 'en' ? 'ar' : 'en')"
    >
      <a href="javascript:void(0)" class="font-cairo">
        {{ $i18n.locale === 'en' ? 'العربية' : 'English' }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
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
      this.$store.commit('CLOSE_NAV')
    },
  },
})
</script>

<style scoped>
.route-style {
  @apply block text-black w-full capitalize duration-200 border-b border-slate-300 first:border-none last:border-none font-semibold hover:text-theme px-2;
}
.route-style a {
  @apply flex w-full h-full py-4;
}

.nuxt-link-exact-active {
  @apply text-theme;
}
</style>
