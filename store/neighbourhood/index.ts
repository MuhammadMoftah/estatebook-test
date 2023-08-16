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
  neighbourhoods: [] as Neighbourhood[],
  neighbourhood: {} as Neighbourhood,
  meta: {} as Meta,
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
  neighbourhoods: state => state.neighbourhoods,
  neighbourhood: state => state.neighbourhood,
  meta: state => state.meta,
}

/*
 * ----------------------------------------------------------------
 * Mutations
 * ----------------------------------------------------------------
 *
 */

export const mutations: MutationTree<RootState> = {
  SET_NEIGHBOURHOODS: (state, neighbourhoods: Neighbourhood[]) =>
    (state.neighbourhoods = neighbourhoods),
  SET_NEIGHBOURHOOD: (state, neighbourhood: Neighbourhood) =>
    (state.neighbourhood = neighbourhood),
  SET_META: (state, meta: Meta) => (state.meta = meta),
}

/*
 * ----------------------------------------------------------------
 * Actions
 * ----------------------------------------------------------------
 *
 */
export const actions: ActionTree<RootState, RootState> = {
  async getNeighbourhoods(
    { commit, rootState },
    payload: Partial<RequestPayload<NeighbourhoodAllowedInclude[]>> = {}
  ) {
    // const res = (await this.$axios.$get('/get-locations', {
    //   params: {
    //     include: payload.include?.join(','),
    //     page: payload?.page,
    //     per_page: payload?.per_page,
    //     sort: payload?.sort,
    //     ...filters(payload.filters),
    //   },
    // })) as NetworkResponse<Neighbourhood[]>

    // const queryFilter = $nuxt.$auth.$storage.getLocalStorage('filterQuery')
    // const rangeFilter = $nuxt.$auth.$storage.getLocalStorage('rangeFilter')

    // const res = (await this.$axios.post(
    //   `/get-neighbourhood-by-unit-meilisearch-criteria`,
    //   {
    //     q: queryFilter,
    //     filters: rangeFilter,
    //     page: payload.page,
    //     // lat: state.mapCenter.lat,
    //     // lng: state.mapCenter.lng,
    //     platform: 'web',
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${rootState.search.milliSearch_api_key}`,
    //     },
    //   }
    // )) as NetworkResponse<Unit[]>

    const res = (await this.$axios.get(`/get-locations`)) as NetworkResponse<
      Unit[]
    >

    /* commit */
    commit('SET_NEIGHBOURHOODS', (res.data as any).data)
    commit('SET_META', res.meta)
  },

  async getNeighbourhood(
    { commit },
    payload: Partial<RequestPayload<NeighbourhoodAllowedInclude[]>>
  ) {
    const res = (await this.$axios.$get('/locations/' + payload.slug, {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,

        ...filters(payload.filters),
      },
    })) as NetworkResponse<Neighbourhood>

    /* commit */
    commit('SET_NEIGHBOURHOOD', res.data)
  },
}
