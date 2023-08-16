<template>
  <div class="h-full">
    <AuthTheLogin />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'auth',
  middleware: 'auth',
  auth: 'guest',
})
</script>
