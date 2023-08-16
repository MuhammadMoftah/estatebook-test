import { GetterTree, ActionTree, MutationTree } from 'vuex'

/*
 * ----------------------------------------------------------------
 * State
 * ----------------------------------------------------------------
 *
 */

export const state = () => ({
  item: {},
})

/*
 * ----------------------------------------------------------------
 * Getters
 * ----------------------------------------------------------------
 *
 */
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  item: state => state.item,
}

/*
 * ----------------------------------------------------------------
 * Mutations
 * ----------------------------------------------------------------
 *
 */

export const mutations: MutationTree<RootState> = {
  SET_ITEM: (state, item) => (state.item = item),
}

/*
 * ----------------------------------------------------------------
 * Actions
 * ----------------------------------------------------------------
 *
 */
export const actions: ActionTree<RootState, RootState> = {
  // async getNeighbourhoods(
  //   { commit },
  //   payload: Partial<RequestPayload<NeighbourhoodAllowedInclude[]>> = {}
  // ) {
  //   const res = (await this.$axios.$get('/locations', {
  //     params: {
  //       include: payload.include?.join(','),
  //       page: payload?.page,
  //       per_page: payload?.per_page,
  //       sort: payload?.sort,
  //       ...filters(payload.filters),
  //     },
  //   })) as NetworkResponse<Neighbourhood[]>
  //   /* commit */
  //   commit('SET_NEIGHBOURHOODS', res.data)
  //   commit('SET_META', res.meta)
  // },
}
