/* eslint-disable camelcase */

export default async function ({
  $auth,
  $axios,
  $getBrandName,
  route,
  redirect,
  error,
}) {
  const throw404 = () =>
    error({
      status: 404,
      message: 'Page does not exists!',
    })

  const { brand_name } = route.params

  if ($auth.loggedIn) {
    if (brand_name && $getBrandName() !== brand_name)
      return redirect(`/${$getBrandName()}`)
  } else if (brand_name) {
    try {
      const {
        data: { code },
      } = await $axios.post('verify-domain', {
        type: 'sub_doamin',
        url: brand_name,
      })

      if (code !== 200) return throw404()

      redirect(`/login?brandName=${brand_name}`)
    } catch ({ response, message }) {
      if (response) {
        if (response.status === 403) return throw404()

        return error(response.message)
      } else return error(message)
    }
  }
}
