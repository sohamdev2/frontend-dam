<template>
  <ShowWhenReady>
    <AppHeader v-if="$auth.loggedIn" />
    <div class="main">
      <div class="main-right-bodypart front-page">
        <div class="center-part-view-main full-width-box boxes-part">
          <div class="center-part-view">
            <div class="center-part-view-body">
              <div class="row">
                <div class="col">
                  <div class="right-body">
                    <nuxt></nuxt>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
