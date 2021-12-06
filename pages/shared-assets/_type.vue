<template>
  <div class="body-content">
    <div class="body-content-auto w-100">
      <div class="common-box-header">
        <h2 class="title">Shared File and folders</h2>
      </div>
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
      <div
        v-else
        class="resource-wrapper share-inner-table w-100"
        :class="[`${mode}` == 'row' ? 'grid-tile' : 'grid-list']"
      >
        <div class="common-box bg-gray h-100">
          <div class="table-list-view h-100">
            <ListingHeaderSharedResource
              v-if="!loading"
              key="header"
              :sorting.sync="sorting.toolbar.value"
              :reverse="sorting.toolbar.desc"
              @sort="(args) => args.forEach((arg) => sort(...arg))"
            />
            <ul class="tbody customscrollbar">
              <SharedFolder
                v-for="folder in subFolders"
                :key="'folder-' + folder.id"
                :folder="folder"
                :mode="mode"
                share-mode
                @click.capture.native="nextStack(folder.id)"
              />
              <SharedResource
                v-for="file in files"
                :key="'file-' + file.id"
                :file="file"
                :mode="mode"
                share-mode
                :share-id="shareId"
                :share-workspace-id="workspaceId"
              />
              <!-- <li>
                <div class="categary-name tb-column flex52">
                  <div class="media">
                    <div class="media-left">
                      <div class="categary-image">
                        <img src="img/file/ai.svg" alt="Folder Icon" />
                      </div>
                    </div>
                    <div class="media-body">
                      <div class="top-column">
                        <a
                          href="javascript:void(0);"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Ambulance Lead Times"
                          >Ambulance Lead Times</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="assets tb-column flex15">
                  <div class="top-column">
                    <label>ai</label>
                  </div>
                </div>
                <div class="update-date tb-column flex15">
                  <div class="top-column">
                    <label>27 Jul 2020</label>
                  </div>
                </div>
                <div class="size tb-column flex10">
                  <div class="top-column">
                    <label>200 kb</label>
                  </div>
                </div>
                <div class="categary-action tb-column flex8">
                  <div class="top-column">
                    <div class="categary-actions text-center">
                      <a href="javascript:void(0);">
                        <img src="img/download.svg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
    <DownloadingIndicator />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import assetSorting from '@/mixins/assetSorting'

function makeFolder(array) {
  return [...array].map((folder) => ({
    ...folder,
    total_contain:
      (folder.total_assets || 0) + (folder.sub_category_count || 0),
  }))
}

export default {
  layout: 'app-min-no-search',
  mixins: [assetSorting],
  asyncData({ params, query, $axios, redirect, error, $getErrorMessage }) {
    return $axios
      .$get(`show-share-assets?type=${params.type}&status=${query.status}`)
      .then(({ data }) => {
        if (!data.category.length && !data.assets.length)
          return error({
            status: 404,
            message: 'Requested files or folders were removed.',
          })
        const subFolders = makeFolder(data.category || [])
        const files = data.assets || []
        const shareId = data.share_id
        const workspaceId = data.workspace_id

        return {
          shareId,
          subFolders,
          files,
          stack: [{ subFolders, files }],
          workspaceId,
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
    }
  },
  computed: {
    noData() {
      return !this.subFolders.length && !this.files.length
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
    window.onpopstate = () => this.prevStack()

    if (this.$route.query.file)
      this.$router.replace({
        query: {
          status: this.$route.query.status,
        },
      })
  },
  methods: {
    prevStack() {
      if (this.stack.length > 1) this.stack.pop()

      const { subFolders, files } = this.stack[this.stack.length - 1]

      this.subFolders = subFolders
      this.files = files
    },
    async nextStack(folderId) {
      if (this.loading) return
      this.loading = true

      this.$router.push({
        query: {
          status: this.$route.query.status,
          file: btoa(String(folderId)),
        },
      })

      await this.$axios
        .$get(
          'view-share-files-with-category?' +
            this.$toQueryString({ category_id: folderId })
        )
        .then(({ data }) => {
          this.subFolders = makeFolder(data.folder || [])

          this.files = data.category_assets || []

          this.stack.push({
            subFolders: this.subFolders,
            files: this.files,
          })
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.loading = false
    },
  },
  head() {
    return {
      title: 'Share assets',
    }
  },
}
</script>
