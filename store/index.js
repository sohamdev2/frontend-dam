const _state = () => ({})

export { _state as state }

export const mutations = {}

export const actions = {
  nuxtServerInit({ dispatch }) {
    if (this.$auth.loggedIn) {
      dispatch('appData/fetchDashboardData')
      dispatch('appData/fetchFolders')
    }
  },
}
