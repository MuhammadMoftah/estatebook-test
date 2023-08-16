<template>
  <ul
    v-if="amenities && amenities.length"
    :class="[
      overridenClasses
        ? overridenClasses
        : 'grid grid-cols-3 gap-2 mt-3 overflow-hidden overflow-x-scroll lg:gap-5 lg:grid-cols-5',
    ]"
  >
    <li v-for="amenity in amenities" :key="amenity.slug">
      <div
        style="box-shadow: 0px 0px 43px rgba(0, 0, 0, 0.03)"
        class="flex items-center justify-center h-[102px] rounded-lg border border-[#E4E4E4]"
      >
        <CommonImageOnError
          v-if="amenity.logo"
          :image="amenity.logo"
          img-class="w-12 h-12"
          parent-class="flex items-center justify-center w-full h-full"
        />
        <IconsPlaceholderAmenityIcon v-else class="w-8" />
      </div>
      <h4 class="mt-5 text-base font-normal text-center text-black">
        {{ amenity.name }}
      </h4>
    </li>
  </ul>
  <!-- <div v-else>No amenities to show</div> -->
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'
export default Vue.extend({
  props: {
    amenities: {
      type: Array,
      default: () => [],
    } as PropOptions<Amenity[]>,
    drawer: {
      type: Boolean,
      default: false,
    },
    overridenClasses: {
      type: String,
      default: '',
    },
  },
})
</script>
