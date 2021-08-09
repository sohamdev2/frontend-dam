import * as utils from '@/utils'
import Vue from 'vue'

Vue.filter('shrinkString', utils.shrinkString)

export default ({ app, $axios, store }, inject) => {
  const setPageTitle = (title) => {
    // app.store.dispatch('page/setPageTitle', title)
    // app.store.dispatch('page/setbackArrow', back)
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

  const getBrandName = () => _auth()?.url || app.context.route.params.brand_name

  const brandName = () =>
    _auth()?.brand_name || app.context.route.params.brand_name
  const setCurrentWorkspace = (workspaceId) => {
    const workspace = app.$auth.user.accessibleInstances.find(
      ({ workspace_id }) => parseInt(workspace_id) === parseInt(workspaceId)
    )
    app.$auth.$storage.setCookie('currentWorkspace', workspace)
  }
  const _auth = () => {
    if (app.$auth.loggedIn)
      return app.$auth.$storage.getCookie('currentWorkspace')
    else return null
  }

  const getWorkspaceId = () => _auth()?.workspace_id

  const logout = async () => {
    const brandName = getBrandName()

    await app.$auth.logout()
    await app.$clearAuthCookies()

    app.router.replace(`/${brandName}/login`).catch(() => {})
    store.commit('appData/resetState')
  }

  const clearAuthCookies = () => {
    app.$auth.$storage.removeUniversal('currentWorkspace')
    if (process.client) {
      window.localStorage.clear()
      window.sessionStorage.clear()
    }
  }

  // const isMobileDevice = () =>
  //    app.$device.isMobile

  Object.entries(utils).forEach(([key, value]) => {
    if (typeof value === 'function') inject(key, value)
  })

  inject('fileAcceptInputImage', 'image/jpeg,image/gif,image/png,image/svg')

  inject('setPageTitle', setPageTitle)
  inject('guestAxios', $axios.create())
  inject(
    'marcomAxios',
    $axios.create({
      baseURL: process.env.BACKEND_URL + '/api/v1/',
    })
  )

  inject('getErrorMessage', getErrorMessage)
  inject('showErrorToast', showErrorToast)
  inject('getWorkspaceId', getWorkspaceId)
  inject('_auth', _auth)
  inject('setCurrentWorkspace', setCurrentWorkspace)
  inject('getBrandName', getBrandName)
  inject('brandName', brandName)

  inject('logout', logout)
  inject('clearAuthCookies', clearAuthCookies)
  // inject('isMobileDevice', isMobileDevice)
}
