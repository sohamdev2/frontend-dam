<script>
export default {
  asyncData({ $auth, $getBrandName, redirect }) {
    const brandName = $auth.loggedId && $getBrandName()

    if (brandName) redirect(`/${brandName}`)
    else redirect('/404')
  },
}
</script>
