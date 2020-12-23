<template>
  <client-only>
    <transition name="slide-up">
      <transition-group
        v-if="sortedFolder.length"
        class="folder-list ec-list"
        name="slide"
        style="max-height: 240px; overflow: auto"
        tag="ul"
      >
        <FolderItem
          v-for="folder in sortedFolder"
          :key="folder.id"
          :folder="folder"
        />
      </transition-group>
      <ContentLoader
        v-else-if="folderLoading"
        :speed="1"
        :width="240"
        style="margin-top: 1rem"
        :height="400"
        :animate="true"
      >
        <rect x="10" y="5" rx="2" ry="2" width="220" height="24" />
        <rect x="10" y="40" rx="2" ry="2" width="220" height="24" />
        <rect x="10" y="75" rx="2" ry="2" width="220" height="24" />
        <rect x="10" y="110" rx="2" ry="2" width="220" height="24" />
      </ContentLoader>
    </transition>
  </client-only>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: { ContentLoader },
  data() {
    return {
      sortedFolder: [],
      model: this.value,
    }
  },
  computed: {
    folderLoading() {
      return this.$store.state.appData.loading.folder
    },
    folders() {
      return this.$store.state.appData.folders
    },
  },
  watch: {
    folders() {
      this.sortedFolder = [...this.folders].sort(
        this.$sortBy('folder_name', false, null, true)
      )
    },
  },
  mounted() {
    if (this.folders)
      this.sortedFolder = [...this.folders].sort(
        this.$sortBy('folder_name', false, null, true)
      )
  },
}
</script>
