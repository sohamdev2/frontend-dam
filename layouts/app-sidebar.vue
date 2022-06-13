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
              <svg
                id="Layer_1"
                class="recent-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4346" transform="translate(-115.321 -147.331)">
                  <path
                    id="Path_3396"
                    class="fill-color"
                    d="M124.3,165.3c-5,0-9-4-9-9s4-9,9-9s9,4,9,9C133.3,161.3,129.3,165.3,124.3,165.3z M124.3,148.9c-4.1,0-7.4,3.3-7.4,7.4s3.3,7.4,7.4,7.4c4.1,0,7.4-3.3,7.4-7.4C131.7,152.2,128.4,148.9,124.3,148.9z"
                  ></path>
                  <path
                    id="Path_3397"
                    class="fill-color"
                    d="M123.6,156.7l-0.1-4.7c0-0.4,0.4-0.8,0.8-0.8c0,0,0,0,0,0l0,0c0.4,0,0.8,0.4,0.8,0.8v4.1l2.7,2.6c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l0,0c-0.3,0.3-0.8,0.3-1.1,0L123.6,156.7z"
                  ></path>
                </g>
              </svg>
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
              <svg
                id="Layer_1"
                class="trend-up-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      class="fill-color"
                      d="M505.8,112.9c8.3,8.3,8.3,21.8,0,30.2L303.1,345.8c-8.3,8.3-21.8,8.3-30.2,0l-91.6-91.6L36.4,399.1c-8.3,8.3-21.8,8.3-30.2,0s-8.3-21.8,0-30.2l160-160c8.3-8.3,21.8-8.3,30.2,0l91.6,91.6l187.6-187.6C483.9,104.6,497.4,104.6,505.8,112.9L505.8,112.9z"
                    />
                    <path
                      class="fill-color"
                      d="M341.3,128c0-11.8,9.6-21.3,21.3-21.3h128c11.8,0,21.3,9.6,21.3,21.3v128c0,11.8-9.6,21.3-21.3,21.3c-11.8,0-21.3-9.6-21.3-21.3V149.3H362.7C350.9,149.3,341.3,139.8,341.3,128z"
                    />
                  </g>
                </g>
              </svg>
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
              >
                <svg
                  id="Layer_1"
                  class="collection-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 16.2 18"
                  xml:space="preserve"
                >
                  <g id="Group_5340" transform="translate(-207.348 -290.319)">
                    <path
                      id="Path_3450"
                      class="fill-color"
                      d="M211.9,308.3c-0.9,0-1.6-0.7-1.6-1.6v-12c0-0.9,0.7-1.5,1.6-1.6h5.9c0.6,0.1,1.3,0.3,1.7,0.8c1.3,0.9,2.4,2,3.3,3.2c0.4,0.5,0.7,1,0.8,1.7v7.9c0,0.9-0.7,1.5-1.6,1.6L211.9,308.3z M211.9,294.6c-0.1,0-0.1,0-0.1,0.1v12c0,0.1,0.1,0.1,0.1,0.1H222c0.1,0,0.1,0,0.1-0.1V299l-3.8,0c-0.4,0-0.7-0.3-0.7-0.7v-3.7L211.9,294.6z M219,297.6l2.1,0c-0.3-0.4-0.6-0.8-1-1.1c-0.4-0.3-0.7-0.7-1.1-1l0,0L219,297.6z"
                    ></path>
                    <path
                      id="Path_3451"
                      class="fill-color"
                      d="M208.6,306.1c-0.7-0.1-1.3-0.8-1.3-1.5v-12.7c0-0.9,0.7-1.6,1.6-1.6h6.5c0.6,0.1,1.2,0.3,1.7,0.8c0.2,0.1,0.3,0.2,0.5,0.4l0.4,0.3l-9.2,0c-0.1,0-0.1,0-0.1,0.1v14.2L208.6,306.1z"
                    ></path>
                  </g></svg
                ><span>All Collections</span></nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                v-if="!user.is_backend_user"
                :to="{
                  name: 'brand_name-shared-urls',
                  params: { brand_name: this.$getBrandName() },
                }"
                ><svg
                  id="Layer_1"
                  class="share-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4473" transform="translate(-871 -230)">
                    <rect
                      id="Rectangle_3012"
                      x="871"
                      y="230"
                      class="fill-hide"
                      width="18"
                      height="18"
                    ></rect>
                    <path
                      id="Icon_open-share"
                      class="fill-color"
                      d="M883.9,234.4l3.2,3.1l-3.2,3.4v-2.3h-3.8c-2.1,0-4.3,0.5-6.1,1.6c1.4-2,3.9-3.2,8.4-3.2h1.5L883.9,234.4 M883.1,231.8c-0.4,0-0.7,0.3-0.7,0.7c0,0,0,0,0,0v3c-8.8,0-11.2,4.3-11.4,10.6c0,0.1,0,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1c1.4-4,4.6-6,8.9-6h2.3v2.9c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.2l5.2-5.5c0.3-0.3,0.2-0.7,0-1c0,0,0,0,0,0l-5.2-4.9C883.4,231.9,883.3,231.8,883.1,231.8L883.1,231.8z"
                    ></path>
                  </g></svg
                ><span>Shared URLs</span></nuxt-link
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
      return this.$auth.user.settings?.is_trading
    },
    showRecentUploads() {
      return this.$auth.user.settings?.is_recent_upload
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
    // console.log('sidebar mounted')
    // this.$store.dispatch('appData/fetchDashboardData')
    // this.$store.dispatch('appData/fetchFolders')
    if (this.$route.query?.tab === 'recent' && this.showRecentUploads)
      this.scrollToRecent()
  },
  methods: {
    scrollToRecent() {
      const scrollingState = true
      const scrollTo = 'recent'
      this.$store.dispatch('appData/changeScrolling', {
        scrollingState,
        scrollTo,
      })
      this.$nextTick(() => {
        this.$router.push({
          name: 'brand_name',
          params: { brand_name: this.$getBrandName() },
        })
        this.$axios
          .$post('digital/dashboard/recent-upload-url', {
            workspace_id: this.$getWorkspaceId(),
          })
          .catch(() => {})
      })
      if (this.$route.query?.tab === 'recent') {
        document
          .querySelector("h4[data-target='recent-uploaded']")
          .scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
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
