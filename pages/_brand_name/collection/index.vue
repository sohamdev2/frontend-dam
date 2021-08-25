<template>
  <div class="body-content my-collection-body">
    <div class="collection-tabs">
      <div class="row no-gutters w-100 align-items-center">
        <div class="col-md-6">
          <ul class="nav" role="tablist">
            <li class="nav-item">
              <a
                href="#my-collection"
                class="nav-link active"
                data-toggle="tab"
              >
                <strong>{{ files.length }}</strong>
                <span>My Collection</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-content">
      <div id="my-collection" class="tab-pane active h-100">
        <div
          class="section-title collection-header d-flex align-items-center mt0"
        >
          <div class="sec-title-left d-flex align-items-center">
            <nuxt-link
              :to="{
                name: 'brand_name',
                params: { brand_name: $getBrandName() },
              }"
              class="home-icon"
            >
              <svg
                class="home-icon orange"
                version="1.1"
                id="Layer_1"
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
                <li><h2 class="title">My Collection</h2></li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="common-box bg-gray resource-wrapper grid-list my-collection table-list-scrolling"
        >
          <div class="table-list-view multi-table-view">
            <CollectionListingHeader
              key="header"
              :reverse="sorting.toolbar.desc"
              :sorting.sync="sorting.toolbar.value"
              @sort="(args) => args.forEach((arg) => sort(...arg))"
            />
            <div class="customscrollbar">
              <ul class="tbody h-auto">
                <template v-for="collection in files">
                  <Collection :key="collection.id" :file="collection" />
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Collection from '~/components/dam/Collection'
import collectionSorting from '~/mixins/collectionSorting'
import CollectionListingHeader from '~/components/dam/CollectionListingHeader'

export default {
  layout: 'app',
  components: {
    Collection,
    CollectionListingHeader,
  },
  mixins: [collectionSorting],
  middleware: ['check-url', 'check-auth'],
  data() {
    return {
      files: [],
      loading: false,
    }
  },
  created() {
    this.getCollections()
  },
  methods: {
    async getCollections() {
      this.loading = true
      await this.$axios
        .$get(
          `/digital/collection/get-all?url_workspace_id=${this.$getWorkspaceId()}`
        )
        .then((response) => {
          if (response.data?.length === 0) {
            this.$router.replace({
              name: 'brand_name-collection',
              params: { brand_name: this.$getBrandName() },
            })
          }

          this.files = response.data.sort(
            this.$sortBy('name', false, null, true)
          )
          this.loading = false
        })
        .catch((error) =>
          this.$toast.global.error(this.$getErrorMessage(error))
        )
    },
  },
  head() {
    return {
      title: 'Collection | ' + this.$brandName() || 'Digital Asset Manager',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: this.$_auth()?.favicon || '/favicon.png',
        },
      ],
    }
  },
}
</script>
