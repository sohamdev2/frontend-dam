<template>
  <div>
    <div class="hero-section">
      <client-only v-if="dashboardData">
        <carousel
          :per-page="1"
          class="owl-stage-outer"
          autoplay
          navigation-enabled
          loop
          navigation-next-label="›"
          navigation-prev-label="‹"
        >
          <slide v-for="banner in bannerData" :key="banner.id" class="owl-item">
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
        <h2>Trending</h2>
      </div>
      <client-only>
        <carousel
          :per-page="4"
          class="resource-container row-resource"
          navigation-enabled
          navigation-next-label="›"
          navigation-prev-label="‹"
          :pagination-enabled="false"
        >
          <slide v-for="file in dashboardData.trending_data" :key="file.id">
            <Resource
              :file="file"
              emit-share
              hide-select
              @share="onShareFile"
            />
          </slide>
        </carousel>
      </client-only>
    </template>
    <div class="section-title">
      <h2>Recent Uploads</h2>
    </div>
    <template v-if="dashboardData">
      <template v-for="(files, key) in dashboardData.recent_uploads">
        <template v-if="files.length">
          <div :key="key" class="mini-title">
            <div class="custom-checkbox">
              <!-- <input id="Images" type="checkbox" class="form-check-input" /> -->
              <label for="Images" class="hide-select">{{
                keytoTitle(key)
              }}</label>
            </div>
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
          <client-only :key="`files-${key}`">
            <carousel
              :per-page="4"
              class="resource-container row-resource"
              navigation-enabled
              navigation-next-label="›"
              navigation-prev-label="‹"
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
        </template>
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
    bannerData() {
      return [...this.dashboardData.banners].sort(
        ({ postion: a, postions: b }) => a - b
      )
    },
    dashboardData() {
      return this.$store.state.appData.dashboardData
    },
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

<style lang="css">
.banner-item {
  width: 100%;
  height: 320px;
  object-fit: scale-down;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.VueCarousel-pagination {
  position: absolute;
  z-index: 2;
  bottom: 0;
}
.VueCarousel-dot-container {
  margin: 0.125rem 0 !important;
}

.VueCarousel.resource-container.row-resource > div {
  flex: 1;
  max-width: unset !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}
.VueCarousel button {
  outline: none !important;
}

.VueCarousel.resource-container .VueCarousel-slide {
  max-width: 25%;
  padding: 0 15px;
  margin-bottom: 30px;
}

.VueCarousel:hover .VueCarousel-pagination,
.VueCarousel:hover .VueCarousel-navigation-prev,
.VueCarousel:hover .VueCarousel-navigation-next {
  background: #0000003e !important;
}

.VueCarousel .VueCarousel-pagination,
.VueCarousel .VueCarousel-navigation-prev,
.VueCarousel .VueCarousel-navigation-next {
  background: transparent !important;
  transition: all 250ms ease !important;
}

.VueCarousel-navigation-button {
  font-size: 32px !important;
  color: rgba(255, 255, 255, 0.789) !important;
  margin: 0 !important;
  top: 30% !important;
  bottom: calc(30% + 34px);
  width: 48px;
  z-index: 2;
  line-height: 1;
  align-items: center;
  display: flex;
  opacity: 1;
  padding-bottom: 16px !important;
  justify-content: center;
  transform: translateY(0%) !important;
}
.VueCarousel-navigation--disabled {
  opacity: 0 !important;
  pointer-events: none;
}
.VueCarousel-navigation-prev {
  left: 0px !important;
}
.VueCarousel-navigation-next {
  right: 0px !important;
}
.resource-container .VueCarousel-navigation-prev {
  left: 15px !important;
}
.resource-container .VueCarousel-navigation-next {
  right: 15px !important;
}
.VueCarousel-dot {
  margin: 0 !important;
}
.custom-checkbox label.hide-select {
  padding-left: 0 !important;
  cursor: default;
}
.custom-checkbox label.hide-select:before {
  opacity: 0 !important;
}
</style>
