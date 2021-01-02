import { mutator } from '~/utils/helper'

const _state = () => ({
  brandName: '',
})

export { _state as state }

export const mutations = {
  brandName: mutator('brandName'),
}

export const actions = {
  nuxtServerInit({ dispatch }) {
    if (this.$auth.loggedIn) {
      dispatch('appData/fetchDashboardData')
      dispatch('appData/fetchFolders')
    }
  },
}
