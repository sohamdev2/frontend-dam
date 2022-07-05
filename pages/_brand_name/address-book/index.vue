<template>
  <div class="body-content user-profile">
    <div class="tabs-view h-100">
      <ul class="nav" role="tablist">
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :to="{
              name: 'brand_name-profile',
              params: { brand_name: this.$getBrandName() },
            }"
            >User Profile</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :to="{
              name: 'brand_name-my-orders',
              params: { brand_name: this.$getBrandName() },
            }"
            >My Orders</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link
            class="nav-link active"
            :to="{
              name: 'brand_name-address-book',
              params: { brand_name: this.$getBrandName() },
            }"
            >Address Book</nuxt-link
          >
        </li>
      </ul>
      <div class="tab-content customscrollbar">
        <div id="user-profile" class="tab-pane active">
          <div class="workspace-settings h-100">
            <nuxt-link
              :to="{
                name: 'brand_name-address-book-add',
                params: { brand_name: this.$getBrandName() },
              }"
              class="btn add-address-btn"
              >Add New Address</nuxt-link
            >
            <div class="common-box bg-gray h-100 pl0 pr0">
              <div class="table-list-view table-list-scrolling">
                <ul class="thead">
                  <li>
                    <div class="sorting flex15">
                      <span>Name</span>
                    </div>
                    <div class="sorting flex15">
                      <span>Company Name</span>
                    </div>
                    <div class="sorting flex30">
                      <span>Address</span>
                    </div>
                    <div class="sorting flex8">
                      <span>City</span>
                    </div>
                    <div class="sorting flex8">
                      <span>State</span>
                    </div>
                    <div class="sorting flex8">
                      <span>Zip</span>
                    </div>
                    <div class="sorting flex8">
                      <span>Country</span>
                    </div>
                    <div class="sorting flex8">
                      <span>Action</span>
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar no_footer">
                  <ul class="tbody">
                    <li v-for="address in addressList" :key="address.id">
                      <div class="tb-column flex15">
                        <div class="top-column">
                          <nuxt-link
                            :to="{
                              name: 'brand_name-address-book-id-edit',
                              params: {
                                id: address.id,
                              },
                            }"
                            class="table-a"
                            >{{ address.user_name || '-' }}</nuxt-link
                          >
                        </div>
                      </div>
                      <div class="tb-column flex15">
                        <div class="top-column">
                          <label>{{ address.company_name || '-' }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex30">
                        <div class="top-column">
                          <label>{{ address.full_address }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex8">
                        <div class="top-column">
                          <label>{{ address.city }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex8">
                        <div class="top-column">
                          <label>{{ address.state }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex8">
                        <div class="top-column">
                          <label>{{ address.zip_code }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex8">
                        <div class="top-column">
                          <label>{{ address.country }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex8">
                        <div class="top-column">
                          <ul class="action">
                            <li>
                              <nuxt-link
                                :to="{
                                  name: 'brand_name-address-book-id-edit',
                                  params: {
                                    id: address.id,
                                  },
                                }"
                              >
                                <svg
                                  id="Layer_1"
                                  v-tooltip="`Edit Address`"
                                  class="edit-icon h-orange"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 18 18"
                                  xml:space="preserve"
                                >
                                  <g
                                    id="Group_4350"
                                    transform="translate(-397.961 -147.331)"
                                  >
                                    <path
                                      id="Path_3408"
                                      class="fill-color"
                                      d="M400.4,165.3c-1.3,0-2.4-1.1-2.4-2.4v-11.4c0-1.3,1.1-2.4,2.4-2.4h5.7c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-5.7c-0.5,0-0.8,0.4-0.9,0.8v11.4c0,0.5,0.4,0.8,0.9,0.9h11.4c0.5,0,0.8-0.4,0.9-0.9v-5.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v5.7c0,1.3-1.1,2.4-2.4,2.4L400.4,165.3z"
                                    ></path>
                                    <path
                                      id="Path_3409"
                                      class="fill-color"
                                      d="M403.6,160.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l7.8-7.8c1-1,2.6-1,3.6,0c1,1,1,2.6,0,3.5l-7.8,7.8c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C403.8,160.4,403.7,160.4,403.6,160.4zM413.4,148.9c-0.3,0-0.5,0.1-0.7,0.3l-7.6,7.6l-0.4,1.8l1.8-0.4l7.6-7.6c0.4-0.4,0.4-1,0-1.3C413.9,149,413.7,148.9,413.4,148.9L413.4,148.9z"
                                    ></path>
                                  </g>
                                </svg>
                              </nuxt-link>
                            </li>
                            <li>
                              <a
                                href="javascript:void(0);"
                                @click="
                                  () => {
                                    showDeleteDialog = true
                                    deletionId = address.id
                                  }
                                "
                              >
                                <svg
                                  id="Layer_1"
                                  class="delete-icon h-orange"
                                  data-toggle="tooltip"
                                  title=""
                                  data-original-title="Delete Address Book"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 15.3 18"
                                  xml:space="preserve"
                                >
                                  <g
                                    id="Group_4351"
                                    transform="translate(-443.472 -147.331)"
                                  >
                                    <path
                                      id="Path_3410"
                                      class="fill-color"
                                      d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                                    ></path>
                                    <path
                                      id="Path_3411"
                                      class="fill-color"
                                      d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                                    ></path>
                                  </g>
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <client-only>
                      <infinite-loading
                        :identifier="infiniteId"
                        @infinite="infiniteHandler"
                      >
                        <div slot="spinner">
                          <ContentLoader
                            :speed="1"
                            :animate="true"
                            :width="400"
                            :height="1000"
                          >
                            <rect
                              v-for="index in 10"
                              :key="index"
                              x="0"
                              :y="contentLoaderData[index]"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                          </ContentLoader>
                        </div>
                        <div slot="no-more"></div>
                        <div slot="no-results">
                          <div v-if="!addressList.length" class="no-data-found">
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
                                  />
                                  <path
                                    id="Path_3565"
                                    class="fill-color"
                                    d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                                  />
                                </g>
                              </svg>
                              <p>You haven't added any Address yet!</p>
                              <nuxt-link
                                class="btn btn-icon"
                                :to="{
                                  name: 'brand_name-address-book-add',
                                  params: { brand_name: this.$getBrandName() },
                                }"
                              >
                                <svg
                                  id="Layer_1"
                                  class="plus-icon white"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 18 18"
                                  xml:space="preserve"
                                >
                                  <g
                                    id="Group_4454"
                                    transform="translate(-1005 -577.999)"
                                  >
                                    <path
                                      id="Path_3394"
                                      class="fill-color"
                                      d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
                                    ></path>
                                    <path
                                      id="Path_3395"
                                      class="fill-color"
                                      d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                                    ></path>
                                  </g>
                                </svg>
                                Add New</nuxt-link
                              >
                            </div>
                          </div>
                        </div>
                      </infinite-loading>
                    </client-only>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirmation-dialog
      v-model="showDeleteDialog"
      @click:confirm-button="removeCartItem"
    >
      <template slot="header">Delete Address</template>
      Are you sure you want to Delete the <strong>Address</strong>?
    </confirmation-dialog>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  layout: 'app-min-no-search',
  middleware: ['check-auth', 'can-access'],
  components: {
    ContentLoader,
  },
  data() {
    return {
      addressList: [],
      infiniteId: +new Date(),
      contentLoaderData: [0, 15, 31, 47, 63, 79, 95, 111, 127, 143],
      noProduct: false,
      page: 0,
      last_page: null,
      showDeleteDialog: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    getAddressConcat() {
      return (address) => {
        let concat = ''
        if (address.address1) {
          concat += address.address1
        }
        if (address.address2) {
          concat += ',' + address.address2
        }
        return concat
      }
    },
  },
  methods: {
    infiniteHandler($state) {
      this.noProduct = false
      this.page += 1
      this.$axios
        .$get(
          `digital/user-address/address-list`,

          {
            params: {
              workspace_id: this.$getWorkspaceId(),
              user_id: this.user.user_id,
              page: this.page,
            },
          }
        )
        .then(({ data }) => {
          this.lastPage = data.last_page
          if (data.data && data.data.length) {
            if (this.page === data.current_page) {
              this.addressList.push(...data.data)
              $state.loaded()
              if (this.lastPage === this.page) {
                $state.complete()
              }
            }
          } else {
            $state.complete()
          }
        })
        .catch((e) => {
          $state.error(e)
        })
    },
    removeCartItem() {
      this.$axios
        .$post('digital/user-address/delete-address', {
          address_id: this.deletionId,
          workspace_id: this.$getWorkspaceId(),
        })
        .then(({ message }) => {
          const index = this.addressList.findIndex(
            (i) => i.id === this.deletionId
          )
          this.addressList.splice(index, 1)
          this.$toast.success(message)
        })
        .catch((error) => {
          this.$toast.$error(this.$getErrorMessage(error))
        })
    },
  },
  head() {
    return {
      title: this.$brandName() || 'Digital Asset Manager',
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
