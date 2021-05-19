<template>
  <div class="body-content two-part">
    <div v-if="folderList.length" class="body-content-left">
      <div class="category-list common-box bg-gray">
        <h4 class="title">Folders</h4>
        <FolderList></FolderList>
      </div>
    </div>
    <div class="body-content-right customscrollbar">
      <SearchBar />
      <div v-if="dashboardData" class="hero-section">
        <client-only>
          <carousel
            :per-page="1"
            autoplay
            navigation-enabled
            loop
            :pagination-enabled="false"
          >
            <slide v-for="banner in bannerData" :key="banner.id">
              <div
                class="banner-item"
                :title="banner.title"
                :style="{
                  backgroundImage: `url('${banner.image}')`,
                }"
              ></div>
            </slide>
          </carousel>
        </client-only>
      </div>
      <template
        v-if="
          dashboardData &&
          dashboardData.trending_data &&
          dashboardData.trending_data.length
        "
      >
        <div class="section-title">
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
          class="section-title"
        >
          <h4>Recent Uploads</h4>
        </div>

        <template v-for="(files, key) in dashboardData.recent_uploads">
          <template v-if="files.length">
            <div :key="key" class="mini-title">
              <!-- <input id="Images" type="checkbox" class="form-check-input" /> -->
              <label for="Images" class="check-label">{{
                keytoTitle(key)
              }}</label>
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
        </template>
        <template
          v-if="
            !dashboardData.recent_uploads.images.length &&
            !dashboardData.recent_uploads.documents.length &&
            !dashboardData.recent_uploads.videos.length &&
            !dashboardData.recent_uploads.audios.length
          "
        >
          <div :key="key" class="no-data-found my-5">
            <div class="inner w-100">
              <img src="~/assets/img/no-data-image.svg" alt="No Data Found" />
              <p>You don't have files</p>
            </div>
          </div>
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
export default {
  layout: 'app',
  middleware: ['check-url', 'check-auth'],
  data() {
    return {
      shareFile: null,
    }
  },
  computed: {
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
  },
  mounted() {
    this.$store.dispatch('appData/fetchDashboardData')
    this.$store.dispatch('appData/fetchFolders')
  },
  methods: {
    onShareFile(file) {
      this.shareFile = file
      this.$nextTick(() => this.$refs.shareDialog.toggleModel())
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
    return { title: this.$getBrandName() }
  },
}
</script>
