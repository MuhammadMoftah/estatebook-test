<template>
  <section
    class="fixed top-0 z-50 w-screen h-screen p-6 bg-bg-menu ltr:right-0 rtl:left-0"
    @click.stop=""
  >
    <div class="flex items-center justify-between">
      <NuxtLink :to="localePath('/')" class="outline-none ring-none">
        <IconsEstatebookLogo />
      </NuxtLink>
      <button @click="$store.commit('TOGGLE_NAV')">
        <IconsCrossIcon class="w-6 h-6" />
      </button>
    </div>

    <LayoutMobileNavLinks class="flex-col mt-8" />

    <div class="fixed bottom-5">
      <div>
        <div class="flex pb-1">
          <IconsHotlineIcon class="w-6 h-6" />
          <span class="font-bold uppercase ms-2">{{ $t('hotline') }}</span>
        </div>
        <div class="text-3xl font-bold text-theme">
          <a href="tel:+217066">17066</a>
        </div>
      </div>
      <LayoutSocialBox />
      <div class="text-gray-400 text-[11px] font-light">
        <p>
          All copyrights © reserved • 2023 •
          <span class="font-medium"> Estatebook </span>
        </p>
      </div>
    </div>
  </section>
</template>
