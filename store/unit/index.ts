import { GetterTree, ActionTree, MutationTree } from 'vuex'

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
  units2: [] as Unit[],
  units3: [] as Unit[],
  units4: [] as Unit[],
  unit: {} as Unit,
  meta: {} as Meta,
  meta2: {} as Meta,
  meta3: {} as Meta,
  meta4: {} as Meta,
  defaultPayload: {} as RequestPayload,
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
  unit: state => state.unit,
  meta: state => state.meta,
}

/*
 * ----------------------------------------------------------------
 * Mutations
 * ----------------------------------------------------------------
 *
 */

export const mutations: MutationTree<RootState> = {
  // SET_UNITS: (state, units: Unit[]) => (state.units = units),
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

  SET_UNIT: (state, unit: Unit) => (state.unit = unit),
  SET_META: (state, meta: Meta) => (state.meta = meta),

  SET_UNITS2: (state, units: Unit[]) => (state.units2 = units),
  SET_META2: (state, meta: Meta) => (state.meta2 = meta),

  SET_UNITS3: (state, units: Unit[]) => (state.units3 = units),
  APPEND_UNITS3: (state, units: Unit[]) => (state.units3 = state.units3.concat(units)),
  SET_META3: (state, meta: Meta) => (state.meta3 = meta),

  SET_UNITS4: (state, units: Unit[]) => (state.units4 = units),
  APPEND_UNITS4: (state, units: Unit[]) => (state.units4 = state.units4.concat(units)),
  SET_META4: (state, meta: Meta) => (state.meta4 = meta),
}

/*
 * ----------------------------------------------------------------
 * Actions
 * ----------------------------------------------------------------
 *
 */
export const actions: ActionTree<RootState, RootState> = {
  async getUnits(
    { commit, rootState },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>> = {}
  ) {
    const unitsFilters =
      rootState.filter && rootState.filter.store && rootState.filter.store.units
        ? rootState.filter.store.units.filters
        : []

    const res = (await this.$axios.$get('/get-units', {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,
        // ...filters(payload.filters),
        ...filters(unitsFilters.concat(payload.filters ? payload.filters : [])),
      },
    })) as NetworkResponse<Unit[]>

    /* commit */
    commit('SET_UNITS', res.data)

    commit('SET_META', res.meta)
  },

  async getUnits2(
    { commit, rootState },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>> = {}
  ) {
    const unitsFilters =
      rootState.filter && rootState.filter.store && rootState.filter.store.units
        ? rootState.filter.store.units.filters
        : []

    const res = (await this.$axios.$get('/get-units', {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,
        // ...filters(payload.filters),
        ...filters(unitsFilters.concat(payload.filters ? payload.filters : [])),
      },
    })) as NetworkResponse<Unit[]>

    /* commit */
    commit('SET_UNITS2', res.data)
    commit('SET_META2', res.meta)
  },

  // fetch and store  data with infinity loadmore scenario 
  async getUnitsLoadMore(
    { commit, rootState },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>> = {}
  ) {
    const unitsFilters =
      rootState.filter && rootState.filter.store && rootState.filter.store.units
        ? rootState.filter.store.units.filters
        : []

    const res = (await this.$axios.$get('/get-units', {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,
        // ...filters(payload.filters),
        ...filters(unitsFilters.concat(payload.filters ? payload.filters : [])),
      },
    })) as NetworkResponse<Unit[]>

    /* commit */
    if (payload.page !== 1) {
      commit("APPEND_UNITS3", res.data);
    } else {
      commit("SET_UNITS3", res.data);
    }
    commit('SET_META3', res.meta)
  },

   // fetch and store data with infinity loadmore scenario 2
  async getUnitsLoadMore2(
    { commit, rootState },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>> = {}
  ) {
    const unitsFilters =
      rootState.filter && rootState.filter.store && rootState.filter.store.units
        ? rootState.filter.store.units.filters
        : []

    const res = (await this.$axios.$get('/get-units', {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,
        // ...filters(payload.filters),
        ...filters(unitsFilters.concat(payload.filters ? payload.filters : [])),
      },
    })) as NetworkResponse<Unit[]>

    /* commit */
    if (payload.page !== 1) {
      commit("APPEND_UNITS4", res.data);
    } else {
      commit("SET_UNITS4", res.data);
    }
    commit('SET_META4', res.meta)
  },

 


  async getUnit(
    { commit },
    payload: Partial<RequestPayload<UnitAllowedInclude[]>>
  ) {
    const res = (await this.$axios.$get(`/units/` + payload.slug, {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,

        ...filters(payload.filters),
      },
    })) as NetworkResponse<Unit>

    /* commit */
    commit('SET_UNIT', res.data)
    return res
  },
}
