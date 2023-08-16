<template>
  <div
    class="group relative w-full h-56 overflow-hidden rounded-lg bg-white text-white"
  >
    <div
      class="absolute top-0 z-20 h-4/5 w-full space-y-2 bg-gradient-to-b from-black/70 to-gray-50/10 p-4"
    >
      <h2 class="line-clamp-1 text-xl font-bold">{{ location.name }}</h2>
      <div class="flex items-center gap-x-2">
        {{ location.projects_count }} {{ $t('projects') }}

        <svg
          width="21"
          height="11"
          viewBox="0 0 21 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mt-1 h-5 w-5 fill-current"
        >
          <path
            d="M20.8612 5.16312L16.0886 0.390467C15.9171 0.190273 15.6158 0.166936 15.4157 0.338419C15.2155 0.509861 15.1921 0.811157 15.3636 1.01135C15.3796 1.03001 15.397 1.04744 15.4157 1.0634L19.3722 5.0247H0.477249C0.213688 5.0247 0 5.23839 0 5.50199C0 5.76559 0.213688 5.97924 0.477249 5.97924H19.3722L15.4157 9.93574C15.2155 10.1072 15.1921 10.4085 15.3636 10.6087C15.5351 10.8089 15.8363 10.8322 16.0365 10.6607C16.0552 10.6447 16.0726 10.6273 16.0886 10.6087L20.8612 5.83602C21.0463 5.64993 21.0463 5.34929 20.8612 5.16312Z"
          />
        </svg>
      </div>
    </div>

    <img
      src="https://api.theestatebook.net/storage/9770/conversions/Screen-Shot-2020-06-01-at-3.38.35-PM-webp_format.webp"
      alt=""
      class="absolute inset-0 z-10 h-full w-full rounded-lg object-cover object-center duration-500"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  props: {
    location: {
      type: Object,
      required: true,
    } as PropOptions<Neighbourhood>,
  },
})
</script>
