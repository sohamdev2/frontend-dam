<template>
  <ShowWhenReady :show="show">
    <AppHeader @resetList="key++" />
    <nuxt :key="key"></nuxt>
  </ShowWhenReady>
</template>

<script>
export default {
  data() {
    return {
      key: 0,
    }
  },
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
