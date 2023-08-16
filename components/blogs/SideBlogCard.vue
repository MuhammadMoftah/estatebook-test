<template>
  <NuxtLink
    :to="localePath(`/blogs/${item.slug}`)"
    class="relative inline-flex items-center mt-6 lg:flex group md:w-2/4 lg:w-full"
  >
    <div
      class="rounded-lg overflow-hidden min-w-[114px] max-w-[114px] h-[90px]"
    >
      <img
        v-if="item.blog_image"
        :src="item.blog_image"
        class="object-cover w-full h-full duration-300 group-hover:scale-110"
        :alt="item.slug"
      />
      <div
        v-else
        class="flex items-center justify-center object-cover w-full h-full p-5 duration-300 bg-gray-100 group-hover:scale-110"
      >
        <img src="~/assets/images/logo.svg" class="w-full" alt="Estate Book" />
      </div>
    </div>
    <!-- End Photo -->

    <div class="ltr:pl-5 rtl:pr-5">
      <h3
        class="w-full text-lg font-light leading-8 text-black capitalize duration-300 group-hover:text-text-green"
      >
        {{ item.title }}
      </h3>
      <div class="flex items-center mt-2">
        <p
          class="relative text-sm text-text-gray font-normal tracking-[0.0015em] capitalize"
        >
          {{ $t('by') }}: {{ item.author ? item.author.name : null }}
        </p>
        <p
          class="relative text-sm text-text-gray font-normal tracking-[0.0015em] capitalize"
        >
          {{
            item.created_at
              ? item.created_at.split(' ')[0].replaceAll('-', '/')
              : null
          }}
        </p>
      </div>
    </div>
    <!-- End content -->
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
})
</script>
