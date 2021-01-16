import { deepSearch } from '~/utils'
import { mutator } from '~/utils/helper'

const _state = () => ({
  dashboardData: null,
  folders: [],
  loading: {
    dashboard: true,
    folders: true,
  },
})

export { _state as state }

export const mutations = {
  dashboardData: mutator('dashboardData'),
  folders: mutator('folders'),
  'loading.dashboard'(state, value) {
    state.loading.dashboard = value
  },
  'loading.folders'(state, value) {
    state.loading.folders = value
  },
  setFolderItem(state, item) {
    // let temp = [...state.folders];

    const folder = deepSearch(state.folders, 'id', (_, id) => item.id === id)
    if (folder) Object.assign(folder, item)

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
}
export const actions = {
  async fetchDashboardData({ commit, state }) {
    if (!this.$auth.loggedIn) return

    commit('loading.dashboard', true)

    const response = await this.$axios
      .$get(`/digital/common-data?workspace_id=${this.$getWorkspaceId()}`)
      .catch(this.$showErrorToast)

    commit('loading.dashboard', false)

    if (response) {
      commit('dashboardData', response.data)

      return response.data
    }
  },
  async fetchFolders({ commit }) {
    if (!this.$auth.loggedIn) return

    commit('loading.folders', true)

    const response = await this.$axios
      .$get(`/digital/category-list?workspace_id=${this.$getWorkspaceId()}`)
      .catch(this.$showErrorToast)

    commit('loading.folders', false)
    if (response) {
      commit('folders', response.data)

      return response.data
    }
  },
}
