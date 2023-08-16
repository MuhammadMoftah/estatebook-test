<template>
  <section class="container px-3 mt-8 lg:mt-10">
    <LazyHydrate when-visible>
      <LazyCommonPageBreadcrumb
        :breadcrumb-links="[
          {
            id: 1,
            name: $t('home'),
            link: localePath('/'),
            active: false,
          },
          {
            id: 2,
            name: $t('about_us'),
            link: localePath('/about'),
            active: true,
          },
        ]"
      />
    </LazyHydrate>
    <article class="max-w-2xl py-16 mx-auto text-center">
      <h2
        class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
      >
        {{ $t('about_us') }}
      </h2>

      <section class="my-8 space-y-8">
        <h5 v-if="$i18n.locale == 'en'" class="text-lg font-medium text-center">
          It’s Time to learn, to discover, to grow and to invest with
          <span class="font-black text-theme">Estate</span>
          <span class="-ml-1 font-black">Book</span>
        </h5>

        <h5 v-else class="text-lg font-medium text-center">
          حان الوقت، للتعلم، للأكتشاف، للنمو، للأستثمار مع
          <span class="font-black text-theme">Estate</span>
          <span class="-ml-1 font-black">Book</span>
        </h5>

        <p class="text-[#5F5F5F] px-5 leading-7">
          {{ $t('about_us_content') }}
        </p>

        <aside class="font-semibold">
          <p class="text-xl uppercase md:text-2xl">{{ $t('hotline') }}</p>
          <p class="text-2xl md:text-4xl text-theme font-poppins">17066</p>
        </aside>
      </section>
    </article>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
