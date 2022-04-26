<template>
  <client-only v-if="foldersLoading">
    <ContentLoader
      :speed="1"
      :width="240"
      :height="400"
      :animate="true"
      class="normalLoader"
    >
      <rect x="10" y="5" rx="2" ry="2" width="220" height="24" />
      <rect x="10" y="40" rx="2" ry="2" width="220" height="24" />
      <rect x="10" y="75" rx="2" ry="2" width="220" height="24" />
      <rect x="10" y="110" rx="2" ry="2" width="220" height="24" />
    </ContentLoader>
  </client-only>
  <transition-group
    v-else-if="folderList.length"
    name="slide-up"
    tag="ul"
    class="category-menu"
  >
    <FolderItem
      v-for="folder in folders"
      :key="folder.id"
      :selection="value"
      :folder="folder"
      :parents="folderArray"
      :loading="childLoading"
      @hashparent="
        (e) => {
          if (e) {
            childLoading = false
          }
        }
      "
    />
  </transition-group>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: { ContentLoader },
  props: {
    value: { type: String, default: null },
    parentFolder: { type: Object, default: null },
  },
  data() {
    return {
      loadingModel: this.loading,
      currentFolderName: '',
      folderArray: [],
      childLoading: false,
    }
  },
  computed: {
    foldersLoading() {
      return this.$store.state.appData.loading.folder
    },
    folderList() {
      return this.$store.state.appData.folders
    },
  },
  asyncComputed: {
    async folders() {
      // if (this.storeUpdated) {
      //   this.storeUpdated = false
      //   return this.cachedFolders
      // }

      this.cachedFolders = await new Promise((resolve, reject) => {
        const makeFolders = (folders, parent) => {
          const sortFolders = [...folders].sort(
            this.$sortBy('folder_name', false, null, true)
          )

          if (parent)
            this.currentFolderName = parent.folder_name || parent.category_name
          else this.currentFolderName = ''

          resolve(sortFolders)
        }

        const initFolders = (fetchFolder) => {
          if (!fetchFolder) return makeFolders(this.folderList)

          const folder = this.$deepSearch(
            this.folderList,
            'id',
            (_, id) => fetchFolder === id
          )

          if (folder)
            if (folder.sub_category_count === folder.sub_category_data?.length)
              return makeFolders(folder.sub_category_data, folder)

          this.loadingModel = true

          this.$axios
            .$post('digital/view-category', {
              workspace_id: this.$getWorkspaceId(),
              category_id: fetchFolder,
            })
            .then(({ data }) => {
              makeFolders(data.sub_category_data, data)
              this.storeUpdated = true

              // this.$nextTick(() =>
              //   this.$store.commit('dam/setFolderItem', data)
              // )
            })
            .catch(reject)
        }

        if (this.loading) return makeFolders([])
        if (!this.value || isNaN(this.value))
          return makeFolders(this.folderList)

        if (this.parentFolder)
          if (this.parentFolder?.sub_category_data?.length)
            makeFolders(this.parentFolder.sub_category_data, this.parentFolder)
          else initFolders(this.parentFolder.parent_id)
        else if (!this.value) makeFolders(this.folderList)
      })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          return []
        })
        .finally(() => (this.loadingModel = false))

      return this.cachedFolders
    },
  },
  async mounted() {
    const x = parseInt(this.$route.hash.substring(1))
    if (Number.isInteger(x)) {
      this.childLoading = true
      await this.$axios
        .$post(`digital/get-parent-category`, {
          workspace_id: this.$getWorkspaceId(),
          category_id: x,
        })
        .then((response) => {
          response.data.map((item) => this.folderArray.push(item))
        })
    }
  },
  methods: {
    getCurrentFolderName() {
      return this.currentFolderName
    },
  },
}
</script>
