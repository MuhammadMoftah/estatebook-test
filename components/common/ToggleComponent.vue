<template>
  <nav
    class="fixed inset-x-0 z-10 flex items-center justify-center ml-auto mr-auto w-80 lg:bottom-10 bottom-[70px]"
  >
    <button
      :class="
        display === 'list' ? 'bg-text-green text-white' : 'bg-white text-black'
      "
      class="flex items-center justify-center gap-1 text-sm font-normal capitalize duration-300 border rtl:border-l-0 ltr:border-r-0 ltr:rounded-l-lg rtl:rounded-r-lg border-border-list w-28 h-14 group hover:bg-text-green hover:border-text-green hover:text-white"
      @click="$store.commit('CHANGE_DISPLAY', 'list')"
    >
      <IconsListIcon
        :class="display === 'list' ? 'fill-white' : 'fill-icon-header'"
        class="duration-300 fill-icon-header group-hover:fill-white"
      />
      {{ $t('list') }}
    </button>

    <button
      :class="
        display === 'grid' ? 'bg-text-green text-white' : 'text-black bg-white '
      "
      class="items-center justify-center hidden gap-1 text-sm font-normal capitalize duration-300 border lg:flex border-border-list w-28 h-14 group hover:bg-text-green hover:border-text-green hover:text-white"
      @click="$store.commit('CHANGE_DISPLAY', 'grid')"
    >
      <IconsGridIcon
        :class="display === 'grid' ? 'fill-white' : 'fill-icon-header'"
        class="duration-300 group-hover:fill-white"
      />

      {{ $t('grid') }}
    </button>

    <button
      :class="
        display === 'map' ? 'bg-text-green text-white' : 'text-black bg-white'
      "
      class="flex items-center justify-center gap-1 text-sm font-normal capitalize duration-300 border rtl:border-r-0 ltr:border-l-0 ltr:rounded-r-lg rtl:rounded-l-lg border-border-list w-28 h-14 group hover:bg-text-green hover:border-text-green hover:text-white"
      @click="$store.commit('CHANGE_DISPLAY', 'map')"
    >
      <IconsMapIcon
        :class="display === 'map' ? 'fill-white' : 'fill-icon-header'"
        class="duration-300 fill-icon-header group-hover:fill-white"
      />

      {{ $t('map') }}
    </button>
  </nav>
</template>
<script>
export default {
  computed: {
    display() {
      return this.$store.state.display
    },
  },
  mounted() {
    if (document.documentElement.clientWidth < 1280) {
      setTimeout(() => {
        this.$store.commit('CHANGE_DISPLAY', 'list')
      }, 500)
    }
  },
}
</script>
