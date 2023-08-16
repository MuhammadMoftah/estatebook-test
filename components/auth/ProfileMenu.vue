<template>
  <div v-if="$auth.loggedIn" class="relative inline-block group">
    <aside
      tabindex="0"
      class="flex items-center p-1 px-2 text-xs capitalize rounded-lg hover:bg-slate-50"
    >
      <div class="avatar">
        <div class="w-9">
          <img
            v-if="
              $auth.loggedIn &&
              $auth.user &&
              $auth.user.avatar.length &&
              !imageOnerror
            "
            class="rounded-full w-9 h-9"
            :src="$auth.user.avatar"
          />
          <!-- ? '': 'https://api.lorem.space/image/face?w=150&h=150 -->
          <img
            v-else-if="$auth.user && $auth.user.name"
            class="rounded-full w-9 h-9"
            :src="
              $auth.user
                ? `https://eu.ui-avatars.com/api/?name=${
                    $auth.user.name.split(' ')[0]
                  }+${$auth.user.name.split(' ')[1]}&size=250`
                : ''
            "
          />
        </div>
      </div>

      <span class="mx-2 text-gray-800 truncate">
        {{ $auth.loggedIn && $auth.user ? $auth.user.name : '-' }}
      </span>
    </aside>

    <ul
      class="absolute z-30 hidden overflow-hidden text-sm text-gray-700 bg-white border rounded-lg ltr:left-0 rtl:right-0 top-full w-36 border-prj-border font-cairo group-hover:block"
    >
      <NuxtLink :to="localePath('/profile')" class="profile-link">
        {{ $t('profile') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/wishlist')" class="profile-link">
        {{ $t('wishlist') }}
      </NuxtLink>
      <button
        class="!text-red-600 profile-link ltr:text-left rtl:text-right"
        @click="logout()"
      >
        {{ $t('logout') }}
      </button>
    </ul>
  </div>
  <!--
  <div class="ml-2 z-[60] dropdown dropdown-end" v-if="false">
    <button
      tabindex="0"
      :class="show ? 'bg-slate-50 hover:bg-slate-100' : ''"
      class="px-2 text-xs capitalize btn btn-ghost"
    >
      <span class="mx-2 font-semibold text-gray-800 truncate">
        {{ $auth.loggedIn && $auth.user ? $auth.user.name : '-' }}
      </span>
      <div class="avatar">
        <div class="w-9 mask mask-squircle">
          <img
            v-if="$auth.loggedIn && $auth.user && $auth.user.avatar.length"
            :src="$auth.user.avatar"
          />
          <img
            v-else
            :src="
              $auth.user
                ? `https://eu.ui-avatars.com/api/?name=${
                    $auth.user.name.split(' ')[0]
                  }+${$auth.user.name.split(' ')[1]}&size=250`
                : ''
            "
          />
        </div>
      </div>
    </button>
    <ul
      tabindex="0"
      class="p-2 text-sm font-semibold text-center bg-gray-100 shadow !z-70 rtl:absolute rtl:-right-24 text-main-700 dropdown-content menu rounded-box w-52 gap-y-1"
    >
      <li>
        <NuxtLink
          :to="localePath('/profile')"
          class="justify-center text-base font-medium capitalize title active:text-white"
          >{{ $t('profile') }}</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          :to="localePath('/wishlist')"
          class="justify-center text-base font-medium capitalize title active:text-white"
          >{{ $t('wishlist') }}</NuxtLink
        >
      </li>
      <li @click="logout()">
        <a
          class="justify-center text-white bg-red-600 active:bg-red-800 hover:bg-red-800 logout"
          >{{ $t('logout') }}</a
        >
      </li>
    </ul>
  </div> -->
</template>

<script>
export default {
  name: 'ProfileMenu',
  props: {
    show: Boolean,
    isHome: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      profileMenu: false,
      imageOnerror: false,
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      if (
        this.$route.path.includes('profile') ||
        this.$route.path.includes('wishlist')
      ) {
        this.$router.push(this.localePath('/'))
      }
    },
    imgUrlAlt(event) {
      if (event) {
        this.imageOnerror = true
      }
    },
  },
}
</script>

<style scoped>
.profile-link {
  @apply capitalize block w-full text-slate-700 border-b hover:bg-slate-100 cursor-pointer p-3 last:border-b-0;
}
</style>
