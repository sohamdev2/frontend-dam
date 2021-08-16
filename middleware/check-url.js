export default async function ({
  $axios,
  $getBrandName,
  error,
  app,
  $auth,
  redirect,
  store,
}) {
  if ($auth.loggedIn) {
    const { brand_name: brandName } = app.context.route.params

    if ($getBrandName() !== brandName)
      redirect({
        ...app.context.route,
        params: { brand_name: $getBrandName() },
      })
  } else
    try {
      const isValid = await $axios
        .post('verify-domain', {
          url: $getBrandName(),
        })
        .then(({ data }) => {
          store.dispatch('appData/assignLogo', data.data.logo)
          store.dispatch('appData/brandDetails', data.data)
          return data.code === 200
        })

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
