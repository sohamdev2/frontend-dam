<template>
  <div class="body-content user-profile warning-massage">
    <div class="general-settings h-100 w-100">
      <div class="general-settings-right w-100 h-100">
        <div
          class="general-settings-title d-flex align-items-center mb10 border-bottom"
        >
          <nuxt-link to="/my-orders" class="back-btn">
            <svg
              id="Capa_1"
              class="back-long-arrow-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  class="fill-color"
                  d="M492,236H68.4l70.2-69.8c7.8-7.8,7.9-20.5,0.1-28.3c-7.8-7.8-20.5-7.9-28.3-0.1L5.9,241.8c0,0,0,0,0,0c-7.8,7.8-7.8,20.5,0,28.3c0,0,0,0,0,0l104.5,104c7.8,7.8,20.5,7.8,28.3-0.1c7.8-7.8,7.8-20.5-0.1-28.3L68.4,276H492c11,0,20-9,20-20C512,245,503,236,492,236z"
                ></path>
              </g>
            </svg>
          </nuxt-link>
          <h4 class="mb0">
            Orders - <strong>#{{ orderId }}</strong>
          </h4>
          <div
            class="order-status ml1"
            style="background-color: #d3d3d3; color: #070e22"
          >
            <span>{{ orderDetails.status || '-' }}</span>
          </div>
          <div class="right-side justify-content-end">
            <div class="track-ship">
              <div class="tags">
                <span>Tracking ID - </span>
                <span>{{ orderDetails.traking_id || '-' }}</span>
              </div>
              <div class="tags">
                <span>Shipping Method - </span>
                <span>{{ orderDetails.shipping_method || '-' }}</span>
              </div>
            </div>
            <a
              v-if="orderDetails.status !== 'Cancelled'"
              href="javascript:void(0);"
              class="btn btn-red-invert"
              @click="showDeleteDialog = true"
              >Cancel Order</a
            >
          </div>
        </div>
        <div class="success-msg pl10 pr10 mb0">
          <div class="alert alert-primary">
            <svg
              id="Layer_1"
              class="alert-icon mr-2"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Upload_Failed">
                <path
                  id="Subtraction_1"
                  class="fill-color"
                  d="M16.5,17H1.5c-0.5,0-1.1-0.3-1.3-0.8c-0.3-0.5-0.3-1.1,0-1.5L7.7,1.8C7.9,1.3,8.5,1,9,1c0.5,0,1.1,0.3,1.3,0.8l7.5,12.9c0.3,0.5,0.3,1.1,0,1.5C17.5,16.7,17,17,16.5,17z M9,13c-0.5,0-1,0.4-1,1c0,0.5,0.4,1,1,1c0.5,0,1-0.4,1-1C10,13.4,9.5,13,9,13L9,13z M9,5.8c-0.5,0-1,0.4-1,1v4c0,0.5,0.4,1,1,1c0.5,0,1-0.4,1-1v-4C10,6.2,9.5,5.8,9,5.8L9,5.8z"
                ></path>
              </g>
            </svg>
            Please note that Shipping charges will be added Once your admin
            assign Shipping method to your placed order and You will also
            notified through Your billing email ID.
          </div>
        </div>
        <div class="workspace-settings customscrollbar">
          <h4 class="mt1">Order Summary</h4>
          <div class="common-box bg-gray h-auto pl0 pr0 mb2">
            <div class="table-list-view table-list-scrolling">
              <ul class="thead">
                <li>
                  <div class="sorting flex40">
                    <span>Product Name</span>
                  </div>
                  <div class="sorting flex30">
                    <span>Qty</span>
                  </div>
                  <div class="sorting flex20">
                    <span>Amount</span>
                  </div>
                  <div class="sorting flex10">
                    <span>Total</span>
                  </div>
                </li>
              </ul>
              <div class="customscrollbar">
                <ul class="tbody">
                  <li
                    v-for="orderItem in orderDetails.order_item"
                    :key="orderItem.id"
                  >
                    <div class="tb-column flex40">
                      <div class="media">
                        <div class="media-left">
                          <div class="categary-image">
                            <img src="img/resource-img1.jpg" alt="" />
                          </div>
                        </div>
                        <div class="media-body">
                          <nuxt-link
                            :to="{
                              name: 'brand_name-files-id',
                              params: {
                                id: orderItem.asset_id,
                                brand_name: $getBrandName(),
                              },
                            }"
                            class="table-a"
                            >{{ orderItem.display_file_name }}</nuxt-link
                          >
                        </div>
                      </div>
                    </div>
                    <div class="tb-column flex30">
                      <div class="top-column">
                        <label
                          >{{ orderItem.qty }} (1 Qty =
                          {{ orderItem.unit }} Units)</label
                        >
                      </div>
                    </div>
                    <div class="tb-column flex20">
                      <div class="top-column">
                        <label>${{ orderItem.price }}</label>
                      </div>
                    </div>
                    <div class="tb-column flex10">
                      <div class="top-column">
                        <label>${{ orderItem.total_amount }}</label>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul class="tfooter">
                  <li class="d-flex align-items-center justify-content-center">
                    <div class="flex70"></div>
                    <div class="flex20 text-right pr1">
                      <label>Total Amount : </label>
                    </div>
                    <div class="flex10">
                      <strong>${{ orderDetails.total_amount }}</strong>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row mb1">
            <div class="col-md-6">
              <div class="box bg-gray-light has-relative h-100">
                <h4>Billing Info</h4>
                <div class="billing-info">
                  <label>Dealer Name : </label>
                  <strong>{{ orderDetails.user_name }}</strong>
                </div>
                <div class="billing-info">
                  <label>Email : </label>
                  <a :href="`mailto:${orderDetails.user_email}`">{{
                    orderDetails.user_email
                  }}</a>
                </div>
                <div class="billing-info">
                  <label>Phone : </label>
                  <a :href="`tel:${orderDetails.user_phone}`">{{
                    orderDetails.user_phone
                  }}</a>
                </div>
              </div>
            </div>
            <div v-if="!isLoading" class="col-md-6">
              <div class="box bg-gray-light has-relative h-100">
                <h4>Shipping Info</h4>
                <div class="shipping-info">
                  <label>Company Name : </label>
                  <strong>{{
                    orderDetails.shpping_info.shipping_company_name
                  }}</strong>
                </div>
                <div class="shipping-info">
                  <label>Name : </label>
                  <strong>{{
                    orderDetails.shpping_info.shipping_user_name
                  }}</strong>
                </div>
                <div class="shipping-info">
                  <label>Email : </label>
                  <a
                    :href="`mailto:${orderDetails.shpping_info.shipping_user_email}`"
                    >{{ orderDetails.shpping_info.shipping_user_email }}</a
                  >
                </div>
                <div class="shipping-info">
                  <label>Phone : </label>
                  <a
                    :href="`tel:${orderDetails.shpping_info.shipping_user_phone}`"
                    >{{ orderDetails.shpping_info.shipping_user_phone }}</a
                  >
                </div>
                <div class="shipping-info">
                  <label>Address : </label>
                  <strong>{{
                    orderDetails.shpping_info.address1 +
                    ',' +
                    orderDetails.shpping_info.address2 +
                    ',' +
                    orderDetails.shpping_info.city +
                    ',' +
                    orderDetails.shpping_info.state +
                    ',' +
                    orderDetails.shpping_info.county +
                    ',' +
                    orderDetails.shpping_info.zip_code
                  }}</strong>
                </div>
                <div class="shipping-info mt1">
                  <label>Special Instruction : </label>
                  <p>
                    {{ orderDetails.user_note }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirmation-dialog
      v-model="showDeleteDialog"
      @click:confirm-button="cancelOrder"
    >
      <template slot="header">Cancel Order</template>
      Are you sure you want to cancel <strong>order</strong>?
    </confirmation-dialog>
  </div>
</template>

<script>
// import { ContentLoader } from 'vue-content-loader'
export default {
  layout: 'app-min-no-search',
  middleware: ['check-auth', 'can-access'],
  //   components: { ContentLoader },
  data() {
    return {
      orderDetails: {},
      orderId: this.$route.params.id,
      listOrderId: this.$route.query.orderId,
      isLoading: false,
      showDeleteDialog: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    cancelOrder() {
      this.$axios
        .$get(
          `digital/order/cancel-order?url_workspace_id=${this.$getWorkspaceId()}&order_id=${
            this.listOrderId
          }`
        )
        .then(({ message }) => {
          this.$toast.success(message)
          this.$router.replace({
            name: 'my-orders',
          })
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error))
        })
    },
    getOrderDetail() {
      this.isLoading = true
      this.$axios
        .$get(`digital/order/order-detail`, {
          params: {
            url_workspace_id: this.$getWorkspaceId(),
            order_id: this.listOrderId,
          },
        })
        .then(({ data }) => {
          this.orderDetails = data
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.isLoading = false
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
