import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  things: [] as string[],
  name: 'Me',
  loading: false,
  buttonLoader: false,
  modal: '',
  display: 'grid',
  mobileNav: false,
  innerFilters: false,
  discoverTab: 'units',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: state => state.name,
}

export const mutations: MutationTree<RootState> = {
  CLOSE_NAV: (state, value: Boolean) => (state.mobileNav = false),
  OPEN_NAV: (state, value: Boolean) => (state.mobileNav = true),
  TOGGLE_NAV: (state, value: Boolean) => (state.mobileNav = !state.mobileNav),
  CHANGE_LOADING: (state, loading: boolean) => (state.loading = loading),
  CHANGE_BUTTON_LOADING: (state, buttonLoader: boolean) =>
    (state.buttonLoader = buttonLoader),
  SET_MODAL: (state, modal: string) => (state.modal = modal),
  CHANGE_DISPLAY: (state, display: string) => (state.display = display),
  innerFilters: (state, payload: boolean) => (state.innerFilters = payload),
  discoverTab: (state, payload: string) => (state.discoverTab = payload),
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchThings({ commit }) {
    const things = await this.$axios.$get('/things')
    commit('CHANGE_NAME', 'New name')
  },
}
