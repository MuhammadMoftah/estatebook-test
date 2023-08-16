<template>
  <div class="bloggroup">
    <NuxtLink
      :to="
        $i18n.locale === 'en'
          ? localePath(`/blogs/${item.slugs.en}`)
          : localePath(`/blogs/${item.slugs.ar}`)
      "
      class=""
    >
      <div class="absolute bottom-0 z-10 w-full px-5 bg-blog-pattern py-7">
        <span class="text-sm font-normal text-white">{{
          item.created_at ? item.created_at.split(' ')[0] : null
        }}</span>
        <h3 class="mt-2 text-xl font-bold leading-8 text-white capitalize">
          {{ item.title }}
        </h3>
        <div
          class="flex items-center gap-2 mt-2 text-base font-normal leading-6 text-white capitalize"
        >
          {{ item.short_description }}
          <IconsLeftArrowIcon
            class="shrink-0"
            :class="{ 'rotate-180': $t('dir') === 'rtl' }"
          />
        </div>
      </div>
      <!-- End content -->
      <img
        v-if="item.blog_image"
        :src="item.blog_image"
        class="object-cover w-full h-full duration-300 group-hover:scale-110"
        :alt="item.slug"
      />
      <div
        v-else
        class="object-cover w-full h-full min-h-[300px] flex items-center justify-center bg-gray-300 duration-300 group-hover:scale-110"
      >
        <img
          src="~/assets/images/logo.svg"
          class="max-w-[114px] lg:max-w-[156px] md:max-w-[178px]"
          alt="Estate Book"
        />
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})
</script>

<style></style>
