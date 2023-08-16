<template>
  <div class="flex items-center justify-between">
    <h2
      class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
    >
      {{ title }}
    </h2>
    <div class="flex gap-4">
      <!-- <CommonPageSearch
        :placeholder="placeholder"
        :url="url"
        :store-path="storePath"
        :search-with="searchWith"
      /> -->
      <div v-if="enableSearch" class="relative">
        <div
          class="absolute inset-y-0 flex items-center pointer-events-none left-3"
        >
          <IconsSearchIcon class="w-4 h-4 text-icon-header" />
        </div>
        <input
          v-model="search"
          type="search"
          class="block lg:w-[250px] w-full p-3 text-xs font-normal bg-white border rounded-lg outline-none pl-9 h-11 placeholder:text-icon-header border-border-list focus:border-text-green"
          :placeholder="placeholder"
        />
      </div>
      <!-- @searchTypingDone="searchDone($event)" -->
      <CommonPageSort
        v-if="enableSort"
        :sort-types="sortTypes"
        @sortSelected="sortSelected($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Search ...',
    },
    url: {
      type: String,
      required: false,
    },
    searchWith: {
      type: String,
      default: 'name',
    },
    storePath: {
      type: String,
      default: '',
    },
    enableSearch: {
      type: Boolean,
      default: true,
    },
    enableSort: {
      type: Boolean,
      default: true,
    },
    sortTypes: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      search: '',
      awaitingSearch: false,
      sort: {} as any,
      timeOut: null as any,
    }
  },
  watch: {
    search() {
      if (this.search.length > 2) {
        this.searchServer()
      } else if (this.search.length === 0) {
        this.$store.dispatch(`${this.storePath}`, {
          sort: this.sort.value,
        } as RequestPayload)
      }
    },
  },
  methods: {
    searchServer() {
      this.$store.commit('CHANGE_LOADING', true)
      if (!this.awaitingSearch) {
        if (this.timeOut) {
          clearTimeout(this.timeOut)
        }
        this.timeOut = setTimeout(() => {
          this.$store.dispatch(`${this.storePath}`, {
            sort: this.sort.value,
            filters: [{ key: this.searchWith, value: this.search }],
          } as RequestPayload)
          this.awaitingSearch = false
          this.$store.commit('CHANGE_LOADING', false)
        }, 1000) // 1 sec delay
      }
      this.awaitingSearch = true
    },
    sortSelected(e: any) {
      this.sort = e
      this.searchServer()
    },
  },
})
</script>
