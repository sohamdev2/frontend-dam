import { deepSearch } from '~/utils'
import { makeMutations } from '~/utils/helper'

const _state = () => ({
  dashboardData: null,
  folders: [],
  loading: {
    dashboard: true,
    folders: true,
  },
  logo: '',
})

export { _state as state }

export const mutations = {
  ...makeMutations(
    'dashboardData',
    'folders',
    'loading.dashboard',
    'loading.folders',
    'logo'
  ),

  setFolderItem(state, item) {
    // let temp = [...state.folders];
    if (!state.folders.length) return

    if (item.parent_id) {
      const parent = deepSearch(
        state.folders,
        'id',
        (_, id) => item.parent_id === id
      )

      if (!parent) return

      const folder = deepSearch(state.folders, 'id', (_, id) => item.id === id)

      if (folder) Object.assign(folder, item)
      else {
        if (!parent.sub_category_data) parent.sub_category_data = []
        const index = parent.sub_category_data.findIndex(
          ({ id }) => id === item.id
        )

        if (~index) parent.sub_category_data[index] = item
        else parent.sub_category_data.push(item)
      }
    } else {
      const folder = deepSearch(state.folders, 'id', (_, id) => item.id === id)

      if (!folder) return
      Object.assign(folder, item)
    }

    state.folders = [...state.folders]

    // if (parent) {
    //   const index = parent.sub_category_data.findIndex(
    //     ({ id }) => id == item.id
    //   );
    //   if (~index) parent.sub_category_data[index] = item;
    // } else {
    //   const index = temp.findIndex(({ id }) => id == item.id);
    //   if (~index) temp[index] = item;
    // }

    // state.folders = [...temp];
  },
  resetState(state) {
    Object.assign(state, _state())
  },
}

export const actions = {
  assignLogo({ commit }, item) {
    commit('logo', item)
  },
  async fetchDashboardData({ commit }) {
    if (!this.$auth.loggedIn) return

    commit('loading.dashboard', true)

    const data = await this.$axios
      .$get(`/digital/common-data?workspace_id=${this.$getWorkspaceId()}`)
      .then(({ data }) => data)
      .catch(this.$showErrorToast)

    if (data) {
      commit('dashboardData', data)

      return data
    }

    commit('loading.dashboard', false)
  },
  async fetchFolders({ commit }) {
    if (!this.$auth.loggedIn) return

    commit('loading.folders', true)

    const data = await this.$axios
      .$get(`/digital/category-list?workspace_id=${this.$getWorkspaceId()}`)
      .then(({ data }) => data)
      .catch(this.$showErrorToast)

    if (data) {
      const dataSort = data.sort(this.$sortBy('folder_name', false, null, true))
      commit('folders', dataSort)
      return data
    }

    commit('loading.folders', false)
  },
}
