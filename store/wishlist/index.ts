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
  units: [] as Unit[],
  projects: [] as Project[],
  unitsMeta: {} as Meta,
  projectsMeta: {} as Meta,
  defaultPayload: {} as RequestPayload,
  items_count: 0 as number,
  favourite_type: 'units',
  localStorageUnits: [],
  localStorageProjects: [],
})

/*
 * ----------------------------------------------------------------
 * Getters
 * ----------------------------------------------------------------
 *
 */
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  units: state => state.units,
  projects: state => state.projects,
  unitsMeta: state => state.unitsMeta,
  projectsMeta: state => state.projectsMeta,
}

/*
 * ----------------------------------------------------------------
 * Mutations
 * ----------------------------------------------------------------
 *
 */

export const mutations: MutationTree<RootState> = {
  SET_UNITS(state, units: Unit[]) {
    if (state.localStorageUnits && state.localStorageUnits.length) {
      const localStorageUnits = state.localStorageUnits
      units.map(unit => {
        if (localStorageUnits.includes(unit.id)) {
          unit.favorite = true
        }
        return unit
      })
    }

    state.units = units && units.length ? units : []
  },
  SET_PROJECTS(state, projects: Project[]) {
    if (state.localStorageProjects && state.localStorageProjects.length) {
      const localStorageProjects = state.localStorageProjects
      projects.map(project => {
        if (localStorageProjects.includes(project.id)) {
          project.favorite = true
        }
        return project
      })
    }

    state.projects = projects && projects.length ? projects : []
  },

  INIT_UNITS_FROM_LOCALSTORAGE(state) {
    state.localStorageUnits = $nuxt.$auth.$storage.getLocalStorage(
      'favourite_units_ids'
    )
  },
  INIT_PROJECTS_FROM_LOCALSTORAGE(state) {
    state.localStorageProjects = $nuxt.$auth.$storage.getLocalStorage(
      'favourite_projects_ids'
    )
  },
  SET_UNITS_IDS_LOCALSTORAGE(state, payload) {
    if (payload) {
      const FAVOURITE_IDS = $nuxt.$auth.$storage.getLocalStorage(
        'favourite_units_ids'
      )
        ? $nuxt.$auth.$storage.getLocalStorage('favourite_units_ids')
        : []
      if (!FAVOURITE_IDS.includes(payload.id)) {
        FAVOURITE_IDS.push(payload.id)
      } else {
        const i = FAVOURITE_IDS.findIndex(p => p === payload.id)
        FAVOURITE_IDS.splice(i, 1)
      }
      $nuxt.$auth.$storage.setLocalStorage('favourite_units_ids', FAVOURITE_IDS)
      state.localStorageUnits = FAVOURITE_IDS
      this.dispatch('wishlist/GET_UNITS_FROM_LOCALSTORAGE').then(res => {
        res.data = this.commit('wishlist/SET_UNITS', res.data)
      })
    }
  },
  SET_PROJECTS_IDS_LOCALSTORAGE(state, payload) {
    if (payload) {
      const FAVOURITE_IDS = $nuxt.$auth.$storage.getLocalStorage(
        'favourite_projects_ids'
      )
        ? $nuxt.$auth.$storage.getLocalStorage('favourite_projects_ids')
        : []
      if (!FAVOURITE_IDS.includes(payload.id)) {
        FAVOURITE_IDS.push(payload.id)
      } else {
        const i = FAVOURITE_IDS.findIndex(p => p === payload.id)
        FAVOURITE_IDS.splice(i, 1)
      }
      $nuxt.$auth.$storage.setLocalStorage(
        'favourite_projects_ids',
        FAVOURITE_IDS
      )
      state.localStorageProjects = FAVOURITE_IDS
      this.dispatch('wishlist/GET_PROJECTS_FROM_LOCALSTORAGE').then(res => {
        res.data = this.commit('wishlist/SET_PROJECTS', res.data)
        // ? this.commit('wishlist/SET_PROJECTS', res.data)
        // : this.commit('wishlist/SET_PROJECTS', [])
      })
    }
  },

  SET_UNITS_META: (state, meta: Meta) => (state.unitsMeta = meta),
  SET_PROJECTS_META: (state, meta: Meta) => (state.projectsMeta = meta),
  SET_UNITS_LOCALSTORAGE(state, items: Unit[]) {
    state.units = items
    $nuxt.$auth.$storage.setLocalStorage('favourite_units_ids', state.units)
  },
  SET_PROJECTS_LOCALSTORAGE(state, items: Project[]) {
    state.projects = items
    $nuxt.$auth.$storage.setLocalStorage(
      'favourite_projects_ids',
      state.projects
    )
  },
}

/*
 * ----------------------------------------------------------------
 * Actions
 * ----------------------------------------------------------------
 *
 */
export const actions: ActionTree<RootState, RootState> = {
  async GET_UNITS(
    { commit, state, rootState, dispatch },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>> = {}
  ) {
    let res = []

    if (!$nuxt.$auth.loggedIn) {
      res = await dispatch('GET_UNITS_FROM_LOCALSTORAGE')
    } else {
      res = await this.$axios.$get('/my_fav_units', {
        params: {
          include: payload.include?.join(','),
          page: payload?.page,
          per_page: payload?.per_page,
          sort: payload?.sort,
          ...filters(payload.filters),
        },
      })
    }
    /* commit */
    commit('SET_UNITS', res.data)
    commit('SET_UNITS_META', res.meta)
  },
  async GET_PROJECTS(
    { commit, state, rootState, dispatch },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>> = {}
  ) {
    let res = []

    if (!$nuxt.$auth.loggedIn) {
      res = await dispatch('GET_PROJECTS_FROM_LOCALSTORAGE')
    } else {
      res = await this.$axios.$get('/my_fav_projects', {
        params: {
          include: payload.include?.join(','),
          page: payload?.page,
          per_page: payload?.per_page,
          sort: payload?.sort,
          ...filters(payload.filters),
        },
      })
    }
    /* commit */
    commit('SET_PROJECTS', res.data)
    commit('SET_PROJECTS_META', res.meta)
  },

  async GET_UNITS_FROM_LOCALSTORAGE(
    { commit, rootState, state },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>> = {}
  ) {
    if (state.localStorageUnits && state.localStorageUnits.length) {
      const includes = [
        'developer',
        'unitType',
        'city',
        'state',
        'project',
        'agent',
        'agent.company',
        'amenities',
        'amenitiesCount',
      ]
      const res = await this.$axios.$get('/units', {
        params: {
          include: includes?.join(','),
          'filter[id]': state.localStorageUnits?.join(','),
        },
      })

      return res
    } else {
      return []
    }
  },
  async GET_PROJECTS_FROM_LOCALSTORAGE(
    { commit, rootState, state },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>> = {}
  ) {
    if (state.localStorageProjects && state.localStorageProjects.length) {
      const includes = ['developer', 'developerCount']
      const res = await this.$axios.$get('/projects', {
        params: {
          include: includes?.join(','),
          'filter[id]': state.localStorageProjects?.join(','),
        },
      })

      return res
    } else {
      return []
    }
  },
}
