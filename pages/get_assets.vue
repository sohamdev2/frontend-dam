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
      .$get(downloadURL)
      .then((data) => {
        console.log(data)
        redirect(303, data)
      })
      .catch(({ response, message }) => {
        const { status, data } = response || {}

        error({ status: status || 500, message: data?.message || message })
      })
  },
}
</script>
