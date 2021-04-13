<template>
  <ShowWhenReady>
    <AppHeader />

    <div class="body-content">
      <SearchBar />
      <nuxt></nuxt>
    </div>
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
