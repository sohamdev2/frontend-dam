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
        <div key="header" class="arange-filters">
          <div class="preview-head"></div>
          <div class="name-head sorting">
            <span>Name</span>
            <SortIcon
              @click="
                sort('category', 'folder_name', $sortToUpperCase)
                sort('assets', 'display_file_name', $sortToUpperCase)
              "
            />
          </div>
          <div class="format-type sorting">
            <span>Assets</span>
            <SortIcon
              @click="
                sort('category', 'total_assets', $sortToTypedNumber)
                sort('assets', 'file_type', $sortToUpperCase)
              "
            />
          </div>
          <div class="date sorting">
            <span>Date</span>
            <SortIcon
              @click="
                sort('category', 'date', $sortToTime)
                sort('assets', 'date', $sortToTime)
              "
            />
          </div>
          <div class="size sorting">
            <span>Size</span>
            <SortIcon
              @click="
                sort('category', 'folder_name', $sortToUpperCase)
                sort('assets', 'file_size', $sortToTypedNumber)
              "
            />
          </div>
          <div class="action-head">Action</div>
        </div>
        <Folder
          v-for="folder in category"
          :key="'folder-' + folder.id"
          :folder="folder"
          :mode="mode"
          share-mode
          @click.capture.native="nextStack(folder.id)"
        />
        <Resource
          v-for="file in assets"
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
export default {
  asyncData({ params, query, $axios, redirect }) {
    return $axios
      .$get(`show-share-assets?type=${params.type}&status=${query.status}`)
      .then(({ data }) => ({
        category: data.category || [],
        assets: data.assets || [],
        stack: [{ category: data.category || [], assets: data.assets || [] }],
      }))
      .catch((e) => {
        console.log(e)
        redirect('/')
      })
  },
  data() {
    return {
      mode: 'column',
      deleting: false,
      loading: false,
      sorting: {
        category: {},
        assets: {},
      },
    }
  },
  computed: {
    noData() {
      return !this.category.length && !this.assets.length
    },
  },
  watch: {
    loading(loading) {
      if (loading) this.$nuxt.$loading.start()
      else this.$nuxt.$loading.finish()
    },
  },
  mounted() {
    window.onpopstate = () => this.prevStack()
    this.$router.replace({
      query: {
        status: this.$route.query.status,
      },
    })
  },
  methods: {
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
    prevStack(folderId) {
      if (this.stack.length > 1) this.stack.pop()

      const { category, assets } = this.stack[this.stack.length - 1]

      this.category = category
      this.assets = assets
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
          this.category = data.folder || []
          this.assets = data.category_assets || []
          this.stack.push({
            category: this.category,
            assets: this.assets,
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
</style>
