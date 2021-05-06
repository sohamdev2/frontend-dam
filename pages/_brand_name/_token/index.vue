<script>
export default {
  async asyncData({ $auth, params: { token, brand_name }, redirect, error }) {
    await $auth
      .loginWith('passwordLess', { data: { url: brand_name, token } })
      .then(() => {
        redirect({
          name: 'brand_name',
        })
      })
      .catch(error)
  },
}
</script>
