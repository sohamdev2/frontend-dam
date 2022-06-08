<template>
  <div class="container">
    <div
      class="SharedInfo"
      style="height: 100vh"
      :class="{
        show: allAssetsCount && statusType == 'collection',
      }"
    >
      <div class="common-box-header mt20">
        <h2 v-if="statusType == 'collection'" class="title pl0">
          Shared Collection
        </h2>
        <h2 v-else class="title pl0">Shared File and folders</h2>
      </div>
      <div v-if="allAssetsCount && statusType == 'collection'" class="box">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Collection Name</label>
              <p>{{ collectionName ? collectionName : '-' }}</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="control-label">Last Updated</label>
              <p>
                {{
                  collectionLastModifiedDate
                    ? $moment(collectionLastModifiedDate).format('Do, MMM YYYY')
                    : '-'
                }}
              </p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="control-label">Collection Owner</label>
              <p>{{ collectionOwner ? collectionOwner : '-' }}</p>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb0">
              <label class="control-label">Collection Description</label>
              <p>
                <strong>{{
                  collectionDescription ? collectionDescription : '-'
                }}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="btns mb20 d-flex align-items-center"
        style="min-height: 32px"
        :class="{
          'justify-content-between': breadcrumbs.length,
          'justify-content-end': !breadcrumbs.length,
        }"
      >
        <div v-if="breadcrumbs.length">
          <a class="home-icon" @click="goToHomeList()">
            <svg
              id="Layer_1"
              class="home-icon orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 16.2 18"
              xml:space="preserve"
            >
              <g id="Group_4409" transform="translate(-871.194 -659.595)">
                <g id="Path_3470">
                  <path
                    id="Path_3514"
                    class="fill-color"
                    d="M879.3,661.5l6.6,5.1v9.2c0,0.2-0.1,0.3-0.3,0.3H873c-0.2,0-0.3-0.1-0.3-0.3v-9.2L879.3,661.5M879.3,659.6l-8.1,6.3v9.9c0,1,0.8,1.8,1.8,1.8h12.6c1,0,1.8-0.8,1.8-1.8v-9.9L879.3,659.6z"
                  ></path>
                </g>
                <g id="Path_3471">
                  <path
                    id="Path_3515"
                    class="fill-color"
                    d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
                  ></path>
                </g>
              </g>
            </svg>
          </a>
          <div class="breadcrumb-links">
            <ul>
              <li>&nbsp;</li>
              <li v-for="(crumb, i) in breadcrumbs" :key="i">
                <a v-if="crumb.url" @click="nextStack(crumb.folderId)">{{
                  crumb.name
                }}</a>
                <span v-else>{{ crumb.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="allAssetsCount">
          <a
            v-if="
              allAssetsCount &&
              (selectedCount == 0 || selectedCount == allAssetsCount)
            "
            href="javascript:void(0);"
            class="btn btn-icon"
            @click="downloadSelectedMultipleFiles()"
            ><svg
              id="Layer_1"
              class="download-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4359" transform="translate(-153.745 -317.549)">
                <path
                  id="Path_3427"
                  class="fill-color"
                  d="M156.4,335.5c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H156.4z"
                ></path>
                <path
                  id="Path_3428"
                  class="fill-color"
                  d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                ></path>
                <path
                  id="Path_3429"
                  class="fill-color"
                  d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                ></path>
              </g>
            </svg>
            <template v-if="statusType == 'collection'"
              >Download Collection</template
            >
            <template v-else>Download All</template>
          </a>
          <a
            v-if="selectedCount && selectedCount != allAssetsCount"
            href="javascript:void(0);"
            class="btn btn-icon"
            @click="downloadSelectedMultipleFiles()"
          >
            <svg
              id="Layer_1"
              class="download-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4359" transform="translate(-153.745 -317.549)">
                <path
                  id="Path_3427"
                  class="fill-color"
                  d="M156.4,335.5c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H156.4z"
                ></path>
                <path
                  id="Path_3428"
                  class="fill-color"
                  d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                ></path>
                <path
                  id="Path_3429"
                  class="fill-color"
                  d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                ></path>
              </g>
            </svg>
            Download ({{ selectedCount }})</a
          >
        </div>
      </div>

      <div
        class="body-content-main resource-wrapper"
        :class="[`${mode}` == 'row' ? 'grid-tile' : 'grid-list']"
        style="height: calc(100% - 130px)"
      >
        <div class="common-box bg-gray h-100" style="padding: 8px 0px">
          <div class="table-list-view multi-table-view category-wrapper h-100">
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
            <template v-else-if="!loading">
              <ListingHeaderSharedResource
                key="header"
                :selected-all="selectedAll"
                :assets-count="allAssetsCount"
                :selected-count="selectedCount"
                :sorting.sync="sorting.toolbar.value"
                :reverse="sorting.toolbar.desc"
                @click:select-all="selectAll"
                @click:select-none="selectNone"
                @sort="(args) => args.forEach((arg) => sort(...arg))"
              />
              <div class="customscrollbar no_footer" style="padding: 0px 8px">
                <ul class="tbody">
                  <SharedFolder
                    v-for="folder in subFolders"
                    :key="'folder-' + folder.id"
                    :folder="folder"
                    :mode="mode"
                    share-mode
                    :share-id="shareId"
                    :share-workspace-id="workspaceId"
                    :selected="folderSelection[folder.id]"
                    @click:selected="toggleFolderSelection"
                    @nextStack="nextStack"
                  />
                  <SharedResource
                    v-for="file in files"
                    :key="'file-' + file.id"
                    :file="file"
                    :mode="mode"
                    share-mode
                    :share-id="shareId"
                    :share-workspace-id="workspaceId"
                    :selected="selection[file.id]"
                    @click:selected="toggleSelection"
                  />
                </ul>
              </div>
            </template>
            <div v-else class="customscrollbar">
              <ContentLoader
                :speed="1"
                :animate="true"
                :width="450"
                :height="200"
                class="normalLoader"
              >
                <rect x="0" y="5" rx="1" ry="1" width="450" height="40" />
                <rect x="0" y="50" rx="1" ry="1" width="450" height="40" />
                <rect x="0" y="95" rx="1" ry="1" width="450" height="40" />
                <rect x="0" y="140" rx="1" ry="1" width="450" height="40" />
              </ContentLoader>
            </div>
          </div>
        </div>
      </div>
      <DownloadingIndicator />
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

/* eslint-disable camelcase */
import assetSorting from '@/mixins/assetSorting'
import fileSelection from '@/mixins/fileSelection'

function makeFolder(array) {
  return [...array].map((folder) => ({
    ...folder,
    total_contain:
      (folder.total_assets || 0) + (folder.sub_category_count || 0),
  }))
}

export default {
  layout: 'app-min-no-search',
  components: {
    ContentLoader,
  },
  mixins: [assetSorting, fileSelection],
  asyncData({ params, query, $axios, redirect, error, $getErrorMessage }) {
    return $axios
      .$get(`show-share-assets?type=${params.type}&status=${query.status}`)
      .then(({ data }) => {
        if (!data.category?.length && !data.assets?.length)
          return error({
            status: 404,
            message: 'Requested files or folders were removed.',
          })
        const subFolders = makeFolder(data.category || [])
        const files = data.assets || []
        const shareId = data.share_id
        const statusType = data.status_type
        const workspaceId = data.workspace_id
        const faviconIcon = data.brand_favicon
        const collectionName = data.collection_name
        const collectionDescription = data.collection_description
        const collectionLastModifiedDate = data.collection_updated_at
        const collectionOwner = data.collection_user
          ? data.collection_user.name
          : null

        return {
          shareId,
          subFolders,
          files,
          stack: [{ subFolders, files }],
          workspaceId,
          statusType,
          faviconIcon,
          collectionName,
          collectionDescription,
          collectionLastModifiedDate,
          collectionOwner,
        }
      })
      .catch((e) => {
        error({ status: 404, message: $getErrorMessage(e) })
      })
  },
  data() {
    return {
      mode: 'column',
      deleting: false,
      loading: false,
      breadcrumb: null,
    }
  },
  computed: {
    noData() {
      return !this.subFolders.length && !this.files.length
    },
    selectedCount() {
      return this.selectedFiles.length + this.selectedFolders.length
    },
    selectedAll() {
      const length = this.files.length + this.subFolders.length
      /* return this.currentFolder
        ? !!length && this.selectedCount === length
        : false */
      return !!length && this.selectedCount === length
    },
    allAssetsCount() {
      return this.files.length + this.subFolders.length
    },
    breadcrumbs() {
      const breadcrumbs = []

      const recursivePush = (item, array) => {
        if (!item) return

        array.push({
          name: item.folder_name,
          folderId: item.id,
          url:
            btoa(String(item.id)).toString() !== this.hashParam.toString()
              ? {
                  query: {
                    status: this.$route.query.status,
                    file: btoa(String(item.id)),
                  },
                }
              : null,
        })

        recursivePush(item.parent, array)
      }

      recursivePush(this.breadcrumb, breadcrumbs)
      return breadcrumbs.reverse()
    },
    hashParam() {
      return this.$route.query.file ? this.$route.query.file : ''
    },
  },
  watch: {
    loading(loading) {
      if (loading) this.$nuxt.$loading.start()
      else this.$nuxt.$loading.finish()
    },
  },
  created() {
    this.sort('subFolders', 'folder_name', this.$sortToUpperCase)
    this.sort('files', 'display_file_name', this.$sortToUpperCase)
  },
  mounted() {
    this.$axios
      .$post(`share-link-view`, {
        workspace_id: this.workspaceId,
        id: this.shareId,
      })
      .catch(this.$errorToast)
    window.onpopstate = () => this.prevStack()

    if (this.$route.query.file)
      this.$router.replace({
        query: {
          status: this.$route.query.status,
        },
      })
  },
  methods: {
    async prevStack() {
      this.selectNone()
      /* if (this.stack.length > 1) this.stack.pop()

      const { subFolders, files } = this.stack[this.stack.length - 1]

      this.subFolders = subFolders
      this.files = files */
      if (this.$route.query.file) {
        await this.sharedFilesList(atob(String(this.$route.query.file)))
      } else {
        this.goToHomeList()
      }
    },
    async nextStack(folderId) {
      if (this.loading) return
      this.loading = true
      this.selectNone()
      this.$router.push({
        query: {
          status: this.$route.query.status,
          file: btoa(String(folderId)),
        },
      })

      await this.sharedFilesList(folderId)

      this.loading = false
    },
    async sharedFilesList(folderId) {
      await this.$axios
        .$post('view-share-files-with-category?', {
          category_id: folderId,
          share_id: this.shareId,
        })
        .then(({ data }) => {
          this.subFolders = makeFolder(data.folder || [])

          this.files = data.category_assets || []
          this.breadcrumb = data.breadcrumb
          this.stack.push({
            subFolders: this.subFolders,
            files: this.files,
          })
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
    goToHomeList() {
      this.breadcrumb = null
      this.$router.push({
        query: {
          status: this.$route.query.status,
        },
      })
      this.showSharedAssetsList()
    },
    selectAll() {
      this.selectedFiles = [...this.files]
      this.selectedFolders = [...this.subFolders]
    },
    downloadSelectedMultipleFiles() {
      if (
        this.selectedFiles.length === 0 &&
        this.selectedFolders.length === 0
      ) {
        this.$store.dispatch('downloadIndicator/downloadMultipleSharedFiles', {
          files: this.files.map(({ id }) => id),
          folders: this.subFolders.map(({ id }) => id),
          shareId: this.shareId,
          shareWorkspaceId: this.workspaceId,
        })
      } else {
        this.$store.dispatch('downloadIndicator/downloadMultipleSharedFiles', {
          files: this.selectedFiles.map(({ id }) => id),
          folders: this.selectedFolders.map(({ id }) => id),
          shareId: this.shareId,
          shareWorkspaceId: this.workspaceId,
        })
      }
    },
    showSharedAssetsList() {
      this.$axios
        .$get(
          `show-share-assets?type=${this.$route.params.type}&status=${this.$route.query.status}`
        )
        .then(({ data }) => {
          if (!data.category?.length && !data.assets?.length)
            this.$nuxt.error({
              statusCode: 404,
              path: this.$route.path,
              message: 'Requested files or folders were removed.',
            })
          this.subFolders = makeFolder(data.category || [])
          this.files = data.assets || []
          this.shareId = data.share_id
          this.workspaceId = data.workspace_id
          this.statusType = data.status_type
          this.faviconIcon = data.brand_favicon
          this.collectionName = data.collection_name
          this.collectionDescription = data.collection_description
          this.collectionLastModifiedDate = data.collection_updated_at
          this.collectionOwner = data.collection_user
            ? data.collection_user.name
            : null
          this.stack.push({
            subFolders: this.subFolders,
            files: this.files,
          })
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
  },
  head() {
    return {
      title: 'Share assets',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          hid: 'favicon',
          href: this.faviconIcon || '/favicon.png',
        },
      ],
    }
  },
}
</script>
