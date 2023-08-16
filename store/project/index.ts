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
  projects: [] as Project[],
  project: {} as Project,
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
  projects: state => state.projects,
  project: state => state.project,
  meta: state => state.meta,
}

/*
 * ----------------------------------------------------------------
 * Mutations
 * ----------------------------------------------------------------
 *
 */

export const mutations: MutationTree<RootState> = {
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
  // SET_PROJECTS: (state, projects: Project[]) => (state.projects = projects),
  SET_PROJECT: (state, project: Project) => (state.project = project),
  SET_META: (state, meta: Meta) => (state.meta = meta),
}

/*
 * ----------------------------------------------------------------
 * Actions
 * ----------------------------------------------------------------
 *
 */
export const actions: ActionTree<RootState, RootState> = {
  async getProjects(
    { commit, rootState },
    payload: Partial<RequestPayload<ProjectAllowedInclude[]>> = {}
  ) {
    // const queryFilter = $nuxt.$auth.$storage.getLocalStorage('filterQuery')
    // const rangeFilter = $nuxt.$auth.$storage.getLocalStorage('rangeFilter')

    // const res = (await this.$axios.post(
    //   `/get-projects-by-unit-meilisearch-criteria`,
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
    // commit('SET_PROJECTS', res.data.data)
    // commit('SET_META', res.meta)

    const res = (await this.$axios.$get('/get-projects', {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        ...filters(payload.filters),
      },
    })) as NetworkResponse<Project[]>

    /* commit */
    commit('SET_PROJECTS', res.data)
    commit('SET_META', res.meta)

    return res
  },

  async getProject(
    { commit },
    payload: Partial<RequestPayload<ProjectAllowedInclude[]>>
  ) {
    const res = (await this.$axios.$get('/projects/' + payload.slug, {
      params: {
        include: payload.include?.join(','),
        page: payload?.page,
        per_page: payload?.per_page,
        ...filters(payload.filters),
      },
    })) as NetworkResponse<Project>

    /* commit */
    commit('SET_PROJECT', res.data)
    return res
  },
}
