/* eslint-disable camelcase */

export default async function ({
  $axios,
  route,
  redirect,
  error,
  store,
  $auth,
  $getBrandName,
}) {
  const throw404 = () => {
    store.commit('localStorage/brandName', '')
    store.commit('brandName', '')

    redirect('/404')
  }

  const checkAndRedirect = (redirectUrl, checkUrl) => {
    if (
      route.path !== (checkUrl || redirectUrl) &&
      authConfig !== false &&
      authConfig !== 'guest'
    )
      redirect(redirectUrl)
  }
  const authConfig = route.matched[0].components.default.options.auth

  const brand_name =
    route.query.brandName ||
    route.params.brand_name ||
    store.state?.localStorage?.brandName ||
    store.state?.brandName

  if ($auth.loggedIn) {
    if (brand_name && $getBrandName() !== brand_name)
      return redirect(`/${$getBrandName()}`)

    return
  }

  if (authConfig === 'guest') return

  if (!brand_name) checkAndRedirect('/404')

  try {
    const {
      data: { code },
    } = await $axios.post('verify-domain', {
      type: 'sub_doamin',
      url: brand_name,
    })

    if (code !== 200) return throw404()

    store.commit('localStorage/brandName', brand_name)
    store.commit('brandName', brand_name)

    checkAndRedirect(`/login?brandName=${brand_name}`, '/login')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.info('error Verify:', e.response?.data?.message || e.message)
    throw404()
  }
}
