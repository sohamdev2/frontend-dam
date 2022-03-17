<template>
  <ShowWhenReady>
    <AppHeader />
    <div class="body-content two-part">
      <div
        v-if="folderList.length"
        class="body-content-left"
        :class="{ open: leftMenuOpen }"
      >
        <a
          href="javascript:void(0);"
          class="menu-show"
          @click="$store.dispatch('appData/setLeftMenuOpen', !leftMenuOpen)"
        >
          <svg
            id="Layer_1"
            class="right-arrow-icon white"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4476" transform="translate(-921 -421)">
              <rect
                id="Rectangle_3014"
                x="921"
                y="421"
                class="fill-hide"
                width="18"
                height="18"
              ></rect>
              <g
                id="Icon_feather-chevron-down"
                transform="translate(925.75 422.25)"
              >
                <path
                  id="Path_3433"
                  class="fill-color"
                  d="M0.8,15.5c0.2,0,0.4-0.1,0.5-0.2l7-7c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0l-7-7C1-0.1,0.5-0.1,0.2,0.2c-0.3,0.3-0.3,0.8,0,1l6.5,6.5l-6.5,6.5c-0.3,0.3-0.3,0.8,0,1.1C0.4,15.4,0.6,15.5,0.8,15.5z"
                ></path>
              </g>
            </g>
          </svg>
        </a>
        <div v-show="!!leftMenuOpen" class="frontend-left-menu">
          <h4>Folders</h4>

          <div class="category-list customscrollbar">
            <FolderList></FolderList>
          </div>

          <ul class="quick-links">
            <li v-if="showRecentUploads">
              <span
                :style="
                  dashboardData &&
                  (dashboardData.recent_uploads.images.length ||
                    dashboardData.recent_uploads.documents.length ||
                    dashboardData.recent_uploads.videos.length ||
                    dashboardData.recent_uploads.audios.length)
                    ? 'pointer-events: auto'
                    : 'pointer-events: none'
                "
                @click.capture.stop="scrollToRecent"
                >Recent Uploaded</span
              >
            </li>
            <li v-if="showTrending">
              <span
                :style="
                  dashboardData &&
                  dashboardData.trending_data &&
                  dashboardData.trending_data.length
                    ? 'pointer-events: auto'
                    : 'pointer-events: none'
                "
                @click.capture.stop="scrollToTrending"
                >Trending</span
              >
            </li>
            <li v-if="allCollectionList.length">
              <nuxt-link
                :to="{
                  name: 'brand_name-collection',
                  params: { brand_name: $getBrandName() },
                }"
                >All Collections</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                v-if="!user.is_backend_user"
                :to="{
                  name: 'brand_name-shared-urls',
                  params: { brand_name: this.$getBrandName() },
                }"
                >Shared URLs</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="body-content-right customscrollbar">
        <nuxt></nuxt>
      </div>
    </div>
  </ShowWhenReady>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    folderList() {
      return this.$store.state.appData.folders
    },
    showTrending() {
      return this.$auth.user.themes_option?.is_trading
    },
    showRecentUploads() {
      return this.$auth.user.themes_option?.is_recent_upload
    },
    dashboardData() {
      return this.$store.state.appData.dashboardData
    },
    leftMenuOpen() {
      return this.$store.state?.appData?.leftMenuOpen
    },
    allCollectionList() {
      return this.$store.state.appData.allCollectionList
    },
    user() {
      return this.$auth.user
    },
  },
  mounted() {
    console.log('sidebar mounted')
    // this.$store.dispatch('appData/fetchDashboardData')
    // this.$store.dispatch('appData/fetchFolders')
  },
  methods: {
    scrollToRecent() {
      const scrollingState = true
      const scrollTo = 'recent'
      this.$store.dispatch('appData/changeScrolling', {
        scrollingState,
        scrollTo,
      })
      this.$router.push({
        name: 'brand_name',
        params: { brand_name: this.$getBrandName() },
      })
    },
    scrollToTrending() {
      const scrollingState = true
      const scrollTo = 'trending'

      this.$store.dispatch('appData/changeScrolling', {
        scrollingState,
        scrollTo,
      })
      this.$router.push({
        name: 'brand_name',
        params: { brand_name: this.$getBrandName() },
      })
    },
  },
}
</script>
