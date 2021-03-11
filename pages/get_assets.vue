<script>
export default {
  middleware: ['check-auth'],

  async asyncData({
    query,
    $marcomAxios,
    error,
    $toQueryString,
    $auth,
    redirect,
  }) {
    const downloadURL = `object-download?${$toQueryString(query)}`
    $marcomAxios.setHeader('Authorization', $auth.strategy.token.get())

    await $marcomAxios
      .get(downloadURL)
      .then((response) => redirect(303, response.data))
      .catch(error)
  },
}
</script>
