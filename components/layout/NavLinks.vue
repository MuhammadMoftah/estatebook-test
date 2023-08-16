<template>
  <ul class="flex items-center gap-4 text-sm text-center">
    <li>
      <NuxtLink
        :to="localePath('/discover?page=1')"
        class="flex items-center gap-2 !text-white capitalize py-2 px-3 duration-200 rounded-lg lg:border-none bg-theme hover:opacity-90"
      >
        <IconsDiscoveryIcon />

        {{ $t('discover') }}
      </NuxtLink>
    </li>

    <li>
      <NuxtLink :to="localePath('/projects?page=1')" class="route-style">
        {{ $t('projects') }}
      </NuxtLink>
    </li>
    <!-- <button
        :to="localePath('/discover?page=1')"
        class="route-style"
        @click="
          $router.push(localePath('/discover?page=1')),
            $store.commit('discoverTab', 'projects')
        "
      >
        {{ $t('projects') }}
      </button> -->

    <!-- <li>
      <NuxtLink :to="localePath('/rent?page=1')" class="route-style">
        {{ $t('rent') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('/neighborhoods?page=1')" class="route-style">
        {{ $t('neighborhoods') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('/projects?page=1')" class="route-style">
        {{ $t('projects') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('/units?page=1')" class="route-style">
        {{ $t('units') }}
      </NuxtLink>
    </li> -->
    <li>
      <NuxtLink :to="localePath('/developers?page=1')" class="route-style">
        {{ $t('developers') }}
      </NuxtLink>
    </li>

    <li>
      <NuxtLink :to="localePath('/blogs?page=1')" class="route-style">
        {{ $t('blogs') }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.route-style {
  @apply block text-text-gray capitalize duration-200 rounded-lg lg:border-none py-2 hover:text-theme px-2;
}
.nuxt-link-active {
  @apply text-theme;
}
.nuxt-link-exact-active {
  @apply text-theme;
}
</style>
