<template>
  <nav
    v-if="item && item.mobile"
    class="flex flex-wrap items-center justify-center gap-4 lg:justify-end"
  >
    <a
      :href="`tel:${item?.mobile}`"
      class="flex items-center gap-2 justify-center w-32 bg-text-green text-white min-w-[128px] h-11 rounded-lg text-sm font-medium capitalize hover:bg-text-green hover:text-white group duration-300"
    >
      <IconsCallIcon class="w-4 h-4" />

      {{ $t('call_now') }}
    </a>
    <a
      :href="`https://wa.me/${item?.whatsapp}`"
      class="flex items-center gap-2 justify-center w-32 min-w-[128px] h-11 rounded-lg border border-border-list text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green group duration-300"
    >
      <IconsWhatsappIcon class="w-4 h-4" />

      {{ $t('whatsapp') }}
    </a>
  </nav>
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
