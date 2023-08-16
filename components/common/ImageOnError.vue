<template>
  <div :class="[overridenClasses ? overridenClasses : 'w-full h-full']">
    <div v-if="!imageOnerror" :class="parentClass">
      <img :src="image" :class="imgClass" @error="imgUrlAlt" />
    </div>

    <slot v-else name="placeholder-image">
      <IconsPlaceholderAmenityIcon
        v-if="imageOnerror && type == 'icon'"
        :class="placeholderClass"
      />
      <div v-if="imageOnerror && type == 'image'" :class="placeholderClass">
        <IconsPlaceholderImageIcon />
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'
export default Vue.extend({
  props: {
    image: {
      type: String,
      required: true,
    } as PropOptions<string>,
    type: {
      type: String,
      required: false,
      default: 'icon',
    } as PropOptions<string>,
    imgClass: {
      type: String,
      required: false,
      default: 'w-full h-full',
    } as PropOptions<string>,
    parentClass: {
      type: String,
      required: false,
      default: '',
    } as PropOptions<string>,
    placeholderClass: {
      type: String,
      required: false,
      default: '',
    } as PropOptions<string>,
    overridenClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imageOnerror: false,
    }
  },
  methods: {
    imgUrlAlt(event: any) {
      if (event) {
        this.imageOnerror = true
        this.$emit('errorDetected', this.imageOnerror)
      }
    },
  },
})
</script>
