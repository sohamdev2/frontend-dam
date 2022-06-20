export const state = () => ({
  badgeCount: 0,
})
export const mutations = {
  SET_BADGE_COUNT(state, payload) {
    state.badgeCount = payload
  },
}
export const actions = {
  async fetchBadgeCount(context) {
    try {
      const { data } = await this.$axios.$get('digital/cart/badges-count', {
        params: { workspace_id: this.$getWorkspaceId() },
      })
      context.commit('SET_BADGE_COUNT', data)
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  badgeCount: (state) => state.badgeCount,
}
