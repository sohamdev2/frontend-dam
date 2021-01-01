const _state = () => ({})

export { _state as state }

export const actions = {
  nuxtServerInit({ dispatch }) {
    dispatch('appData/fetchDashboardData')
    dispatch('appData/fetchFolders')
  },
}
