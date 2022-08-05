<template>
  <div class="body-content-right customscrollbar">
    <!--  Filter  -->
    <SearchBar />
    <!--  Categories  -->
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
    <div
      v-if="!loading"
      class="section-title d-flex flex-column flex-lg-row align-items-center"
    >
      <div class="sec-title-left d-flex align-items-center">
        <nuxt-link
          :to="{
            name: 'brand_name',
          }"
          class="home-icon"
        >
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
        </nuxt-link>
        <div class="breadcrumb-links">
          <ul>
            <li>&nbsp;</li>
            <li><span>Store</span></li>
          </ul>
        </div>
      </div>
      <div class="sec-title-right d-flex align-items-center ml-lg-auto">
        <div class="table-filter">
          <ul>
            <li>{{ totalAssets }} Products</li>
            <li>
              <div class="search-by small-wd">
                <Select2
                  v-model="intialCount"
                  :value="intialCount"
                  :options="assetCountOptions"
                  placeholder="Filter"
                  :attrs="{ minimumResultsForSearch: -1 }"
                />
              </div>
            </li>
            <li>
              <div class="gried-view">
                <span class="active gridview" @click="mode = 'row'">
                  <svg
                    id="Layer_1"
                    class="gridview-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4377" transform="translate(-594.872 -288.043)">
                      <path
                        id="Path_3460"
                        class="fill-color"
                        d="M600.9,289.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H600.9 M600.9,288h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C602.9,288.9,602,288,600.9,288z"
                      ></path>
                      <path
                        id="Path_3461"
                        class="fill-color"
                        d="M610.9,289.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H610.9 M610.9,288h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C612.9,288.9,612,288,610.9,288z"
                      ></path>
                      <path
                        id="Path_3462"
                        class="fill-color"
                        d="M600.9,299.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H600.9 M600.9,298h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C602.9,298.9,602,298,600.9,298z"
                      ></path>
                      <path
                        id="Path_3463"
                        class="fill-color"
                        d="M610.9,299.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H610.9 M610.9,298h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C612.9,298.9,612,298,610.9,298z"
                      ></path>
                    </g>
                  </svg>
                </span>
                <span class="listview" @click="mode = 'column'">
                  <svg
                    id="Layer_1"
                    class="listview-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4378" transform="translate(-645.53 -288.043)">
                      <path
                        id="Path_3464"
                        class="fill-color"
                        d="M648.5,289.5v1.5H647v-1.5H648.5 M648.5,288H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5v-1.5C650,288.7,649.4,288,648.5,288z"
                      ></path>
                      <path
                        id="Path_3465"
                        class="fill-color"
                        d="M662.8,291H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,291,662.8,291L662.8,291z"
                      ></path>
                      <path
                        id="Path_3466"
                        class="fill-color"
                        d="M648.5,296.3v1.5H647v-1.5H648.5 M648.5,294.8H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5v-1.5C650,295.5,649.4,294.8,648.5,294.8L648.5,294.8z"
                      ></path>
                      <path
                        id="Path_3467"
                        class="fill-color"
                        d="M662.8,297.8H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,297.8,662.8,297.8L662.8,297.8z"
                      ></path>
                      <path
                        id="Path_3468"
                        class="fill-color"
                        d="M648.5,303v1.5H647V303H648.5 M648.5,301.5H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5V303C650,302.2,649.4,301.5,648.5,301.5z"
                      ></path>
                      <path
                        id="Path_3469"
                        class="fill-color"
                        d="M662.8,304.5H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,304.5,662.8,304.5L662.8,304.5z"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
        <p>No Products Available</p>
      </div>
    </div>
    <div
      v-else
      class="resource-wrapper"
      :class="[`${mode}` == 'row' ? 'grid-tile' : 'grid-list']"
    >
      <div class="common-box bg-gray">
        <div class="table-list-view">
          <ul v-if="!loading" class="thead p0">
            <li>
              <div class="preview-img sorting flex10">
                <label class="check-label">
                  <input
                    type="checkbox"
                    name=""
                    :checked="selectedAll"
                    :value="selectedAll"
                    @click="
                      ($event) =>
                        $event.target.checked ? selectAll() : selectNone()
                    "
                  />
                  <span class="check-span"></span>
                </label>
              </div>
              <div
                class="categary-name sorting sortarrow flex27"
                :class="[
                  sortData === 'display_file_name' && currentSort === 'DESC'
                    ? 'active descending'
                    : '',
                ]"
              >
                <span @click="sort()">Name</span>
              </div>
              <div class="assets sorting flex18">
                <span>Assets</span>
              </div>
              <div class="update-date sorting flex18">
                <span>Date Uploaded</span>
              </div>
              <div class="size sorting flex12">
                <span>Size</span>
              </div>
              <div class="categary-action sorting text-right flex15">
                <span>Action</span>
              </div>
            </li>
          </ul>
          <ul class="tbody">
            <template v-for="file in files">
              <Resource
                :key="'file-' + file.id"
                :file="file"
                :mode="mode"
                :selected="selection[file.id]"
                @click:selected="toggleSelection"
                @selectedDrop="dropDown"
                @emitCart="addToCart(file)"
              />
            </template>
          </ul>
          <Pagination
            v-if="lastPage > 1 && !loading"
            key="pagination"
            class="pb-5"
            :class="{ 'mb-5': mode == 'column' }"
            :last-page="lastPage"
            :current-page.sync="current_page"
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
          <!-- pagination -->
        </div>
      </div>
    </div>
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
    <AddToCartModal v-if="file" ref="cartDialog" :file="file" />
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import assetSorting from '~/mixins/assetSorting'
// import ListingHeader from '~/components/dam/ListingHeader'
import Resource from '~/components/dam/Resource'
import fileSelection from '~/mixins/fileSelection'
import SelectionBar from '~/components/dam/SelectionBar'
// import ErrorPage from '~/pages/404.vue'
export default {
  layout: 'app-sidebar',
  middleware: ['check-url', 'check-auth'],
  components: {
    ContentLoader,
    // ListingHeader,
    Resource,
    SelectionBar,
    // ErrorPage,
  },
  mixins: [fileSelection, assetSorting],
  data() {
    let current_page
    if (this.$route.query.page) {
      const queryPage = Number(this.$route.query.page)
      current_page = isNaN(queryPage) ? 1 : queryPage
    } else current_page = 1

    return {
      files: [],
      mode: 'row', // [tile, list] Style
      file: null,
      loading: true,
      deleting: false,
      // dropdown feature
      resource: [],
      resourceType: null,
      productNotFound: false,
      // pagination
      current_page, // currentPage
      lastPage: -1,
      totalApiAssets: null,
      intialCount: '12',
      assetCountOptions: [
        { text: '12', id: '12' },
        { text: '20', id: '20' },
        { text: '40', id: '40' },
        { text: '80', id: '80' },
        { text: '100', id: '100' },
      ],
      currentSort: 'ASC',
      sortData: 'display_file_name',
      identifier: Date.now(),
      noData: false,
    }
  },
  computed: {
    selectedCount() {
      return this.selectedFiles.length
    },
    selectedAll() {
      const length = this.files.length
      return !!length && this.selectedCount === length
    },
    totalAssets() {
      return this.files.length
    },
    localTotalPages() {
      return Math.ceil(this.files.length / 12)
    },
  },
  watch: {
    intialCount() {
      this.getData()
    },
    current_page(page) {
      if (page === -1) {
        this.$router.replace({
          query: null,
        })
      } else {
        this.$router.replace({
          query: { page },
        })
        this.getData()
      }
    },
  },
  mounted() {
    this.$store.dispatch('appData/fetchFolders')
    this.getData()
  },
  methods: {
    prefetch() {
      this.identifier += 1
      this.lastPage = -1
      this.totalApiAssets = null
      this.deleting = false
      this.getData()
    },
    async getData() {
      this.loading = true
      this.noData = false
      this.files = []
      this.selectNone()
      await this.getProducts()
      this.noData = !this.files.length
      this.loading = false
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
    sort() {
      this.currentSort === 'DESC'
        ? (this.currentSort = 'ASC')
        : (this.currentSort = 'DESC')
      this.files = this.files.sort(
        this.$sortBy(
          'display_file_name',
          this.currentSort === 'DESC',
          null,
          true
        )
      )
    },
    addToCart(file) {
      this.file = file
      this.$nextTick(() => {
        this.$refs.cartDialog.toggleModel()
      })
    },
    removeSelectedFiles() {
      const fileIds = this.selectedFiles.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))
      this.selectedFiles = []
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
    selectAll() {
      this.selectedFiles = [...this.files]
    },
    dropDown() {
      this.resource = []
      this.resourceType = null
    },
    // get Product items
    async getProducts() {
      this.loading = true
      this.productNotFound = false
      await this.$axios
        .$get(
          `digital/store/product-list?workspace_id=${this.$getWorkspaceId()}&total_record=${
            this.intialCount
          }&page=${this.current_page}`
        )
        .then(({ data }) => {
          this.current_page = data.current_page
          this.lastPage = data.last_page
          this.files = data.data.sort(
            this.$sortBy('display_file_name', false, null, true)
          )
        })
        .catch((error) => {
          this.$toast.global.error(this.$getErrorMessage(error))
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  head() {
    return {
      title: 'Store | ' + this.$brandName() || 'Digital Asset Manager',
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
<style></style>
