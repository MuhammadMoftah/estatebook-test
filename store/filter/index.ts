// if filters combined when hit search button
// if specific filters are updated according to new values
// set locale storage filters when hit search button
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Cookies from 'js-cookie'
declare let $nuxt: any

export const state = () => ({
  store: {
    units: {
      filters: [],
    },
    projects: {
      filters: [],
    },
    neighborhoods: {
      filters: [],
    },
    search: {
      filters: [],
    },
  },
  filters: {},
  rangeFilter: [],
  filtersQuery: '',
  filter: [],
  searchType: 'buy',
  selectedFilters: [],
  reset: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  store: state => state.store,
}

export const mutations: MutationTree<RootState> = {
  APPLY(state) {
    const rangedFilter = state.selectedFilters
      .filter(
        item => item.range && item.value.every(i => i) && item.value.length
      )
      .map(item => item.q)

    const queryFilter = state.selectedFilters
      .filter(item => !item.range)
      .map(({ _, value }) => value.join(' '))
      .join(' ')

    state.filtersQuery = queryFilter
    state.rangeFilter = rangedFilter

    $nuxt.$auth.$storage.setLocalStorage(
      'selectedFilters',
      state.selectedFilters
    )
    $nuxt.$auth.$storage.setLocalStorage('filterQuery', state.filtersQuery)
    $nuxt.$auth.$storage.setLocalStorage(
      'rangeFilter',
      state.rangeFilter.flat(2)
    )

    // set on cookies
    Cookies.set('selectedFilters', JSON.stringify(state.selectedFilters), {
      expires: 7,
    })
    Cookies.set('filterQuery', JSON.stringify(state.filterQuery), {
      expires: 7,
    })
    Cookies.set('rangeFilter', JSON.stringify(state.rangeFilter.flat(2)), {
      expires: 7,
    })
  },
  ADD_SELECTED_FILTERS(state, payload) {
    const i = state.selectedFilters.findIndex(item => item.key === payload.key)
    if (i !== -1) {
      state.selectedFilters.splice(i, 1, payload)
    } else {
      state.selectedFilters.push(payload)
    }

    state.selectedFilters = state.selectedFilters.filter(
      item => item.value.every(i => i) && item.value.length
    )
    $nuxt?.$store?.commit('filter/APPLY')
  },
  INIT(state) {
    const selectedFilters = $nuxt.$auth.$storage
      .getLocalStorage('selectedFilters')
      ?.filter(item => item.value.every(i => i))

    const queryFilter = $nuxt.$auth.$storage.getLocalStorage('filterQuery')
    const rangeFilter = $nuxt.$auth.$storage.getLocalStorage('rangeFilter')

    if (selectedFilters) {
      state.selectedFilters = selectedFilters
    }
    if (queryFilter) {
      state.filtersQuery = queryFilter
    }
    if (rangeFilter) {
      state.rangeFilter = rangeFilter
    }
  },
  INIT_BEFORE_SEND(state, payload) {
    state.filter = payload
  },

  REMOVE_SELECTED_FILTERS(state, key) {
    const idx = state.selectedFilters.findIndex(item => item.key === key)
    if (idx >= 0) {
      state.selectedFilters.splice(idx, 1)
      delete state.filters[key]
    }

    $nuxt.$store.commit('filter/APPLY')
  },
  CLEAR(state, payload) {
    state.store[payload.path].filters = []
    $nuxt.$auth.$storage.setLocalStorage('filters', state.store)
  },
  CLEAR_ALL(state) {
    state.store = {}
    $nuxt.$auth.$storage.setLocalStorage('filters', state.store)
  },
  CLEAR_STATE(state, payload) {
    state.store[payload.path]?.filters = []
    state.filters = []
  },
  UPDATE(state, payload) {
    const index = state.store[payload.path]?.filters?.findIndex(
      el => el.key === payload.filter.key
    )
    if (index > -1) {
      state.store[payload.path]?.filters[index] = payload.filter
    }
  },
  RESET(state, payload) {
    state.selectedFilters = []
    $nuxt.$store.commit('filter/APPLY')
    state.reset = true
  },
  searchType(state, payload) {
    state.searchType = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  // setCookieFilters({ commit, app }, payload) {
  //   app.$cookies.set('your_cookie_name', payload, { expires: 7 }) // Expires after 7 days

  //   // You can also commit a mutation to update the store state if necessary.
  //   commit('SET_COOKIE', payload)
  // },
  setStore({ commit }, payload) {
    commit('SET_STORE', payload)
  },
  init({ commit }) {
    commit('INIT')
  },
  clear({ commit }, payload) {
    commit('CLEAR', payload)
  },
  clearAll({ commit }) {
    commit('CLEAR_ALL')
  },
  clearState({ commit }, payload) {
    commit('CLEAR_STATE', payload)
  },
  update({ commit }, payload) {
    commit('UPDATE', payload)
  },
}
