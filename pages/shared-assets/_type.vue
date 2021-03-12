<template>
  <div class="overflow-auto w-100" style="height: 100vh">
    <div class="container">
      <h3 class="my-4">Shared File and folders</h3>
      <div v-if="noData" key="no-data" class="no-data-found">
        <img
          src="@/assets/img/no-data-image.svg"
          alt="No Data Found"
          class="img-responsive"
        />
        <h4>No Data Found</h4>
      </div>
      <div v-else class="resource-container" :class="[`${mode}-resource`]">
        <ListingHeader
          v-if="!loading"
          key="header"
          :sorting.sync="sorting.toolbar.value"
          @sort="(args) => args.forEach((arg) => sort(...arg))"
        />
        <Folder
          v-for="folder in subFolders"
          :key="'folder-' + folder.id"
          :folder="folder"
          :mode="mode"
          share-mode
          @click.capture.native="nextStack(folder.id)"
        />
        <Resource
          v-for="file in files"
          :key="'file-' + file.id"
          :file="file"
          :mode="mode"
          share-mode
        />
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
  mixins: [assetSorting],
  asyncData({ params, query, $axios, redirect, error, $getErrorMessage }) {
    return $axios
      .$get(`show-share-assets?type=${params.type}&status=${query.status}`)
      .then(({ data }) => {
        if (!data.category.length && !data.assets.length)
          return error({ status: 404 })
        const subFolders = makeFolder(data.category || [])
        const files = data.assets || []

        return {
          subFolders,
          files,
          stack: [{ subFolders, files }],
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

<style>
.dam-preview {
  width: auto;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.sorting {
  cursor: pointer;
}
</style>
