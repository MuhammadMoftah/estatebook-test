<template>
  <div>
    <p class="mt-4 text-sm text-text-gray" :class="{ 'line-clamp': isFull }">
      {{ content }}
    </p>
    <span
      v-if="content && content.length > 300"
      class="underline cursor-pointer text-text-green"
      @click="isFull = !isFull"
      >{{ isFull ? $t('read_more') : $t('read_less') }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isFull: true,
    }
  },
}
</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
