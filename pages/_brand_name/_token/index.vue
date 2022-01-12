<script>
export default {
  async asyncData({
    $auth,
    params: { token, brand_name },
    redirect,
    error,
    $setCurrentWorkspace,
    req,
  }) {
    const url = [
      'localhost:3001',
      'dam-dev3.herokuapp.com',
      'dam-staging3.herokuapp.com',
      'dam.marketinghub.com',
      'uat-damfrontend.herokuapp.com',
      'test-app-dam-front.herokuapp.com',
    ]
    let hostName = process.server ? req.headers.host : location.host
    if (!url.includes(hostName)) {
      let domainUrl = hostName
      const findIndex = domainUrl.search(':')
      if (findIndex !== -1) {
        domainUrl = domainUrl.substring(0, findIndex)
      }
      hostName = domainUrl
    } else {
      hostName = brand_name
    }
    await $auth
      .loginWith('passwordLess', { data: { url: hostName, token } })
      .then(() => {
        // set current workspace
        $auth.user.workspace_id && $setCurrentWorkspace($auth.user.workspace_id)
        redirect({
          name: 'brand_name',
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
}
</script>
