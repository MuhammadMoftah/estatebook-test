import { GetterTree, ActionTree, MutationTree } from 'vuex'
declare let $nuxt: any

export const state = () => ({
  items: [] as Unit[] | Project[],
  items_count: 0 as number,
  compare_type: 'units',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  items: state => state.items,
}

export const mutations: MutationTree<RootState> = {
  SET_LOCALESOTRAGE_ITEMS(state, items: Unit[] | Project[]) {
    state.items = items
    $nuxt.$auth.$storage.setLocalStorage('compare_ids', state.items)
  },
  SET_LOCALESTORAGE_ITEMS_COUNT(state, count: number) {
    state.items_count = count
    $nuxt.$auth.$storage.setLocalStorage('compare_ids_count', state.items_count)
  },
  SET_LOCALESTORAGE_COMPARE_TYPE(state, type: string) {
    state.compare_type = type
    $nuxt.$auth.$storage.setLocalStorage('compare_type', state.compare_type)
  },
  SET_ITEM(state, payload) {
    let itemIndex: number = -1
    if (state.compare_type !== payload.type && state.items.length > 0) {
      $nuxt.$toast.error(`You have to clear compared ${payload.type} first`)
      return
    }
    state.compare_type = payload.type
    state.items?.map((el, i) => {
      if (el.id === payload.item.id) {
        itemIndex = i
      }
      return el
    })

    if (itemIndex > -1) {
      state.items.splice(itemIndex, 1)
      state.items_count = state.items_count - 1
      state.items = state.items.filter(el => el)
      $nuxt.$auth.$storage.setLocalStorage('compare_ids', state.items)
      $nuxt.$auth.$storage.setLocalStorage(
        'compare_ids_count',
        state.items_count
      )
      $nuxt.$auth.$storage.setLocalStorage('compare_type', state.compare_type)
    } else {
      state.items_count = state.items_count + 1
      if (state.items_count < 5) {
        state.items.push(payload.item)
        $nuxt.$auth.$storage.setLocalStorage('compare_ids', state.items)
        $nuxt.$auth.$storage.setLocalStorage(
          'compare_ids_count',
          state.items_count
        )
        $nuxt.$auth.$storage.setLocalStorage('compare_type', state.compare_type)
      } else {
        state.items_count = 4
        $nuxt.$toast.error(
          `You reached the maximum number of compare ${state.compare_type}`
        )
      }
    }
  },
  REMOVE_ITEM(state, item) {
    let itemIndex: number = -1
    state.items?.map((el, i) => {
      if (el.id === item.id) {
        itemIndex = i
      }
      return el
    })
    if (itemIndex > -1) {
      state.items.splice(itemIndex, 1)
      state.items_count = state.items_count - 1
      $nuxt.$auth.$storage.setLocalStorage('compare_ids', state.items)
      $nuxt.$auth.$storage.setLocalStorage(
        'compare_ids_count',
        state.items_count
      )
      $nuxt.$auth.$storage.setLocalStorage('compare_type', state.compare_type)
    }
  },
  CLEAR_ALL(state) {
    state.items = []
    state.items_count = 0
    $nuxt.$auth.$storage.setLocalStorage('compare_ids', state.items)
    $nuxt.$auth.$storage.setLocalStorage('compare_ids_count', state.items_count)
  },
  INIT(state) {
    state.items = $nuxt.$auth.$storage.getLocalStorage('compare_ids')
      ? $nuxt.$auth.$storage.getLocalStorage('compare_ids')
      : []
    state.items_count = $nuxt.$auth.$storage.getLocalStorage(
      'compare_ids_count'
    )
      ? $nuxt.$auth.$storage.getLocalStorage('compare_ids_count')
      : 0
    state.compare_type = $nuxt.$auth.$storage.getLocalStorage('compare_type')
      ? $nuxt.$auth.$storage.getLocalStorage('compare_type')
      : 'units'
  },
}

export const actions: ActionTree<RootState, RootState> = {
  setLocalStorageItems({ commit }, payload) {
    commit('SET_LOCALESOTRAGE_ITEMS', payload)
  },
  setLocalStorageItemsCount({ commit }, payload) {
    commit('SET_LOCALESTORAGE_ITEMS_COUNT', payload)
  },
  setLocalStorageCompareType({ commit }, payload) {
    commit('SET_LOCALESTORAGE_COMPARE_TYPE', payload)
  },
  setItem({ commit }, payload) {
    commit('SET_ITEM', payload)
  },
  removeItem({ commit }, payload) {
    commit('REMOVE_ITEM', payload)
  },
  clearAll({ commit }) {
    commit('CLEAR_ALL')
  },
  init({ commit }) {
    commit('INIT')
  },
}
