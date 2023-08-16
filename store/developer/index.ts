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
  developers: [] as Developer[],
  developer: {} as Developer,
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
  developers: state => state.developers,
  developer: state => state.developer,
  meta: state => state.meta,
}

/*
 * ----------------------------------------------------------------
 * Mutations
 * ----------------------------------------------------------------
 *
 */

export const mutations: MutationTree<RootState> = {
  SER_DEVELOPERS: (state, developers: Developer[]) =>
    (state.developers = developers),
  SER_DEVELOPER: (state, developer: Developer) => (state.developer = developer),
  SET_META: (state, meta: Meta) => (state.meta = meta),
}

/*
 * ----------------------------------------------------------------
 * Actions
 * ----------------------------------------------------------------
 *
 */
export const actions: ActionTree<RootState, RootState> = {
  async getDevelopers(
    { commit },
    payload: Partial<RequestPayload<DeveloperAllowedInclude[]>> = {}
  ) {
    const res = (await this.$axios.$get('/get-developers', {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,
        ...filters(payload.filters),
      },
    })) as NetworkResponse<Developer[]>

    /* commit */
    commit('SER_DEVELOPERS', res.data)
    commit('SET_META', res.meta)
  },

  async getDeveloper(
    { commit },
    payload: Partial<RequestPayload<DeveloperAllowedInclude[]>>
  ) {
    const res = (await this.$axios.$get('/developers/' + payload.slug, {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,

        ...filters(payload.filters),
      },
    })) as NetworkResponse<Developer>

    /* commit */
    commit('SER_DEVELOPER', res.data)
  },
}
