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
  blogs: [] as Blog[],
  blog: {} as Blog,
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
  blogs: state => state.blogs,
  blog: state => state.blog,
  meta: state => state.meta,
}

/*
 * ----------------------------------------------------------------
 * Mutations
 * ----------------------------------------------------------------
 *
 */

export const mutations: MutationTree<RootState> = {
  SET_BLOGS: (state, blogs: Blog[]) => (state.blogs = blogs),
  SET_BLOG: (state, blog: Blog) => (state.blog = blog),
  SET_META: (state, meta: Meta) => (state.meta = meta),
}

/*
 * ----------------------------------------------------------------
 * Actions
 * ----------------------------------------------------------------
 *
 */
export const actions: ActionTree<RootState, RootState> = {
  async getBlogs(
    { commit },
    payload: Partial<RequestPayload<BlogAllowedInclude[]>> = {}
  ) {
    const res = (await this.$axios.$get('/get-blogs', {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,
        ...filters(payload.filters),
      },
    })) as NetworkResponse<Blog[]>

    /* commit */
    commit('SET_BLOGS', res.data)
    commit('SET_META', res.meta)
  },

  async getBlog(
    { commit },
    payload: Partial<RequestPayload<BlogAllowedInclude[]>>
  ) {
    const res = (await this.$axios.$get('/blogs/' + payload.slug, {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        sort: payload?.sort,
        ...filters(payload.filters),
      },
    })) as NetworkResponse<Blog>

    /* commit */
    commit('SET_BLOG', res.data)
    return res
  },
}
