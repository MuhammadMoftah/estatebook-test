<template>
  <div class="flex flex-col items-center justify-center gap-5 text-center">
    <IconsEmptyResult />

    <div>
      <h2
        class="text-xl font-bold leading-none text-black capitalize lg:text-2xl"
      >
        {{ $t('no_result_sorry') }}
      </h2>
      <span class="text-sm text-text-gray"
        >{{ $t('no_result_pt1') }}
        <nuxt-link :to="localePath(`${newSearchUrl}`)" class="text-text-green">
          {{ $t('no_result_pt2') }}</nuxt-link
        >
        <!-- {{ $t('no_result_pt3') }} -->
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    newSearchUrl: {
      type: String,
      default: 'units',
    } as PropOptions<string>,
  },
})
</script>
