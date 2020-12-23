<template>
  <div>
    <ToolBar
      :folder="currentFolder"
      :assets-count="totalAssets"
      :selected-all="selectedAll"
      :mode.sync="mode"
      @sort="(args) => args.forEach((arg) => sort(...arg))"
      @click:select-all="selectAll"
      @click:select-none="selectNone"
    />
    <div style="margin: auto; overflow: hidden">
      <ContentLoader
        v-if="loading"
        :speed="1"
        :animate="true"
        :width="450"
        :height="200"
      >
        <template v-if="mode === 'column'">
          <rect x="0" y="5" rx="1" ry="1" width="450" height="40" />
          <rect x="0" y="50" rx="1" ry="1" width="450" height="40" />
          <rect x="0" y="95" rx="1" ry="1" width="450" height="40" />
          <rect x="0" y="140" rx="1" ry="1" width="450" height="40" />
        </template>
        <template v-else>
          <rect x="0" y="15" rx="1" ry="1" width="112.4" height="112.4" />
          <rect x="117.4" y="15" rx="1" ry="1" width="112.4" height="112.4" />
          <rect x="234.9" y="15" rx="1" ry="1" width="112.4" height="112.4" />
          <rect x="352.3" y="15" rx="1" ry="1" width="112.4" height="112.4" />
          <!-- <rect x="0" y="60" rx="1" ry="1" width="40" height="40" />
                  <rect x="0" y="105" rx="1" ry="1" width="40" height="40" />
                  <rect x="0" y="105" rx="1" ry="1" width="40" height="40" /> -->
        </template>
      </ContentLoader>
    </div>
    <template v-show="!loading">
      <div v-if="noData" key="no-data" class="no-data-found">
        <img
          src="@/assets/img/no-data-image.svg"
          alt="No Data Found"
          class="img-responsive"
        />
        <h4>No Data Found</h4>
      </div>
      <transition-group
        v-else
        key="folder-list"
        class="resource-container"
        :class="[`${mode}-resource`]"
        name="folder-transition"
        mode="in-out"
        tag="div"
      >
        <div v-if="!loading" key="header" class="arange-filters">
          <div class="preview-head"></div>
          <div class="name-head sorting">
            <span>Name</span>
            <SortIcon
              @click="
                sort('subFolders', 'folder_name', $sortToUpperCase)
                sort('files', 'display_file_name', $sortToUpperCase)
              "
            />
          </div>
          <div class="format-type sorting">
            <span>Assets</span>
            <SortIcon
              @click="
                sort('subFolders', 'total_assets', $sortToTypedNumber)
                sort('files', 'file_type', $sortToUpperCase)
              "
            />
          </div>
          <div class="date sorting">
            <span>Date</span>
            <SortIcon
              @click="
                sort('subFolders', 'date', $sortToTime)
                sort('files', 'date', $sortToTime)
              "
            />
          </div>
          <div class="size sorting">
            <span>Size</span>
            <SortIcon
              @click="
                sort('subFolders', 'folder_name', $sortToUpperCase)
                sort('files', 'file_size', $sortToTypedNumber)
              "
            />
          </div>
          <div class="action-head">Action</div>
        </div>
        <Folder
          v-for="(folder, i) in subFolders"
          :key="'folder-' + folder.id"
          :folder="folder"
          :mode="mode"
          :style="{
            'transition-delay': `${(i % 12) * 30}ms !important`,
          }"
          :selected="folderSelection[folder.id]"
          @removeMe="removeFolders"
          @click:selected="toggleFolderSelection"
        />
        <Resource
          v-for="(file, i) in files"
          :key="'file-' + file.id"
          :file="file"
          :style="{
            'transition-delay': `${
              ((subFolders.length + i) % 12) * 30
            }ms !important`,
          }"
          :mode="mode"
          :deleting="deleting"
          :selected="selection[file.id]"
          @click:selected="toggleSelection"
        />
        <Pagination
          v-if="lastPage > 1 && !loading"
          key="pagination"
          loading="loading"
          :last-page="lastPage"
          :current-page.sync="page"
        />
      </transition-group>
    </template>

    <DownloadingIndicator />

    <SelectionBar
      :selected-files="selectedFiles"
      :selected-folders="selectedFolders"
      :selected-all="selectedAll"
      :deleting.sync="deleting"
      @deleted="removeSelectedAll"
      @moved="removeSelectedFiles"
      @click:select-all="selectAll"
      @click:select-none="selectNone"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */

import fileSelection from '@/mixins/fileSelection'
import { ContentLoader } from 'vue-content-loader'

const categories = ['video', 'audio', 'image', 'application', 'archive']

export default {
  layout: 'app',
  components: { ContentLoader },

  mixins: [fileSelection],
  data() {
    let page
    if (this.$route.query.page) {
      const queryPage = Number(this.$route.query.page)
      page = isNaN(queryPage) ? 0 : queryPage
    } else page = 1

    return {
      files: [],
      subFolders: [],
      noData: false,

      // ** UI **
      mode: 'row', // list Style
      sorting: { files: {}, subFolders: {} },

      // loaders
      loading: true,
      deleting: false,
      // pagination
      page, // currentPage
      lastPage: -1,
    }
  },
  computed: {
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    folderList() {
      return this.$store.state.appData.folders
    },
    isFolder() {
      return (
        !!this.hashParam &&
        !categories.includes(this.hashParam) &&
        !isNaN(Number(this.hashParam))
      )
    },
    currentFolder() {
      return this.isFolder
        ? this.$deepSearch(
            this.folderList,
            'category_id',
            (_, id) => Number(this.hashParam) === Number(id)
          )
        : null
    },
    totalAssets() {
      return this.files.length + this.subFolders.length
    },
    selectedAll() {
      return (
        !!this.totalAssets &&
        this.selectedFiles.length + this.selectedFolders.length ===
          this.totalAssets
      )
    },
  },
  watch: {
    hashParam() {
      this.page = 1
      this.lastPage = -1
      this.getData()
    },
    page(page) {
      if (page === -1) {
        this.$router.replace({
          query: null,
          hash: this.hashParam && `#${this.hashParam}`,
        })
      } else {
        this.$router.replace({
          query: { page },
          hash: this.hashParam && `#${this.hashParam}`,
        })
        this.getData()
      }
    },
    // currentFolder(currentFolder) {
    //   this.$setPageTitle(currentFolder?.folder_name || 'Digital Asset Manager')
    // },
  },
  mounted() {
    // this.$setPageTitle('Digital Asset Manager')
    this.getFolders()
    this.getData()
  },
  methods: {
    /**
     * Add newly added folders
     */
    getFolders() {
      this.$store.dispatch('appData/fetchFolders')
    },
    selectAll() {
      this.selectedFiles = [...this.files]
      this.selectedFolders = [...this.subFolders]
    },
    removeSelectedAll() {
      const fileIds = this.selectedFiles.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))

      const folderIds = this.selectedFolders.map(({ id }) => id)
      this.subFolders = this.subFolders.filter(
        ({ id }) => !folderIds.includes(id)
      )

      this.selectNone()
    },
    removeSelectedFiles() {
      const fileIds = this.selectedFiles.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))
      this.selectedFiles = []
    },
    removeFolders(...folders) {
      const folderIds = folders.map(({ id }) => id)
      this.subFolders = this.subFolders.filter(
        ({ id }) => !folderIds.includes(id)
      )
    },
    async getData() {
      this.loading = true
      this.noData = false
      // empty all array
      this.subFolders = []
      this.files = []
      this.selectNone()

      if (!this.hashParam) {
        if (!this.folderList.length) await this.getFolders()
        this.subFolders = [...this.folderList]
      } else if (
        this.hashParam === 'search' &&
        this.$refs.searchBar.getHasFilters()
      )
        await this.getSearchResult()
      else if (this.isFolder) await this.getFolderData()
      else if (categories.includes(this.hashParam))
        await this.getCategoryItems()
      else
        return this.$router.replace({
          name: 'navigator',
          params: { workspace_id: this.$getWorkspaceId() },
        })

      this.noData = !this.files.length && !this.subFolders.length

      this.loading = false
    },
    async getCategoryItems() {
      const hashParam = this.hashParam

      await this.$axios
        .$post('digital/view-all-assets-by-type', {
          workspace_id: this.$getWorkspaceId(),
          type: this.hashParam,
          page: this.page,
        })
        .then(({ data }) => {
          if (this.hashParam !== hashParam) return
          if (data.last_page < this.page) {
            this.page = 1
            return this.getData()
          } else this.page = data.current_page

          this.lastPage = data.last_page
          this.files = data.data || []
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
    async getSearchResult() {
      await this.$axios
        .$post(
          'digital-assets/dashboard/search-assets',
          this.$refs.searchBar.getRequestBody()
        )
        .then(({ data }) => {
          this.files = data.category_assets || []
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
    async getFolderData() {
      const hashParam = this.hashParam

      await this.$axios
        .$get(
          'digital/view-files-with-category?' +
            this.$toQueryString({
              workspace_id: this.$getWorkspaceId(),
              category_id: this.hashParam,
            })
        )
        .then(({ data }) => {
          if (this.hashParam !== hashParam) return

          this.subFolders = data.folder || []
          this.files = data.category_assets || []
        })
        .catch((e) => {
          const message = this.$getErrorMessage(e)
          if (message === 'Category not found')
            return this.$router.replace({
              name: 'navigator',
              params: { workspace_id: this.$getWorkspaceId() },
            })

          this.$toast.global.error(message)
        })
    },
    sort(path, field_name, primer) {
      primer = primer || ((v) => v)

      if (this.sorting[path].field === field_name)
        this.sorting[path].reverse = !this.sorting[path].reverse
      else this.sorting[path].reverse = false
      this.sorting[path].field = field_name

      this[path] = this[path].sort(
        this.$sortBy(
          this.sorting[path].field,
          this.sorting[path].reverse,
          (x) => primer(x, this.sorting[path].reverse)
        )
      )
    },
  },
  head: {
    title: 'Navigator | Digital Asset Manager',
  },
}
</script>

<style>
.dam-res {
  transition: all 200ms ease;
}
.folder-transition-move {
  transition: transform 240ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.folder-transition-enter {
  transform: translateY(100%);
  opacity: 0;
}
/* .folder-transition-leave-active,
.folder-transition-enter-active {
  position: absolute;
  left: 0;
  right: 0;
} */
.folder-transition-leave {
  transform: translateY(0);
  opacity: 1;
}
.folder-transition-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.folder-transition-leave-active {
  transition: none;
}
.folder-transition-enter-active {
  transition: transform 240ms cubic-bezier(0.165, 0.84, 0.44, 1) !important;
}
</style>
