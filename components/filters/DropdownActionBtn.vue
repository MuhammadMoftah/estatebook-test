<template>
  <div class="flex items-center justify-end p-2 gap-x-2">
    <button
      class="px-3 py-2 text-xs font-medium text-black border rounded-lg border-text-green"
      @click.stop="$emit('reset')"
    >
      {{ $t('reset') }}
    </button>
    <button
      class="px-3 py-2 text-xs font-medium text-white rounded-lg bg-text-green"
      @click.stop="$emit('apply')"
    >
      {{ $t('apply') }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DropdownActionBtn',
}
</script>
