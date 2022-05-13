export default async function ({
  $axios,
  $getBrandName,
  error,
  app,
  $auth,
  route,
  redirect,
  store,
  req,
}) {
  if ($auth.loggedIn) {
    const { brand_name: brandName } = app.context.route.params
    if ($getBrandName() !== brandName) {
      redirect({
        ...app.context.route,
        params: { brand_name: $getBrandName() },
      })
    }
  } else
    try {
      let isValid = false
      const url = [
        'localhost:3001',
        'dam-dev3.herokuapp.com',
        'dam-staging3.herokuapp.com',
        'dam.marketinghub.com',
        'uat-damfrontend.herokuapp.com',
        'test-app-dam-front.herokuapp.com',
        'dam-frontend.herokuapp.com',
        'dam-frontend.herokuapp.com',
      ]
      const hostName = process.server ? req.headers.host : location.host
      if (!url.includes(hostName) || route.query.custom === 'true') {
        const hostName = process.server ? req.headers.host : location.host
        let domainUrl = hostName
        const findIndex = domainUrl.search(':')
        if (findIndex !== -1) {
          domainUrl = domainUrl.substring(0, findIndex)
        }

        isValid = await $axios
          .post('verify-domain', {
            url: domainUrl,
          })
          .then(({ data }) => {
            store.dispatch('appData/assignLogo', data.data.logo)
            store.dispatch('appData/brandDetails', data.data)
            return data.code === 200
          })
      } else {
        isValid = await $axios
          .post('verify-domain', {
            url: $getBrandName(),
          })
          .then(({ data }) => {
            store.dispatch('appData/assignLogo', data.data.logo)
            store.dispatch('appData/brandDetails', data.data)
            return data.code === 200
          })
      }

      if (!isValid) {
        if ($getBrandName() === 'login') {
          error({
            status: 404,
            message: `Try entering url as <Brand_URL>/login.`,
          })
        } else {
          error({
            message: `Brand with "${$getBrandName()}" doesn't exists.`,
          })
        }
      }
    } catch (e) {
      const { data, status } = e.response || {}

      if (data?.message?.includes('not available')) {
        if ($getBrandName() === 'login')
          error({
            status: 404,
            message: `Try entering url as <Brand_URL>/login.`,
          })
        else
          error({
            status: status || 500,
            message: `Brand with "${$getBrandName()}" doesn't exists.`,
          })
        return
      }

      error(e)
    }
}
