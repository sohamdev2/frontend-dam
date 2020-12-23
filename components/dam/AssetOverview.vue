<template>
  <div v-if="dashboardData" class="asset-overview">
    <h4>Asset Types</h4>
    <template v-for="overviewItem in overviewItems">
      <nuxt-link
        v-if="overviewItem.subText"
        :key="overviewItem.name"
        :to="overviewItem.to"
      >
        <span class="asset-name">{{ overviewItem.name }}</span>
        <img :src="overviewItem.src" :alt="overviewItem.name" />
      </nuxt-link>
    </template>
  </div>
  <ContentLoader
    v-else-if="dashboardDataLoading"
    class="asset-overview"
    :speed="1"
    :width="300"
    :height="320"
    :animate="true"
  >
    <rect x="8" y="5" rx="2" ry="2" width="118" height="88" />
    <rect x="136" y="5" rx="2" ry="2" width="118" height="88" />
    <rect x="8" y="98" rx="2" ry="2" width="118" height="88" />
    <rect x="136" y="98" rx="2" ry="2" width="118" height="88" />
    <rect x="8" y="196" rx="2" ry="2" width="118" height="88" />
  </ContentLoader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: { ContentLoader },

  computed: {
    dashboardData() {
      return this.$store.state.appData.dashboardData
    },
    dashboardDataLoading() {
      return this.$store.state.appData.loading.dashboard
    },
    overviewItems() {
      return [
        {
          to: { name: 'navigator', hash: `#image` },
          src: require('~/assets/img/icon/img-icon.svg'),
          name: 'Images',
          subText: this.dashboardData.total_images || 0,
        },
        {
          to: { name: 'navigator', hash: `#application` },
          src: require('@/assets/img/icon/file-icon.svg'),
          name: 'Documents',
          subText: this.dashboardData.total_documents || 0,
        },
        {
          to: { name: 'navigator', hash: `#audio` },
          src: require('~/assets/img/icon/audio-icon.svg'),
          name: 'Audio',
          subText: this.dashboardData.total_audios || 0,
        },
        {
          to: { name: 'navigator' },
          src: require('@/assets/img/icon/min-folder.svg'),
          name: 'Folders',
          subText: this.dashboardData.total_folder || 0,
        },
        {
          to: { name: 'navigator', hash: `#video` },
          src: require('~/assets/img/icon/video-icon.svg'),
          name: 'Videos',
          subText: this.dashboardData.total_videos || 0,
        },
      ].sort(this.$sortBy('name'))
    },
  },
}
</script>
