import { GetterTree, ActionTree, MutationTree } from 'vuex'
declare let $nuxt: any

const filters = (filters: NetworkFilter[] = []) => {
  return filters
    ?.map(f => ({ [`filter[${f.key}]`]: f.value }))
    .reduce((o, f) => (o = { ...o, ...f }), {})
}

/*
 * ----------------------------------------------------------------
 * State
 * ----------------------------------------------------------------
 *
 */

export const state = () => ({
  items: [],
  item: {},
  meta: {} as Meta,
  units: [],
  projects: [],
  neighborhoods: [],
  defaultPayload: {} as RequestPayload,
  milliSearch_api_key: process.env.API_KEY,
  mapCenter: { lat: 0, lng: 0 },
  url: 'units',
})

/*
 * ----------------------------------------------------------------
 * Getters
 * ----------------------------------------------------------------
 *
 */
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  items: state => state.items,
  item: state => state.item,
  meta: state => state.meta,
}

/*
 * ----------------------------------------------------------------
 * Mutations
 * ----------------------------------------------------------------
 *
 */

export const mutations: MutationTree<RootState> = {
  SET_ITEMS: (state, items: []) => (state.items = items),
  // SET_UNITS: (state, items: []) => (state.units = items),
  SET_UNITS(state, units: Unit[]) {
    const localStorageUnits = this.state.wishlist.localStorageUnits
      ? this.state.wishlist.localStorageUnits
      : []
    units.map(unit => {
      if (localStorageUnits.includes(unit.id)) {
        unit.favorite = true
      }
      return unit
    })

    state.units = [...units]
  },
  // SET_PROJECTS: (state, items: []) => (state.projects = items),
  SET_PROJECTS(state, projects: Project[]) {
    const localStorageUnits = this.state.wishlist.localStorageProjects
      ? this.state.wishlist.localStorageProjects
      : []
    projects.map(project => {
      if (localStorageUnits.includes(project.id)) {
        project.favorite = true
      }
      return project
    })

    state.projects = [...projects]
  },
  SET_NEIGHBORHOODS: (state, items: []) => (state.neighborhoods = items),
  SET_ITEM: (state, item: {}) => (state.item = item),
  SET_META: (state, meta: Meta) => (state.meta = meta),
  SET_MAP_CENTER(state, mapCenter) {
    state.mapCenter = mapCenter
  },
  SET_URL(state, url) {
    state.url = url
  },
}

/*
 * ----------------------------------------------------------------
 * Actions
 * ----------------------------------------------------------------
 *
 */

export const actions: ActionTree<RootState, RootState> = {
  async getItems(
    { commit, state, rootState },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>>
  ) {
    switch (rootState.discoverTab) {
      case 'units': {
        commit('SET_UNITS', [])
        commit('SET_URL', 'search')
        break
      }
      case 'projects': {
        commit('SET_PROJECTS', [])

        commit(
          'SET_URL',
          'get-projects-by-unit-meilisearch-criteria?include=children,developer,amenities,location,unitTypes'
        )
        break
      }
      case 'neighborhoods': {
        commit('SET_NEIGHBORHOODS', [])

        commit(
          'SET_URL',
          'get-neighbourhood-by-unit-meilisearch-criteria?include=projects'
        )
        break
      }
    }

    const queryFilter = $nuxt.$auth.$storage.getLocalStorage('filterQuery')
    const rangeFilter = $nuxt.$auth.$storage.getLocalStorage('rangeFilter')

    let form = {
      q: queryFilter,
      filters: rangeFilter,
      page: payload.page,
      platform: 'web',
    }

    if (payload?.bounds && Object.keys(payload?.bounds).length) {
      form.lat1 = payload.bounds['northEast'][0]
      form.lng1 = payload.bounds['northEast'][1]
      form.lat2 = payload.bounds['southWest'][0]
      form.lng2 = payload.bounds['southWest'][1]
    }

    const res = (await this.$axios.post(`${state.url}`, form, {
      headers: {
        Authorization: `Bearer ${rootState.search.milliSearch_api_key}`,
      },
    })) as NetworkResponse<Unit[]>

    /* commit */

    if (res && res.data) {
      switch (rootState.discoverTab) {
        case 'units': {
          commit('SET_UNITS', res.data.data)
          commit('SET_META', res.data.meta)
          break
        }
        case 'projects': {
          commit('SET_PROJECTS', res.data.data)
          // commit('SET_META', res.data.meta)
          break
        }
        case 'neighborhoods': {
          commit('SET_NEIGHBORHOODS', res.data.data)
          // commit('SET_META', res.data.meta)
          break
        }
      }
    }
  },
  async getUnits(
    { commit, state, rootState },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>>
  ) {
    // const queryFilter = $nuxt.$auth.$storage.getLocalStorage('filterQuery')
    // const rangeFilter = $nuxt.$auth.$storage.getLocalStorage('rangeFilter')

    const queryFilter = this.$cookies
      .get('filterQuery')
      .replaceAll('undefined', '')
    const rangeFilter = this.$cookies.get('rangeFilter')

    const form = {
      q: queryFilter,
      filters: rangeFilter,
      page: payload.page,
      platform: 'web',
    }

    if (payload?.bounds && Object.keys(payload?.bounds).length) {
      form.lat1 = payload.bounds['northEast'][0]
      form.lng1 = payload.bounds['northEast'][1]
      form.lat2 = payload.bounds['southWest'][0]
      form.lng2 = payload.bounds['southWest'][1]
    }

    const res = (await this.$axios.post(`/search`, form)) as NetworkResponse<
      Unit[]
    >

    /* commit */
    if (res && res.data) {
      commit('SET_UNITS', res.data.data)
      commit('SET_META', res.data.meta)
    }
  },
  async getProjects(
    { commit, state, rootState },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>>
  ) {
    const queryFilter = this.$cookies.get('filterQuery')
    const rangeFilter = this.$cookies.get('rangeFilter')

    const form = {
      q: queryFilter,
      filters: rangeFilter,
      page: payload.page,
      platform: 'web',
    }

    if (payload?.bounds && Object.keys(payload?.bounds).length) {
      form.lat1 = payload.bounds['northEast'][0]
      form.lng1 = payload.bounds['northEast'][1]
      form.lat2 = payload.bounds['southWest'][0]
      form.lng2 = payload.bounds['southWest'][1]
    }

    const res = (await this.$axios.post(
      `/get-projects-by-unit-meilisearch-criteria?include=children,developer,amenities,location,unitTypes`,
      form
    )) as NetworkResponse<Unit[]>

    /* commit */
    if (res && res.data) {
      commit('SET_PROJECTS', res.data.data)
      // commit('SET_META', res.data.meta)
    }
  },
  async getNeighborhoods(
    { commit, state, rootState },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>>
  ) {
    const queryFilter = this.$cookies.get('filterQuery')
    const rangeFilter = this.$cookies.get('rangeFilter')

    const form = {
      q: queryFilter.replaceAll('undefined', ' '),
      filters: rangeFilter,
      page: payload.page,
      platform: 'web',
    }

    if (payload?.bounds && Object.keys(payload?.bounds).length) {
      form.lat1 = payload.bounds['northEast'][0]
      form.lng1 = payload.bounds['northEast'][1]
      form.lat2 = payload.bounds['southWest'][0]
      form.lng2 = payload.bounds['southWest'][1]
    }

    const res = (await this.$axios.post(
      `/get-neighbourhood-by-unit-meilisearch-criteria?include=projects`,
      form
    )) as NetworkResponse<Unit[]>

    /* commit */
    if (res && res.data) {
      commit('SET_NEIGHBORHOODS', res.data.data)
    }
  },
}
