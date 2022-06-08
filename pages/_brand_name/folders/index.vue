<template>
  <div class="brand-folder-index">
    <SearchBar ref="searchbar" />
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
      :asset-count.sync="sorting.totalAssetCount"
      :searchbar="$refs.searchbar"
      @sort="(args) => args.forEach((arg) => sort(...arg))"
      @click:select-all="selectAll"
      @click:select-none="selectNone"
      @emitAssetCount="changeEmitAssetCount"
    />
    <div
      v-if="loading"
      style="margin: auto; overflow: hidden; width: 97%"
      class="pb-3"
    >
      <ContentLoader
        :speed="1"
        :animate="true"
        :width="450"
        :height="200"
        class="normalLoader"
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
        </template>
      </ContentLoader>
    </div>
    <template>
      <div v-if="noData" key="no-data" class="no-data-found">
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
                <template v-for="{ folder, file } in items">
                  <Folder
                    v-if="folder"
                    :key="'folder-' + folder.id"
                    :folder="folder"
                    :mode="mode"
                    :style="{
                      // 'transition-delay': `${(i % 12) * 30}ms !important`,
                    }"
                    :selected="folderSelection[folder.id]"
                    @removeMe="removeFolders"
                    @click:selected="toggleFolderSelection"
                    @selectedDrop="dropDown"
                  />
                  <Resource
                    v-else-if="file"
                    :key="'file-' + file.id"
                    :file="file"
                    :style="{
                      //'transition-delay': `${
                      // ((subFolders.length + i) % 12) * 30
                      //}ms !important`,
                    }"
                    :mode="mode"
                    :deleting="deleting"
                    :selected="selection[file.id]"
                    @click:selected="toggleSelection"
                    @selectedDrop="dropDown"
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
      ref="selectionbar"
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
  layout: 'app-sidebar',
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
    dashboardData() {
      return this.$store.state.appData.dashboardData
    },
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
      return [...this.allItems].slice(
        0,
        this.localPage * this.sorting.totalAssetCount
      )
      // return [...this.allItems]
    },
    localTotalPages() {
      return Math.ceil(this.allItems.length / 12)
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
        folder = { folder: this.$route.params.folder_name }
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
          .catch()
      // .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
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
    this.$store.dispatch('appData/fetchDashboardData')
    this.$store.dispatch('appData/fetchFolders')
    this.$store.dispatch('appData/getCollections')
    this.getData()
  },
  methods: {
    // dropdown functionality
    dropDown(file, type, resourceType) {
      // this.selectedFiles = []
      // this.selectedFolders = []
    },
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
      this.localPage = 1
      this.lastPage = -1
      this.totalApiAssets = null
      this.deleting = false
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
        folderToTraverse =
          this.currentFolder.sub_category_data.sort(
            this.$sortBy('folder_name', false, null, true)
          ) || []
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
        page: this.page,
        sort_value: this.apiSortValue(),
        sort_by: this.apiSortOrder(),
        workspace_id: this.$getWorkspaceId(),
        type: this.hashParam,
        total_record: this.sorting.totalAssetCount,
      }

      await this.$axios
        .$post(
          'digital/view-all-assets-by-type?' + this.$toQueryString(body),
          body
        )
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
        .then(
          ({ data }) =>
            (this.files =
              data.category_assets.sort(
                this.$sortBy('display_file_name', false, null, true)
              ) || [])
        )
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
      const body = {
        page: this.page,
        sort_value: this.apiSortValue(),
        sort_by: this.apiSortOrder(),
        workspace_id: this.$getWorkspaceId(),
        category_id: this.hashParam,
        total_record: this.sorting.totalAssetCount,
      }

      await this.$axios
        .$get(
          'digital/view-files-with-category?' + this.$toQueryString(body),
          body
        )
        .then(({ data }) => {
          if (this.hashParam !== hashParam) return

          // if (data.category_assets.last_page < this.page) {
          //   this.page = 1
          //   return this.getData()
          // } else this.page = data.category_assets.current_page

          // this.totalApiAssets = data.category_assets.total

          // this.lastPage = data.category_assets.last_page
          this.breadcrumb = data.breadcrumb
          this.subFolders = makeFolder(
            data.folder.sort(this.$sortBy('folder_name', false, null, true)) ||
              []
          )
          this.files =
            data.category_assets.sort(
              this.$sortBy('display_file_name', false, null, true)
            ) || []

          // if (this.hashParam !== hashParam) return
          // this.breadcrumb = data.breadcrumb

          // this.lastPage = data.category_assets.last_page
          // this.totalApiAssets = data.category_assets.total

          // this.files = data.category_assets.data || []
          // // this.subFolders = makeFolder(data.folder || [])

          // if (this.page > data.category_assets.last_page) {
          //   this.page = data.category_assets.last_page
          //   return
          // }

          // this.page = data.category_assets.current_page
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
  head() {
    return {
      title: 'Folders | ' + this.$brandName(),
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          hid: 'favicon',
          href: this.$auth.user.branding.brand_favicon || '/favicon.png',
        },
      ],
    }
  },
}
</script>
