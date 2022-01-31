<template>
  <div class="body-content two-part">
    <div v-if="folderList.length" class="body-content-left">
      <h4>Folders</h4>

      <div class="category-list customscrollbar">
        <FolderList></FolderList>
      </div>

      <ul class="quick-links">
        <li>
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
        <li>
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
        <li>
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
    <div ref="rightSide" class="body-content-right customscrollbar">
      <SearchBar />
      <div v-if="dashboardData" class="hero-section">
        <client-only>
          <carousel
            ref="hero"
            autoplay
            :per-page="1"
            navigation-enabled
            :loop="false"
            :navigate-to="heroNavigateTo"
            :pagination-enabled="false"
            @transition-end="onHeroChanged"
          >
            <slide v-for="banner in bannerData" :key="banner.id">
              <!-- <div
                class="banner-item"
                :title="banner.title"
                :style="{
                  backgroundImage: `url('${banner.image}')`,
                }"
              ></div> -->
              <a :href="banner.url" target="_blank">
                <div
                  class="banner-item"
                  :title="banner.title"
                  :style="{
                    backgroundImage: `url('${banner.image}')`,
                  }"
                ></div>
                <div class="content">
                  <div class="content-wepper">
                    <p>
                      {{ banner.description }}
                    </p>
                  </div>
                </div>
              </a>
            </slide>
          </carousel>
        </client-only>
      </div>

      <div
        v-if="!user.is_slider && tileData && tileData.length"
        class="section-title"
      >
        <h4>Tiles List</h4>
      </div>
      <div
        v-if="!user.is_slider && tileData && tileData.length"
        class="trending-sec grid-tile resource-wrapper tiles-list"
      >
        <div class="common-box bg-gray">
          <div class="table-list-view">
            <ul class="tbody">
              <template v-for="tile in tileData">
                <Tile :key="tile.id" :tile="tile" />
              </template>
            </ul>
          </div>
        </div>
      </div>

      <div
        v-if="user.is_slider && tileData && tileData.length"
        class="section-title"
      >
        <h4>Tiles Slider</h4>
      </div>
      <div
        v-if="user.is_slider && tileData && tileData.length"
        class="trending-sec grid-tile resource-wrapper tiles-list"
      >
        <div class="common-box bg-gray">
          <div class="table-list-view">
            <ul class="tbody owl-carousel tiles-carousel">
              <client-only>
                <carousel
                  :per-page="4"
                  navigation-enabled
                  :pagination-enabled="false"
                >
                  <slide v-for="tile in tileData" :key="tile.id">
                    <Tile :tile="tile" />
                  </slide>
                </carousel>
              </client-only>
            </ul>
          </div>
        </div>
      </div>

      <template
        v-if="
          dashboardData &&
          dashboardData.trending_data &&
          dashboardData.trending_data.length
        "
      >
        <div ref="trending" class="section-title">
          <h4>Trending</h4>
        </div>
        <div class="trending-sec grid-tile resource-wrapper">
          <div class="common-box bg-gray">
            <div class="table-list-view">
              <ul class="tbody">
                <client-only>
                  <carousel
                    :per-page="4"
                    navigation-enabled
                    :pagination-enabled="false"
                  >
                    <slide
                      v-for="file in dashboardData.trending_data"
                      :key="file.id"
                    >
                      <Resource
                        :file="file"
                        emit-share
                        hide-select
                        @share="onShareFile"
                      />
                    </slide>
                  </carousel>
                </client-only>
              </ul>
            </div>
          </div>
        </div>
      </template>
      <template v-if="dashboardData">
        <div
          v-if="
            dashboardData.recent_uploads.images.length ||
            dashboardData.recent_uploads.documents.length ||
            dashboardData.recent_uploads.videos.length ||
            dashboardData.recent_uploads.audios.length
          "
          ref="recent"
          class="section-title"
        >
          <h4>Recent Uploaded</h4>
        </div>

        <template v-for="(files, key) in dashboardData.recent_uploads">
          <template v-if="files.length">
            <div :key="key" class="mini-title">
              <!-- <input id="Images" type="checkbox" class="form-check-input" /> -->
              <label>{{ keytoTitle(key) }}</label>
              <nuxt-link
                :to="{
                  name: 'brand_name-folders',
                  params: { brand_name: $getBrandName() },
                  hash: `#${normalizedForNavitor(key)}`,
                }"
                class="browse-box"
              >
                <span>
                  Browse
                  {{ dashboardData[`total_${key}`] }} {{ keytoTitle(key) }}
                </span>
              </nuxt-link>
            </div>
            <div
              :key="`files-${key}`"
              class="recentuploads-sec grid-tile resource-wrapper"
            >
              <div class="common-box bg-gray">
                <div class="table-list-view">
                  <ul class="tbody">
                    <client-only>
                      <carousel
                        :per-page="4"
                        navigation-enabled
                        :pagination-enabled="false"
                      >
                        <slide v-for="file in files" :key="file.id">
                          <Resource
                            :file="file"
                            emit-share
                            hide-select
                            @share="onShareFile"
                          />
                        </slide>
                      </carousel>
                    </client-only>
                  </ul>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div :key="key" class="mini-title">
              <label for="Images" class="check-label">{{
                keytoTitle(key)
              }}</label>
            </div>
            <div
              :key="`files-${key}`"
              class="recentuploads-sec grid-tile resource-wrapper"
            >
              <div class="common-box bg-gray">
                <div :key="key" class="no-data-found my-5">
                  <div class="inner w-100">
                    <svg
                      id="Layer_1"
                      class="no-record-icon darkgray"
                      style="height: 150px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 131.3 156.8"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_4457"
                        transform="translate(-190.348 -177.624)"
                      >
                        <path
                          id="Path_3564"
                          class="fill-color"
                          d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                        />
                        <path
                          id="Path_3565"
                          class="fill-color"
                          d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                        />
                      </g>
                    </svg>

                    <p>You don't have files</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- <template
            v-if="
              !dashboardData.recent_uploads.images.length &&
              !dashboardData.recent_uploads.documents.length &&
              !dashboardData.recent_uploads.videos.length &&
              !dashboardData.recent_uploads.audios.length
            "
          >
            <div :key="key" class="no-data-found my-5">
              <div class="inner w-100">
                <svg
                  id="Layer_1"
                  class="no-record-icon darkgray"
                  style="height: 150px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 131.3 156.8"
                  xml:space="preserve"
                >
                  <g id="Group_4457" transform="translate(-190.348 -177.624)">
                    <path
                      id="Path_3564"
                      class="fill-color"
                      d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                    />
                    <path
                      id="Path_3565"
                      class="fill-color"
                      d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                    />
                  </g>
                </svg>

                <p>You don't have files</p>
              </div>
            </div>
          </template> -->
        </template>
      </template>

      <DownloadingIndicator />

      <client-only>
        <ShareFile
          ref="shareDialog"
          :files="(shareFile && [shareFile]) || []"
          type="folder"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import Tile from '@/components/dam/Tile.vue'
export default {
  components: {
    Tile,
  },
  layout: 'app',
  middleware: ['check-url', 'check-auth'],
  data() {
    return {
      shareFile: null,
      heroNavigateTo: 0,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    folderList() {
      return this.$store.state.appData.folders
    },
    bannerData() {
      return [...this.dashboardData.banners].sort(
        ({ postion: a, postions: b }) => a - b
      )
    },
    dashboardData() {
      return this.$store.state.appData.dashboardData
    },
    tileData() {
      return [...this.$store.state.appData.tileData].sort(
        ({ postion: a, postions: b }) => a - b
      )
    },
  },
  mounted() {
    this.$store.dispatch('appData/fetchDashboardData').then(() => {
      if (this.$store.state.appData.scrollToRecent) {
        if (this.$store.state.appData.scrollTo === 'recent') {
          this.scrollToRecent()
        } else if (this.$store.state.appData.scrollTo === 'trending') {
          this.scrollToTrending()
        }
      }
    })
    this.$store.dispatch('appData/fetchFolders')
    this.$store.dispatch('appData/fetchTileData')
    document.querySelector("link[rel~='icon']").href =
      this.$_auth()?.favicon === '' ? '/favicon.png' : this.$_auth()?.favicon
  },
  methods: {
    onHeroChanged() {
      this.$nextTick(() => {
        const hero = this.$refs.hero
        const page = hero.currentPage
        if (page === this.bannerData.length - 1) {
          this.heroNavigateTo = [page, false]
          setTimeout(() => {
            this.heroNavigateTo = [0, false]
          }, 1500)
        }
      })
    },
    scrollToTrending() {
      this.$refs.trending.scrollIntoView()
      this.resetScrolling()
    },
    scrollToRecent() {
      this.$refs.recent.scrollIntoView()
      this.resetScrolling()
    },
    resetScrolling() {
      const scrollingState = false
      const scrollTo = ''
      this.$store.dispatch('appData/changeScrolling', {
        scrollingState,
        scrollTo,
      })
    },
    onShareFile(file) {
      this.$nextTick(() => this.$refs.shareDialog.toggleModel())
      this.shareFile = file
    },
    keytoTitle(key) {
      return key[0].toUpperCase() + key.slice(1)
    },
    normalizedForNavitor(key) {
      if (key === 'documents') return 'application'

      return key.slice(0, key.length - 1)
    },
  },
  head() {
    return {
      title: this.$brandName(),
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: this.$_auth()?.favicon || '/favicon.png',
        },
      ],
    }
  },
}
</script>
