<template>
  <div class="body-content user-profile">
    <div class="tabs-view h-100">
      <ul class="nav" role="tablist">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/profile">User Profile</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link active" to="/my-orders"
            >My Orders</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/address-book"
            >Address Book</nuxt-link
          >
        </li>
      </ul>
      <div id="my-order" class="tab-pane active">
        <div class="workspace-settings h-100">
          <div class="general-settings-title" data-select2-id="6">
            <div class="right-side" data-select2-id="5">
              <Select2
                v-model="filter.status"
                placeholder="Select status"
                :options="statusList"
              />
              <DateRangePicker
                class="daterange form-control flatpickr-input"
                :start-date.sync="filter.start_date"
                :end-date.sync="filter.end_date"
                placeholder="Custom Date Range"
                human
                custom-event
                @dateChanged="() => handleFetch()"
              />
            </div>
          </div>
          <div class="common-box bg-gray h-100 pl0 pr0">
            <div class="table-list-view table-list-scrolling">
              <ul class="thead">
                <li>
                  <div
                    class="sorting sortarrow flex20"
                    :class="
                      sortValue === 'id' && sortBy === 'DESC'
                        ? 'active descending'
                        : ''
                    "
                  >
                    <span @click="handleSort('id')">Order #</span>
                  </div>
                  <div class="sorting flex20">
                    <span>Total Items</span>
                  </div>
                  <div class="sorting flex20">
                    <span>Total Amount</span>
                  </div>
                  <div
                    class="sorting sortarrow flex25"
                    :class="
                      sortValue === 'created_at' && sortBy === 'DESC'
                        ? 'active descending'
                        : ''
                    "
                  >
                    <span @click="handleSort('created_at')"
                      >Order Placed Date</span
                    >
                  </div>
                  <div
                    class="sorting sortarrow flex15"
                    :class="
                      sortValue === 'status' && sortBy === 'DESC'
                        ? 'active descending'
                        : ''
                    "
                  >
                    <span @click="handleSort('status')">Status</span>
                  </div>
                </li>
              </ul>
              <div class="customscrollbar no_footer">
                <ul class="tbody">
                  <li v-for="order in orders" :key="order.id">
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <nuxt-link
                          :to="{
                            name: 'my-orders-id-order-detail',
                            params: {
                              id: order.order_id,
                            },
                            query: {
                              orderId: order.id,
                            },
                          }"
                          class="table-a text-underline"
                          >{{ order.order_id }}</nuxt-link
                        >
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>{{ order.order_item_count }}</label>
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>${{ order.total_amount }}</label>
                      </div>
                    </div>
                    <div class="tb-column flex25">
                      <div class="top-column">
                        <label>{{
                          $moment(order.created_at).format('Do MMM, YYYY')
                        }}</label>
                      </div>
                    </div>
                    <div class="tb-column flex15">
                      <div class="top-column">
                        <div
                          class="order-status"
                          :style="`background-color: ${order.status_background_color}; color: ${order.status_color}`"
                        >
                          <span>{{ order.status }}</span>
                        </div>
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
                        <div v-if="!orders.length" class="no-data-found">
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
                            <p>You haven't Ordered anything yet!</p>
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
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  layout: 'app-min-no-search',
  middleware: ['check-auth', 'can-access'],
  components: { ContentLoader },
  data() {
    return {
      orders: [],
      infiniteId: +new Date(),
      contentLoaderData: [0, 15, 31, 47, 63, 79, 95, 111, 127, 143],
      noOrders: false,
      page: 0,
      lastPage: 0,
      statusList: [],
      sortValue: 'id',
      sortBy: 'DESC',
      filter: {
        start_date: '',
        end_date: '',
        status: '',
      },
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  watch: {
    'filter.status': {
      handler() {
        this.handleFetch()
      },
    },
  },
  mounted() {
    this.getOrderStatus()
  },
  methods: {
    handleSort(sortVal) {
      this.sortValue = sortVal
      this.sortBy =
        this.sortBy === 'ASC' ? (this.sortBy = 'DESC') : (this.sortBy = 'ASC')
      this.handleFetch()
    },
    getOrderStatus() {
      this.$axios
        .$get('digital/order/order-status', {
          params: {
            url_workspace_id: this.$getWorkspaceId(),
          },
        })
        .then(({ data }) => {
          data.unshift({
            name: 'All',
            id: 0,
            text: 'All',
          })
          this.statusList = data
        })
        .catch(console.error)
    },
    handleFetch() {
      this.orders = []
      this.page = 0
      this.lastPage = 0
      this.infiniteId = new Date()
    },
    infiniteHandler($state) {
      this.noProduct = false
      this.page += 1
      this.$axios
        .$get(
          `digital/order/my-order`,

          {
            params: {
              url_workspace_id: this.$getWorkspaceId(),
              user_id: this.user.user_id,
              sortValue: this.sortValue,
              sortBy: this.sortBy,
              page: this.page,
              status: this.filter.status,
              start_date: this.filter.start_date,
              end_date: this.filter.end_date,
            },
          }
        )
        .then(({ data }) => {
          this.lastPage = data.last_page
          if (data.data && data.data.length) {
            if (this.page === data.current_page) {
              this.orders.push(...data.data)
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
