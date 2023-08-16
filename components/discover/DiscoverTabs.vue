<template>
  <div class="flex overflow-hidden rounded-md bg-slate-100 w-fit">
    <button
      class="tab-style"
      :class="
        discoverTab == 'neighborhoods' ? 'text-white bg-theme' : 'text-black '
      "
      @click="$store.commit('discoverTab', 'neighborhoods')"
    >
      {{ $t('neighborhoods') }}
    </button>
    <button
      class="tab-style"
      :class="
        discoverTab == 'projects' ? 'text-white bg-[#F0BC3C]' : 'text-black '
      "
      @click="setTab('projects')"
    >
      {{ $t('projects') }}
    </button>
    <button
      class="tab-style"
      :class="discoverTab == 'units' ? 'text-white bg-[#7DAFFF]' : 'text-black'"
      @click="setTab('units')"
    >
      {{ $t('units') }}
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    discoverTab() {
      return this.$store.state.discoverTab
    },
  },

  methods: {
    async setTab(value) {
      await this.$router.push(this.localePath('/discover'), {
        query: { page: 1 },
      })
      this.$store.commit('discoverTab', value)
    },
  },
}
</script>

<style scoped>
.tab-style {
  @apply capitalize duration-200 text-xs hover:opacity-90 p-3;
}
</style>
