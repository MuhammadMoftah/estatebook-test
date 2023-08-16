<template>
  <div class="container px-3 mt-8 lg:mt-10">
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
            name: $t('privacy-policy'),
            link: localePath('/privacy-policy'),
            active: true,
          },
        ]"
      />
    </LazyHydrate>

    <PolicyTextEN v-if="$i18n.locale == 'en'" />
    <PolicyTextAR v-if="$i18n.locale == 'ar'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
  },
  computed: {},
})
</script>

<style scoped>
.black-dot {
  @apply inline-flex w-2 h-2 bg-black rounded-full rtl:ml-2 ltr:mr-2;
}
</style>
