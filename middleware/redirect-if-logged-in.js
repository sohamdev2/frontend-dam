export default async function ({
  $axios,
  $auth,
  $getBrandName,
  req,
  redirect,
  route,
  next,
}) {
  const url = [
    'localhost:3001',
    'dam-dev3.herokuapp.com',
    'dam-staging3.herokuapp.com',
    'dam.marketinghub.com',
  ]
  const hostName = process.server ? req.headers.host : location.host
  if (!url.includes(hostName)) {
    const brandName = $auth.loggedIn && $getBrandName()
    if (route.name === 'reset-password') {
    } else if (brandName) {
      redirect(`/${brandName}`)
    } else if (route.query.custom === 'true') {
    } else {
      let domainUrl = hostName
      const findIndex = domainUrl.search(':')
      console.log(findIndex)
      if (findIndex !== -1) {
        domainUrl = domainUrl.substring(0, findIndex)
      }

      await $axios
        .post('verify-domain', {
          url: domainUrl,
        })
        .then(({ data }) => {
          redirect(
            `${hostName}/${data.data.workspace.url_slug}/login?custom=true`
          )
        })
    }
  } else {
    const brandName = $auth.loggedIn && $getBrandName()

    if (brandName) redirect(`/${brandName}`)
  }
}
