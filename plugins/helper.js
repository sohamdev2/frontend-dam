import * as utils from '@/utils'
import Vue from 'vue'

Vue.filter('shrinkString', utils.shrinkString)

export default ({ app, $axios }, inject) => {
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

  const getBrandName = () =>
    app.$auth?.user?.url || app.context.route.params.brand_name

  const getWorkspaceId = () => app.$auth?.user?.workspace_id

  const logout = async () => {
    const brandName = getBrandName()

    await app.$auth.logout()
    await app.$clearAuthCookies()

    app.router.replace(`/login?brandName=${brandName}`)
  }

  const clearAuthCookies = () => {
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

  inject('setPageTitle', setPageTitle)
  inject('guestAxios', $axios.create())
  inject(
    'marcomAxios',
    $axios.create({
      baseUrl: process.env.BACKEND_URL + '/api/v1',
    })
  )

  inject('getErrorMessage', getErrorMessage)
  inject('showErrorToast', showErrorToast)
  inject('getWorkspaceId', getWorkspaceId)
  inject('getBrandName', getBrandName)

  inject('logout', logout)
  inject('clearAuthCookies', clearAuthCookies)
  // inject('isMobileDevice', isMobileDevice)
}
