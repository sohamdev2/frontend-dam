<template>
  <div class="body-content collection-list-body">
    <ErrorPage v-if="collectionNotFound" />
    <template v-else>
      <div
        class="section-title collection-header d-flex flex-column flex-lg-row align-items-center mt0"
      >
        <div class="sec-title-left d-flex align-items-center">
          <nuxt-link
            v-if="!loading"
            :to="{
              name: 'brand_name',
              params: { brand_name: $getBrandName() },
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
          <div v-if="!loading" class="breadcrumb-links">
            <ul>
              <li>&nbsp;</li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'brand_name-collection',
                    params: { brand_name: $getBrandName() },
                  }"
                  >Collections</nuxt-link
                >
              </li>
              <li>
                <span class="title">{{ assetList.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="sec-title-right d-flex align-items-center ml-lg-auto">
          <div class="table-filter">
            <ul>
              <li v-if="!loading">
                {{ assetList.assets_count }} Asset<template
                  v-if="assetList.assets_count > 1"
                  >s</template
                >
              </li>
              <li>
                <div class="gried-view">
                  <span
                    class="gridview"
                    :class="{ active: mode == 'tile' }"
                    @click="changeView('tile')"
                  >
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
                      <g
                        id="Group_4377"
                        transform="translate(-594.872 -288.043)"
                      >
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
                  <span
                    class="listview"
                    :class="{ active: mode == 'list' }"
                    @click="changeView('list')"
                  >
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
                      <g
                        id="Group_4378"
                        transform="translate(-645.53 -288.043)"
                      >
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
      <div class="resource-wrapper" :class="[`grid-${mode}`]">
        <div class="common-box bg-gray h-100">
          <div class="table-list-view collection-table h-100">
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
                <template v-if="mode === 'list'">
                  <rect x="0" y="7" rx="4" ry="4" width="450" height="40" />
                  <rect x="0" y="53" rx="4" ry="4" width="450" height="40" />
                  <rect x="0" y="99" rx="4" ry="4" width="450" height="40" />
                  <rect x="0" y="145" rx="4" ry="4" width="450" height="40" />
                </template>
                <template v-else>
                  <rect x="0" y="7" rx="4" ry="4" width="108" height="108" />
                  <rect x="114" y="7" rx="4" ry="4" width="108" height="108" />
                  <rect x="228" y="7" rx="4" ry="4" width="108" height="108" />
                  <rect x="342" y="7" rx="4" ry="4" width="108" height="108" />
                </template>
              </ContentLoader>
            </div>
            <template v-else>
              <ListingHeader
                ref="listingheader"
                key="header"
                :deleting="deleting"
                :reverse="sorting.toolbar.desc"
                :sorting.sync="sorting.toolbar.value"
                @click:select-none="selectNone"
                @sort="(args) => args.forEach((arg) => sort(...arg))"
              />
              <div class="customscrollbar">
                <transition-group
                  key="folder-list"
                  class="tbody"
                  name="slide-up"
                  mode="in-out"
                  tag="ul"
                >
                  <div
                    v-if="files.length === 0"
                    key="no-data"
                    class="no-data-found"
                  >
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
                        <g
                          id="Group_4457"
                          transform="translate(-190.348 -177.624)"
                        >
                          <path
                            id="Path_3564"
                            class="fill-color"
                            d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                          ></path>
                          <path
                            id="Path_3565"
                            class="fill-color"
                            d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                          ></path>
                        </g>
                      </svg>
                      <p>You don't have any assets in this collection.</p>
                    </div>
                  </div>
                  <template v-for="file in files" v-else>
                    <Resource
                      v-if="file"
                      :key="'file-' + file.id"
                      :file="file"
                      :mode="mode"
                      :selected="selection[file.id]"
                      :deleting="deleting"
                      @selectedDrop="dropDown"
                      @click:selected="toggleSelection"
                    />
                  </template>
                </transition-group>
              </div>
            </template>
          </div>
        </div>
      </div>
      <SelectionBar
        ref="selectionbar"
        :selected-files="selectedFiles"
        :selected-folders="selectedFolders"
        :selected-all="selectedAll"
        :deleting.sync="deleting"
        @click:select-all="selectAll"
        @click:select-none="selectNone"
      />
      <DownloadingIndicator />
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import assetSorting from '~/mixins/assetSorting'
import ListingHeader from '~/components/dam/ListingHeader'
import Resource from '~/components/dam/Resource'
import fileSelection from '~/mixins/fileSelection'
import SelectionBar from '~/components/dam/SelectionBar'
import ErrorPage from '~/pages/404.vue'
export default {
  layout: 'app',
  middleware: ['check-url', 'check-auth'],
  components: {
    ContentLoader,
    ListingHeader,
    Resource,
    SelectionBar,
    ErrorPage,
  },
  mixins: [fileSelection, assetSorting],
  data() {
    return {
      assetList: {},
      files: [],
      mode: 'tile', // [tile, list] Style
      loading: true,
      deleting: false,
      // dropdown feature
      resource: [],
      resourceType: null,
      collectionNotFound: false,
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
  },
  created() {
    this.getCollectionAssets()
  },
  methods: {
    selectAll() {
      this.selectedFiles = [...this.files]
    },
    dropDown() {
      this.resource = []
      this.resourceType = null
    },
    // grid list view
    changeView(data) {
      this.mode = data
    },
    // get collection's assets list
    async getCollectionAssets() {
      this.loading = true
      this.collectionNotFound = false
      await this.$axios
        .$get(
          `/digital/collection/${
            this.$route.params.id
          }/assets?url_workspace_id=${this.$getWorkspaceId()}`
        )
        .then((response) => {
          this.assetList = response.data
          this.files = response.data.assets.sort(
            this.$sortBy('display_file_name', false, null, true)
          )
          this.$setPageTitle(this.assetList.name + ' | ' + this.$brandName())
        })
        .catch((error) => {
          const { response: { status, data: { message } = {} } = {} } = error
          if (status === 403 && message === 'Collection not found.') {
            this.collectionNotFound = true
          }
          this.$toast.global.error(this.$getErrorMessage(error))
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  head() {
    return {
      title: 'Collection N | ' + this.$brandName() || 'Digital Asset Manager',
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
