<template>
  <ShowWhenReady>
    <AppHeader v-if="$auth.loggedIn && $route.name != 'shared-assets-type'" />

    <nuxt></nuxt>
  </ShowWhenReady>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('appData/fetchDashboardData')
    this.$store.dispatch('appData/fetchFolders')
  },
}
</script>
