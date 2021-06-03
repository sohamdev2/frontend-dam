<script>
export default {
  async asyncData({
    $auth,
    params: { token, brand_name },
    redirect,
    error,
    $setCurrentWorkspace,
  }) {
    await $auth
      .loginWith('passwordLess', { data: { url: brand_name, token } })
      .then(() => {
        // set current workspace
        $auth.user.workspace_id && $setCurrentWorkspace($auth.user.workspace_id)
        redirect({
          name: 'brand_name',
        })
      })
      .catch(error)
  },
}
</script>
