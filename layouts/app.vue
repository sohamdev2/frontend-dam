<template>
  <ShowWhenReady :show="show">
    <AppHeader />
    <div class="body-content two-part">
      <Sidebar />
      <div class="body-content-right customscrollbar">
        <SearchBar />
        <nuxt></nuxt>
      </div>
    </div>
  </ShowWhenReady>
</template>

<script>
export default {
  computed: {
    show() {
      return !!this.$store.state?.appData?.dashboardData
    },
  },
  mounted() {
    this.$store.dispatch('appData/fetchDashboardData')
    this.$store.dispatch('appData/fetchFolders')
  },
}
</script>
