<template>
  <div class="body-content user-profile warning-massage">
    <div class="general-settings h-100 w-100">
      <div class="general-settings-right w-100 h-100">
        <div
          class="general-settings-title d-flex align-items-center mb10 border-bottom"
        >
          <nuxt-link
            :to="{
              name: 'brand_name-my-orders',
              params: { brand_name: this.$getBrandName() },
            }"
            class="back-btn"
          >
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
            Orders <strong># {{ orderId }}</strong>
          </h4>
          <span
            v-if="orderDetails.status_id"
            class="plan-status ml1"
            :class="[getStatusClass(orderDetails.status_id)]"
            >{{ orderDetails.status || '-' }}</span
          >
          <div class="right-side justify-content-end">
            <div class="track-ship">
              <div class="tags">
                <span>Tracking ID&nbsp;# </span>
                <strong v-if="!orderDetails.shipping_tracking_id">-</strong>
                <span v-else>{{ orderDetails.shipping_tracking_id }}</span>
              </div>
              <div class="tags">
                <span>Shipping Method</span>
                <strong v-if="!orderDetails.shipping_method">-</strong>
                <span v-else>{{ orderDetails.shipping_method }}</span>
              </div>
            </div>
            <a
              v-tooltip="
                orderDetails.invoice_status
                  ? 'Print Invoice'
                  : 'Invoice is not generated yet. '
              "
              href="javascript:void(0);"
              class="print-btn"
              :class="orderDetails.invoice_status ? '' : 'disabled'"
              @click="printInvoice"
            >
              <svg
                id="Capa_1"
                class="print-icon"
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
                    d="M437,129h-14V75c0-41.4-33.6-75-75-75H164c-41.4,0-75,33.6-75,75v54H75c-41.4,0-75,33.6-75,75v120c0,41.4,33.6,75,75,75h14v68c0,24.8,20.2,45,45,45h244c24.8,0,45-20.2,45-45v-68h14c41.4,0,75-33.6,75-75V204C512,162.6,478.4,129,437,129z M119,75c0-24.8,20.2-45,45-45h184c24.8,0,45,20.2,45,45v54H119V75z M393,467c0,8.3-6.7,15-15,15H134c-8.3,0-15-6.7-15-15V319h274V467zM482,324c0,24.8-20.2,45-45,45h-14v-50h9c8.3,0,15-6.7,15-15s-6.7-15-15-15H80c-8.3,0-15,6.7-15,15s6.7,15,15,15h9v50H75c-24.8,0-45-20.2-45-45V204c0-24.8,20.2-45,45-45h362c24.8,0,45,20.2,45,45V324z"
                  ></path>
                  <path
                    class="fill-color"
                    d="M296,353h-80c-8.3,0-15,6.7-15,15s6.7,15,15,15h80c8.3,0,15-6.7,15-15S304.3,353,296,353z"
                  ></path>
                  <path
                    class="fill-color"
                    d="M296,417h-80c-8.3,0-15,6.7-15,15s6.7,15,15,15h80c8.3,0,15-6.7,15-15S304.3,417,296,417z"
                  ></path>
                  <path
                    class="fill-color"
                    d="M128,193H80c-8.3,0-15,6.7-15,15s6.7,15,15,15h48c8.3,0,15-6.7,15-15S136.3,193,128,193z"
                  ></path>
                </g>
              </svg>
            </a>
            <button
              v-tooltip="
                orderDetails.status === 'Shipped'
                  ? `You can not Cancel the Order as it is already Shipped.`
                  : ''
              "
              :class="orderDetails.status === 'Shipped' ? 'disabled' : ''"
              :disabled="
                orderDetails.status === 'Cancelled' ||
                orderDetails.status === 'Delivered' ||
                isLoading
              "
              class="btn btn-red-invert"
              @click="
                orderDetails.status !== 'Shipped' &&
                orderDetails.status !== 'Delivered' &&
                !isLoading
                  ? (showDeleteDialog = true)
                  : ''
              "
            >
              Cancel Order
            </button>
          </div>
        </div>
        <div
          v-if="!orderDetails.invoice_status"
          class="success-msg pl10 pr10 mb0"
        >
          <div class="alert alert-warning">
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
          <div v-if="!isLoading" class="order_summary">
            <h3 class="mt1 mb1">Order Summary</h3>
            <div class="d-flex justify-content-between mb2">
              <div class="billed_shippe d-flex">
                <div class="billed_to">
                  <strong>BILLED TO</strong>
                  <p>{{ orderDetails.user_name }}</p>
                  <a :href="`mailto:${orderDetails.user_email}`">{{
                    orderDetails.user_email
                  }}</a>
                  <a :href="`tel:${orderDetails.user_phone}`">{{
                    orderDetails.user_phone
                  }}</a>
                </div>
                <div class="shipped_to">
                  <strong>SHIPPED TO</strong>
                  <p>{{ orderDetails.shpping_info.shipping_company_name }}</p>
                  <p>{{ orderDetails.shpping_info.shipping_user_name }}</p>
                  <a
                    :href="`mailto:${orderDetails.shpping_info.shipping_user_email}`"
                    >{{ orderDetails.shpping_info.shipping_user_email }}</a
                  >
                  <a
                    :href="`tel:${orderDetails.shpping_info.shipping_user_phone}`"
                    >{{ orderDetails.shpping_info.shipping_user_phone }}</a
                  >
                  <p>
                    {{ getAddressConcat(orderDetails.shpping_info) }}
                  </p>
                  <p>
                    {{
                      orderDetails.shpping_info.country +
                      ' , ' +
                      orderDetails.shpping_info.zip_code
                    }}
                  </p>
                </div>
              </div>
              <div class="order_to">
                <p v-if="orderDetails.invoice_status">
                  <span>Invoice # : </span>
                  <strong>{{ orderDetails.invoice_number }}</strong>
                </p>
                <p v-if="orderDetails.invoice_status">
                  <span>Invoice Date : </span>
                  <strong>{{
                    $moment(orderDetails.invoice_date).format('Do MMM, YYYY')
                  }}</strong>
                </p>
                <p v-if="orderDetails.invoice_status">
                  <span>Invoice Amount : </span>
                  <strong> {{ getPrice(orderDetails.total_amount) }}</strong>
                </p>
                <p>
                  <span>Order No. # : </span>
                  <strong>{{ orderId }}</strong>
                </p>
                <p>
                  <span>Order Date : </span>
                  <strong>
                    {{
                      $moment(orderDetails.created_at).format('Do MMM, YYYY')
                    }}</strong
                  >
                </p>
              </div>
            </div>
            <table class="tables" width="100%" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th align="left">PRODUCT NAME</th>
                  <th width="10%" align="right">QTY</th>
                  <th width="20%" align="right">QTY PRICE</th>
                  <th width="10%" align="right">AMOUNT (USD)</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="orderItem in orderDetails.order_item"
                  :key="orderItem.id"
                >
                  <td align="left">
                    <div class="media">
                      <div class="media-left">
                        <div class="categary-image">
                          <img
                            v-if="$isImage(orderItem.file_type)"
                            :src="orderItem.file_name"
                            alt=""
                          />
                          <img
                            v-else-if="$isVideo(orderItem.file_type)"
                            :src="orderItem.asset.thumbnail_file"
                            alt=""
                          />
                          <img
                            v-else
                            :src="
                              orderItem.asset.thumbnail_file ||
                              orderItem.asset.preview_image
                            "
                            alt=""
                          />
                          <!-- <img :src="orderItem.file_name" alt="" /> -->
                        </div>
                      </div>
                      <div class="media-right">
                        <nuxt-link
                          :to="{
                            name: 'brand_name-files-id',
                            params: {
                              id: orderItem.asset_id,
                              brand_name: $getBrandName(),
                            },
                          }"
                          >{{ orderItem.display_file_name }}</nuxt-link
                        >
                      </div>
                    </div>
                  </td>
                  <td width="10%" align="right">{{ orderItem.qty }}</td>
                  <td width="20%" align="right">
                    {{
                      orderItem.base_qty +
                      ' Qty = ' +
                      getPrice(orderItem.base_price)
                    }}
                    <!-- <br /> -->
                    <!-- {{ getPrice(orderItem.base_price) }} -->
                  </td>
                  <td width="10%" align="right">
                    <strong>{{ getPrice(orderItem.total_amount) }}</strong>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" align="right">Sub Total</td>
                  <td width="10%" align="right">
                    {{ getPrice(orderDetails.sub_total) }}
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td colspan="2" align="right">Shipping Rate</td>
                  <td width="10%" align="right">
                    <strong>{{
                      getPrice(orderDetails.shipping_amount)
                    }}</strong>
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td colspan="2" align="right">Total Amount (USD)</td>
                  <td width="10%" align="right">
                    <strong>{{ getPrice(orderDetails.total_amount) }}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
            <h4 class="mt2 mb-2">Special Instruction</h4>
            <p>
              {{ orderDetails.user_note }}
            </p>
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
      statusColors: [
        {
          id: 1,
          class: 'alert-secondary',
          name: 'In-Progress',
        },
        {
          id: 2,
          class: 'alert-warning',
          name: 'Shipped',
        },
        {
          id: 3,
          class: 'alert-success',
          name: 'Delivered',
        },
        {
          id: 4,
          class: 'alert-danger',
          name: 'Cancelled',
        },
      ],
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    getStatusClass() {
      return (statusId) => {
        const status = this.statusColors.find(
          ({ id }) => parseInt(id) === parseInt(statusId)
        )
        if (status) {
          return status.class
        }
        return ''
      }
    },
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    printInvoice() {
      if (!this.orderDetails.invoice_status) {
        return
      }
      this.$axios
        .$get('digital/invoice/generate-pdf', {
          params: {
            url_workspace_id: this.$getWorkspaceId(),
            order_id: this.listOrderId,
          },
        })
        .then(({ message, data }) => {
          this.$toast.success(message)
          const link = document.createElement('a')
          link.setAttribute('target', '_blank')
          link.href = data.pdf_file
          link.click()
          link.remove()
        })
    },
    getAddressConcat(address) {
      let concat = ''
      if (address.address1) {
        concat += address.address1
      }
      if (address.address2) {
        concat += ', ' + address.address2
      }
      if (address.city) {
        concat += ', ' + address.city
      }
      if (address.state) {
        concat += ', ' + address.state
      }
      return concat
    },
    getPrice(val) {
      let price = ''
      if (!val) return '-'
      if (val) {
        price = '$' + val
      }
      if (val % 1 === 0) {
        price += '.00'
      }
      return price
    },
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
            name: 'brand_name-my-orders',
            params: { brand_name: this.$getBrandName() },
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
