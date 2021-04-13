<template>
  <div class="body-content two-part">
    <div class="body-content-left" v-if="folderList.length">
      <div class="category-list common-box bg-gray">
        <h4
          v-if="
            currentFolder &&
            $refs.folderList &&
            $refs.folderList.getCurrentFolderName()
          "
          class="title"
        >
          <nuxt-link
            :to="{
              name: 'brand_name-folders',
              params: { brand_name: $getBrandName() },
              hash: `#${currentFolder.parent_id || ''}`,
            }"
            class="back"
          >
            <img src="~/assets/img/back-blue.svg" alt="go up"
          /></nuxt-link>
          {{ $refs.folderList.getCurrentFolderName() }}
        </h4>
        <h4 v-else class="title">Categories</h4>
        <FolderList
          ref="folderList"
          :value="hashParam"
          :parent-folder="currentFolder"
        ></FolderList>
      </div>
    </div>
    <div class="body-content-right customscrollbar">
      <SearchBar />
      <ToolBar
        :folder="currentFolder"
        :assets-count="totalAssets"
        :selected-all="selectedAll"
        :mode.sync="mode"
        :sorting.sync="sorting.toolbar.value"
        :sorting-desc="sorting.toolbar.desc"
        :breadcrumb="breadcrumb"
        :file-count="totalApiAssets || files.length"
        :subfolder-count="subFolders.length"
        @sort="(args) => args.forEach((arg) => sort(...arg))"
        @click:select-all="selectAll"
        @click:select-none="selectNone"
      />
      <div
        v-if="loading"
        style="margin: auto; overflow: hidden; width: 97%"
        class="pb-3"
      >
        <ContentLoader :speed="1" :animate="true" :width="450" :height="200">
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
          <div class="inner w-100">
            <img src="~/assets/img/no-data-image.svg" alt="" />
            <p>No Data Found</p>
          </div>
        </div>
        <template v-else>
          <transition-group
            key="folder-list"
            class="resource-wrapper"
            :class="[`${mode}` == 'row' ? 'grid-tile' : 'grid-list']"
            name="slide-up"
            mode="in-out"
            tag="div"
          >
            <div key="header" class="common-box bg-gray">
              <div class="table-list-view">
                <ListingHeader
                  v-if="!loading"
                  key="header"
                  :sorting.sync="sorting.toolbar.value"
                  :reverse="sorting.toolbar.desc"
                  @sort="(args) => args.forEach((arg) => sort(...arg))"
                />
                <ul class="tbody">
                  <template v-for="({ folder, file }, i) in items">
                    <Folder
                      v-if="folder"
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
                      v-else-if="file"
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
                  </template>
                </ul>
                <Pagination
                  v-if="lastPage > 1 && !loading"
                  key="pagination"
                  class="pb-5"
                  :class="{ 'mb-5': mode == 'column' }"
                  :last-page="lastPage"
                  :current-page.sync="page"
                />
                <template v-else-if="!loading">
                  <infinite-loading
                    key="inf-loader"
                    :identifier="identifier"
                    @infinite="nextLocalPage"
                  >
                    <div slot="spinner"></div>
                    <div slot="no-more"></div>
                    <div slot="no-results"></div>
                  </infinite-loading>
                </template>
              </div>
            </div>
          </transition-group>
        </template>
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
  </div>
</template>

<script>
/* eslint-disable camelcase */

import { ContentLoader } from 'vue-content-loader'
import fileSelection from '@/mixins/fileSelection'
import assetSorting from '@/mixins/assetSorting'

const categories = ['video', 'audio', 'image', 'application', 'archive']

function makeFolder(array) {
  return [...array].map((folder) => ({
    ...folder,
    total_contain:
      (folder.total_assets || 0) + (folder.sub_category_count || 0),
  }))
}

export default {
  layout: 'app',
  components: { ContentLoader },
  middleware: ['check-auth', 'check-url'],
  mixins: [fileSelection, assetSorting],
  data() {
    let page
    if (this.$route.query.page) {
      const queryPage = Number(this.$route.query.page)
      page = isNaN(queryPage) ? 1 : queryPage
    } else page = 1

    return {
      files: [],
      subFolders: [],
      noData: false,

      // ** UI **
      mode: 'row', // list Style

      // loaders
      loading: true,
      deleting: false,
      // pagination
      page, // currentPage
      lastPage: -1,
      totalApiAssets: null,
      localPage: 1,
      identifier: Date.now(),
      breadcrumb: null,
    }
  },
  computed: {
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    queryTag() {
      return this.$route.query.tag
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
    allItems() {
      return [
        ...this.subFolders.map((ev) => ({ folder: ev })),
        ...this.files.map((ev) => ({ file: ev })),
      ]
    },
    items() {
      return [...this.allItems].slice(0, this.localPage * 12)
    },
    totalAssets() {
      return this.totalApiAssets || this.files.length + this.subFolders.length
    },
    selectedCount() {
      return this.selectedFiles.length + this.selectedFolders.length
    },
    selectedAll() {
      const length = this.files.length + this.subFolders.length
      return !!length && this.selectedCount === length
    },
  },
  asyncComputed: {
    async currentFolder() {
      if (!this.isFolder) return null

      let folder = this.$deepSearch(
        this.folderList,
        'category_id',
        (_, id) => Number(this.hashParam) === Number(id)
      )

      if (!folder && this.$route.params.folder_name)
        folder = { folder_name: this.$route.params.folder_name }
      else
        await this.$axios
          .$post('digital/view-category', {
            workspace_id: this.$getWorkspaceId(),
            category_id: this.hashParam,
          })
          .then(({ data }) => {
            folder = data
            // this.$store.commit("dam/setFolderItem", data);
          })
          .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
      // .finally(() => (this.loading = false));

      return folder || null
    },
  },
  watch: {
    queryTag() {
      this.prefetch()
    },
    hashParam(hashParam) {
      this.resetSort()
      this.prefetch()
    },
    '$route.query.searchId'() {
      this.prefetch()
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
    folderList() {
      this.addNotInCurrent()
    },
    currentFolder() {
      this.addNotInCurrent()
    },
    // currentFolder(currentFolder) {
    //   this.$setPageTitle(currentFolder?.folder_name || 'Digital Asset Manager')
    // },
  },
  mounted() {
    this.getData()
  },
  methods: {
    nextLocalPage($state) {
      if (this.localPage > this.localTotalPages) {
        $state.complete()
        return
      }

      this.localPage += 1
      setTimeout(() => {
        $state.loaded()
      }, 300)
    },

    prefetch() {
      this.identifier += 1
      this.page = 1
      this.lastPage = -1
      this.totalApiAssets = null
      this.getData()
    },
    getFolders() {
      return this.$store.dispatch('appData/fetchFolders')
    },
    async addNotInCurrent() {
      if (!this.hashParam) {
        this.subFolders = makeFolder(this.folderList)

        return
      }

      if (this.loading || !this.currentFolder) return

      let folderToTraverse = null

      await this.$nextTick()

      if (this.isFolder) {
        folderToTraverse = this.parentFolder.sub_category_data || []
      } else if (!this.hashParam) folderToTraverse = this.folderList
      else return

      const temp = [...folderToTraverse].map((e) => ({ ...e }))

      // const currentIdMap = new Map()
      // temp.forEach(({ id }) => currentIdMap.set(id, true))

      // const notInCurrent = []
      // folderToTraverse.forEach((ev) => {
      //   if (currentIdMap.get(ev.id) !== true) notInCurrent.push(ev)
      // })
      // if (notInCurrent.length) {
      //   temp.push(...makeFolder(notInCurrent))
      //   this.$nextTick(() => (this.noData = false))
      // }

      this.subFolders = makeFolder(temp)

      this.$nextTick(
        () => (this.noData = !(this.files.length || this.subFolders.length))
      )
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
      // document.querySelector(
      //   '.center-part-view .center-part-view-body'
      // ).scrollTop = 0

      if (!this.hashParam) {
        if (!this.folderList.length) await this.getFolders()
        this.subFolders = makeFolder(this.folderList)
      } else if (this.hashParam === 'popular' && this.queryTag)
        await this.getPopularTagFiles()
      else if (this.hashParam === 'search' && this.$route.params.hasFilters)
        await this.getSearchResult()
      else if (this.isFolder) await this.getFolderData()
      else if (categories.includes(this.hashParam))
        await this.getCategoryItems()
      else {
        return this.$router.replace({
          hash: null,
        })
      }
      this.noData = !this.files.length && !this.subFolders.length

      this.loading = false
    },
    async getCategoryItems() {
      const hashParam = this.hashParam
      const body = {
        workspace_id: this.$getWorkspaceId(),
        type: this.hashParam,
        page: this.page,
        sort_value: this.apiSortValue(),
        sort_by: this.apiSortOrder(),
      }

      await this.$axios
        .$post('digital/view-all-assets-by-type', body)
        .then(({ data }) => {
          if (this.hashParam !== hashParam) return
          if (data.last_page < this.page) {
            this.page = 1
            return this.getData()
          } else this.page = data.current_page

          this.totalApiAssets = data.total

          this.lastPage = data.last_page
          this.files = data.data || []
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
    async getSearchResult() {
      await this.$axios
        .$post('digital/search-assets', this.$route.params.searchRequestBody)
        .then(({ data }) => (this.files = data.category_assets || []))
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
    async getPopularTagFiles() {
      await this.$axios
        .$get(
          'digital/popular-tag-assets?' +
            this.$toQueryString({
              workspace_id: this.$getWorkspaceId(),
              tag_name: this.queryTag,
            })
        )
        .then(({ data }) => (this.files = data || []))
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
              page: this.page,
              sort_value: this.apiSortValue(),
              sort_by: this.apiSortOrder(),
            })
        )
        .then(({ data }) => {
          if (this.hashParam !== hashParam) return

          if (data.category_assets.last_page < this.page) {
            this.page = 1
            return this.getData()
          } else this.page = data.category_assets.current_page

          this.totalApiAssets = data.category_assets.total

          this.lastPage = data.category_assets.last_page
          this.breadcrumb = data.breadcrumb
          this.subFolders = makeFolder(data.folder || [])
          this.files = data.category_assets.data || []
        })
        .catch((e) => {
          const message = this.$getErrorMessage(e)
          if (message === 'Category not found')
            return this.$router.replace({
              name: 'brand_name-folders',
              params: { brand_name: this.$getBrandName() },
            })

          this.$toast.global.error(message)
        })
    },
  },
  head: {
    title: 'Folders | Digital Asset Manager',
  },
}
</script>
