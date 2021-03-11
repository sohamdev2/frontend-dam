export default async function ({
  $axios,
  $getBrandName,
  error,
  app,
  $auth,
  redirect,
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
        .then(({ data: { code } }) => code === 200)

      if (!isValid)
        error({
          message: `Brand with "${$getBrandName()}" doesn't exists.`,
        })
    } catch (e) {
      const { data, status } = e.response || {}

      if (data?.message?.includes('not available'))
        return error({
          status: status || 500,
          message: `Brand with "${$getBrandName()}" doesn't exists.`,
        })

      error(e)
    }
}
