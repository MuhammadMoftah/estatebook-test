<template>
  <footer class="fixed inset-x-0 bottom-0 z-20 bg-white border-t lg:hidden">
    <div class="flex items-center py-3 justify-evenly">
      <NuxtLink
        class="flex flex-col items-center text-xs font-semibold capitalize gap-y-1"
        :to="localePath('/discover?page=1')"
      >
        <IconsDiscoveryIcon class="w-6 h-6 fill-current text-emerald-500" />
        {{ $t('discover') }}
      </NuxtLink>
      <NuxtLink
        class="flex flex-col items-center text-xs font-semibold capitalize gap-y-1"
        :to="localePath('/wishlist')"
      >
        <IconsNewHeartIcon class="w-6 h-6 fill-current text-emerald-500" />
        {{ $t('wishlist') }}
      </NuxtLink>
      <button
        class="flex flex-col items-center text-xs font-semibold capitalize gap-y-1"
        @click="$store.commit('SET_MODAL', 'loginPopup')"
      >
        <IconsNewProfileIcon class="w-6 h-6" />
        {{ $t('login') }}
      </button>
    </div>
  </footer>
</template>
