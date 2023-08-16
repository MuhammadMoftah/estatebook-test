<template>
  <section
    class="fixed inset-0 z-[1100] overflow-y-auto flex flex-col w-full h-full max-h-screen min-h-screen gap-4 p-5 bg-white px-2"
  >
    <section class="flex justify-between">
      <IconsEstatebookLogo />
      <button
        class="absolute cursor-pointer ltr:right-4 rtl:left-4 top-4"
        @click="$store.commit('SET_MODAL', '')"
      >
        <IconsCrossIcon class="w-8 h-8 text-slate-400" />
      </button>
    </section>

    <section
      class="flex items-center py-3 mt-8 bg-white border border-gray-200 shadow rounded-xl shadow-slate-200"
    >
      <FiltersSearchBar
        ref="searchBar"
        class="flex-1 min-w-[33%] !max-w-none shrink-0"
        base-type="search_criteria"
        filter-type="name"
        placeholder="search_for_units"
        :allow-local-storage="true"
        @keydown.native="focusButton($event)"
      />
    </section>

    <!-- history  -->
    <section v-if="false">
      <div
        v-for="n in 5"
        :key="n"
        class="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-50"
      >
        <div class="flex items-center gap-x-4">
          <div
            class="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-gray-50"
          >
            <IconsHistoryIcon class="w-6 h-6 text-gray-300" />
          </div>
          <span class="flex-1 text-xs font-medium truncate">{{ n }} name </span>
        </div>
        <span
          class="text-xs font-medium rounded-[5px] border border-black px-2 py-1 bg-primary text-black self-end capitalize"
        >
          developer
        </span>
      </div>
    </section>

    <aside
      class="fixed bottom-0 left-0 grid w-full grid-cols-2 gap-2 px-3 py-3 bg-white"
    >
      <button
        type="button"
        class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-normal text-black border rounded-md cursor-pointer border-text-green"
        @click="resetAll(), (selectedAmenities = []), (type = 'commerical')"
      >
        <IconsResetIcon class="w-4 h-4 text-icon shrink-0" />
        {{ $t('reset_all') }}
      </button>
      <button
        id="submitSearchButton"
        ref="submitSearchButton"
        type="button"
        class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white capitalize border rounded-md cursor-pointer border-text-green bg-text-green"
        @click="submitFunctions()"
      >
        {{ $t('show_results') }}
      </button>
    </aside>
  </section>
</template>

<script>
import filters from '~/mixins/filters'
export default {
  mixins: [filters],
  data() {
    return {
      storedSearch: null,
      clearedStoredSearch: null,
    }
  },
  computed: {
    selectedFilters() {
      return [...this.$store.state.filter.selectedFilters]
    },
  },
  created() {
    this.storedSearch = this.$auth.$storage.getLocalStorage('storedSearch')
    if (this.storedSearch) {
      this.fillHistory()
    }
  },
  methods: {
    submitFunctions() {
      this.$nuxt.$emit('submitSearch')
      this.$auth.$storage.setLocalStorage('storedSearch', this.selectedFilters)
      this.showResult()
      this.submit()
      this.$router.push(this.localePath('/discover'))
    },
    fillHistory() {},
    focusButton(event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        setTimeout(() => {
          const element = document.getElementById('submitSearchButton')
          element.focus()
        }, 100)
      }
    },
  },
}
</script>
