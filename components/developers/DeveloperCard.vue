<template>
  <div class="px-4 py-10 mt-4 bg-white rounded-lg lg:drop-shadow-shcomm group">
    <a
      :href="localePath(`/developers/${developer.slug}`)"
      class="flex flex-col gap-y-4"
    >
      <div class="flex items-center justify-center w-full h-28">
        <img
          :src="developer.logo"
          class="max-w-full max-h-full"
          alt="Estate Book"
        />
      </div>
      <!-- End content -->

      <h3
        class="text-black text-center lg:text-[18px] text-xl font-semibold capitalize group-hover:text-text-green duration-300"
      >
        {{ developer.name }}
      </h3>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    developer: {
      type: Object,
      required: true,
    } as PropOptions<Developer>,
  },
})
</script>
