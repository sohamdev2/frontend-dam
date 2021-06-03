<template>
  <ShowWhenReady :show="show">
    <AppHeader />
    <nuxt></nuxt>
  </ShowWhenReady>
</template>

<script>
export default {
  computed: {
    show() {
      return !!this.$store.state?.appData?.status
    },
  },
  mounted() {
    // this.$store.dispatch('appData/fetchDashboardData')
    // this.$store.dispatch('appData/fetchFolders')
  },
}
</script>
