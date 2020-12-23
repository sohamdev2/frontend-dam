import * as utils from '@/utils'

export default ({ app, $axios }, inject) => {
  const setPageTitle = (title, back = false) => {
    app.store.dispatch('page/setPageTitle', title)
    app.store.dispatch('page/setbackArrow', back)
    process.client && (document.title = title)
  }

  function getErrorMessage(e) {
    if (e) {
      const { data } = e.response || {}
      return (data && data.message) || e.message || e
    }
  }

  function showErrorToast(e) {
    app.$toast?.global?.error(getErrorMessage(e))
  }

  const logout = async () => {
    await app.$auth.logout()
    app.$clearAuthCookies()
  }

  const clearAuthCookies = () => {
    if (process.client) {
      window.localStorage.clear()
      window.sessionStorage.clear()
    }
  }

  const isMobileDevice = () => {
    return app.$device.isMobile
  }

  Object.entries(utils).forEach(([key, value]) => {
    if (typeof value === 'function') inject(key, value)
  })

  inject('setPageTitle', setPageTitle)
  inject('guestAxios', $axios.create())

  inject('getErrorMessage', getErrorMessage)
  inject('showErrorToast', showErrorToast)
  inject('getWorkspaceId', () => {
    return app.$auth?.user?.dealer?.workspace_id
  })

  inject('logout', logout)
  inject('clearAuthCookies', clearAuthCookies)
  inject('isMobileDevice', isMobileDevice)
}
