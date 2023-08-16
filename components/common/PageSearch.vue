<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 flex items-center pointer-events-none left-4"
    >
      <IconsSearchIcon />
    </div>
    <input
      v-model="search"
      type="search"
      class="block lg:w-[250px] w-full p-3 text-xs font-normal bg-white border rounded-lg outline-none pl-9 h-11 placeholder:text-icon-header border-border-list text-slate-600 focus:border-text-green"
      :placeholder="placeholder"
    />
  </div>
  <!-- @input="typingSearch(search)" -->
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Search ...',
    },
    searchWith: {
      type: String,
      default: 'name',
    },
    url: {
      type: String,
      default: '',
    },
    storePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      search: '',
      awaitingSearch: false,
    }
  },
  watch: {
    search() {
      this.$store.commit('CHANGE_LOADING', true)

      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.searchServer()
          this.awaitingSearch = false
          this.$store.commit('CHANGE_LOADING', false)
        }, 1000) // 1 sec delay
      }
      this.awaitingSearch = true
    },
  },
  methods: {
    searchServer() {
      this.$store.dispatch(`${this.storePath}`, {
        filters: [{ key: this.searchWith, value: this.search }],
      } as RequestPayload)
    },
  },
})
</script>
