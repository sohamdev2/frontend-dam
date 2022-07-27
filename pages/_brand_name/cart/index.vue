<template>
  <div class="body-content-right customscrollbar cart-table-list">
    <h2 class="title">Cart</h2>
    <div class="common-box bg-gray pl0 pr0">
      <div class="table-list-view table-list-scrolling">
        <ul class="thead">
          <li>
            <div class="sorting flex40">
              <span>Product Name</span>
            </div>
            <div class="sorting flex15">
              <span>Qty</span>
            </div>
            <div class="sorting text-center flex25">
              <span>Amount</span>
            </div>
            <div class="sorting flex10">
              <span>Total</span>
            </div>
            <div class="sorting text-center flex10">
              <span>Action</span>
            </div>
          </li>
        </ul>
        <div class="customscrollbar">
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
              <template>
                <rect x="0" y="5" rx="1" ry="1" width="450" height="40" />
                <rect x="0" y="50" rx="1" ry="1" width="450" height="40" />
                <rect x="0" y="95" rx="1" ry="1" width="450" height="40" />
                <rect x="0" y="140" rx="1" ry="1" width="450" height="40" />
              </template>
              <!-- <template v-else>
                <rect x="0" y="15" rx="1" ry="1" width="112.4" height="112.4" />
                <rect
                  x="117.4"
                  y="15"
                  rx="1"
                  ry="1"
                  width="112.4"
                  height="112.4"
                />
                <rect
                  x="234.9"
                  y="15"
                  rx="1"
                  ry="1"
                  width="112.4"
                  height="112.4"
                />
                <rect
                  x="352.3"
                  y="15"
                  rx="1"
                  ry="1"
                  width="112.4"
                  height="112.4"
                />
              </template> -->
            </ContentLoader>
          </div>
          <ul v-else class="tbody">
            <li v-for="cartItem in cartList" :key="cartItem.id">
              <div class="tb-column flex40">
                <div class="media">
                  <div class="media-left">
                    <div class="categary-image">
                      <img
                        v-if="$isImage(cartItem.file_type)"
                        :src="cartItem.file_name"
                        alt=""
                      />
                      <img
                        v-else-if="$isVideo(cartItem.file_type)"
                        :src="cartItem.asset.thumbnail_file"
                        alt=""
                      />
                      <img
                        v-else
                        :src="
                          cartItem.asset.thumbnail_file ||
                          cartItem.asset.preview_image
                        "
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="media-body">
                    <nuxt-link
                      :to="{
                        name: 'brand_name-files-id',
                        params: {
                          id: cartItem.asset_id,
                          brand_name: $getBrandName(),
                        },
                      }"
                      class="table-a"
                      >{{ cartItem.display_file_name }}</nuxt-link
                    >
                    <span
                      v-if="
                        cartItem.asset.is_deleted || cartItem.asset.is_archive
                      "
                      class="altmsg"
                      >Product is not available.</span
                    >
                  </div>
                </div>
              </div>
              <div class="tb-column flex15">
                <div class="top-column">
                  <div
                    v-if="cartItem.product.pricing_option === '1'"
                    class="quantity"
                    :class="!cartItem.is_public ? 'disabled' : ''"
                  >
                    <div
                      class="quantity-button quantity-down"
                      :class="[
                        !Boolean(parseInt(cartItem.product.is_customize))
                          ? 'disabled'
                          : '',
                        parseInt(cartItem.qty) ===
                        parseInt(
                          getPriceOptions(cartItem.product.options)[0].qty
                        )
                          ? 'disabled'
                          : '',
                      ]"
                      @click="decrementQty(cartItem, cartItem.product.options)"
                    >
                      <svg
                        id="Layer_1"
                        class="quantity-minus-icon"
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
                            id="Path_3395"
                            class="fill-color"
                            d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7s0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <input
                      v-model="cartItem.qty"
                      type="number"
                      :min="getPriceOptions(cartItem.product.options)[0].qty"
                      class="form-control"
                      disabled=""
                    />
                    <div
                      class="quantity-button quantity-up"
                      :class="
                        !Boolean(parseInt(cartItem.product.is_customize))
                          ? 'disabled'
                          : ''
                      "
                      @click="incrementQty(cartItem, cartItem.product.options)"
                    >
                      <svg
                        id="Layer_1"
                        class="quantity-plus-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g
                          id="Group_5341"
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
                    </div>
                  </div>
                  <Select2
                    v-else
                    :class="!cartItem.is_public ? 'disabled' : ''"
                    :options="getPriceOptions(cartItem.product.options)"
                    :attrs="{ minimumResultsForSearch: -1 }"
                    :value="cartItem.selected_option"
                    placeholder="Select pricing option"
                    @input="updatePriceOption($event, cartItem)"
                  />
                </div>
              </div>
              <div class="tb-column text-center flex25">
                <div class="top-column">
                  <label>
                    {{
                      cartItem.base_qty +
                      ' Qty = ' +
                      getPrice(cartItem.base_price)
                    }}</label
                  >
                  <label>{{ cartItem.product_unit }}</label>
                </div>
              </div>
              <div class="tb-column flex10">
                <div class="top-column">
                  <label>{{ getPrice(cartItem.total_amount) }}</label>
                </div>
              </div>
              <div class="tb-column text-center flex10">
                <div class="top-column">
                  <ul class="action">
                    <li>
                      <a
                        v-tooltip="`Remove Product`"
                        style="pointer-events: all"
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#product-remove"
                        @click="setDeletedId(cartItem.id)"
                      >
                        <svg
                          id="Layer_1"
                          style="max-height: 14px"
                          class="close-icon h-red"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Remove"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_4358"
                            transform="translate(-69.745 -317.549)"
                          >
                            <path
                              id="Path_3424"
                              class="fill-color"
                              d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                            ></path>
                            <path
                              id="Path_3425"
                              class="fill-color"
                              d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                            ></path>
                          </g>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <div v-if="!cartList.length" key="no-data" class="no-data-found">
              <div class="inner w-100">
                <div
                  class="cart-empty d-flex align-items-center justify-content-center"
                >
                  <div class="text-center">
                    <svg
                      id="Layer_1"
                      class="cart-icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Add_to_Cart_1">
                        <g
                          id="shopping-cart_1_"
                          transform="translate(0 -21.006)"
                        >
                          <g
                            id="Group_39446"
                            transform="translate(12.008 33.69)"
                          >
                            <g id="Group_39445">
                              <path
                                id="Path_40275"
                                class="fill-color"
                                d="M2.2,0C1,0,0,1,0,2.2s1,2.2,2.2,2.2s2.2-1,2.2-2.2v0C4.5,1,3.5,0,2.2,0z M2.2,3.1c-0.5,0-0.9-0.4-0.9-0.9c0-0.5,0.4-0.9,0.9-0.9c0.5,0,0.9,0.4,0.9,0.9l0,0C3.1,2.7,2.7,3.1,2.2,3.1z"
                              ></path>
                            </g>
                          </g>
                          <g id="Group_39448" transform="translate(0 21.705)">
                            <g id="Group_39447" transform="translate(0 0)">
                              <path
                                id="Path_40276"
                                class="fill-color"
                                d="M17.9,3.3c-0.1-0.2-0.3-0.3-0.5-0.3H4.2L3.5,0.5C3.5,0.2,3.2,0,2.9,0H0.7C0.3,0,0,0.3,0,0.7s0.3,0.7,0.7,0.7h1.7l2.2,9.2C4.6,10.8,4.9,11,5.2,11h10.5c0.3,0,0.6-0.2,0.7-0.5L18,3.9C18,3.7,18,3.5,17.9,3.3z M15.2,9.7H5.7L4.5,4.4h12L15.2,9.7z"
                              ></path>
                            </g>
                          </g>
                          <g id="Group_39450" transform="translate(3.86 33.69)">
                            <g id="Group_39449">
                              <path
                                id="Path_40277"
                                class="fill-color"
                                d="M2.2,0C1,0,0,1,0,2.2c0,1.2,1,2.2,2.2,2.2s2.2-1,2.2-2.2l0,0C4.5,1,3.5,0,2.2,0z M2.2,3.1c-0.5,0-0.9-0.4-0.9-0.9c0-0.5,0.4-0.9,0.9-0.9c0.5,0,0.9,0.4,0.9,0.9l0,0C3.1,2.7,2.7,3.1,2.2,3.1z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <h2>Your cart is empty.</h2>
                    <nuxt-link
                      :to="{ name: 'brand_name-store' }"
                      class="btn mt1"
                      >Go to store</nuxt-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <ul v-if="cartList.length" class="tfooter">
            <li class="d-flex align-items-center justify-content-center">
              <div class="flex60"></div>
              <div class="flex20 text-right pr1">
                <label>Total Amount : </label>
              </div>
              <div class="flex20">
                <strong>{{ getPrice(getTotalPrice) }}</strong>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt2 d-flex align-items-center justify-content-end">
      <nuxt-link :to="{ name: 'brand_name-store' }" class="btn btn-gray"
        >Continue Shopping</nuxt-link
      >
      <nuxt-link
        v-if="getTotalPrice > 0"
        :to="{ name: 'brand_name-checkout' }"
        class="btn"
        >Checkout</nuxt-link
      >
    </div>
    <confirmation-dialog
      v-model="showDeleteDialog"
      @click:confirm-button="removeCartItem"
    >
      <template slot="header">Remove Cart Product</template>
      Are you sure you want to remove the <strong>Cart Product</strong>?
    </confirmation-dialog>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import fileType from '~/mixins/fileType'
export default {
  layout: 'app-sidebar',
  middleware: ['check-url', 'check-auth'],
  components: {
    ContentLoader,
  },
  mixins: [fileType],
  data() {
    return {
      cartList: [],
      showDeleteDialog: false,
      loading: false,
    }
  },
  computed: {
    getTotalPrice() {
      return this.cartList.reduce((prev, current) => {
        return parseFloat(
          prev + (current.is_public ? parseFloat(current.total_amount) : 0)
        )
      }, 0)
    },
    getPriceOptions() {
      return (product) => {
        return JSON.parse(product).map((elem) => {
          return {
            ...elem,
            name: elem.qty + ' Qty - ' + elem.price + ' $',
            text: elem.qty + ' Qty - ' + elem.price + ' $',
          }
        })
      }
    },
  },
  mounted() {
    this.$store.dispatch('product/fetchBadgeCount')
    this.$store.dispatch('appData/fetchFolders')
    this.getCartList()
  },
  methods: {
    setDeletedId(id) {
      this.deletionId = id
      this.showDeleteDialog = true
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
    updatePriceOption(id, item) {
      const option = JSON.parse(item.product.options)
      const { price, qty } = option.find((i) => i.id === id)
      item.total_amount = price
      item.qty = qty
      item.base_qty = qty
      item.base_price = price
      item.selected_option = id
      this.updateCart(item, id)
    },
    incrementQty(item, option) {
      const initialQuantity = JSON.parse(option)[0].qty
      const initialPrice = JSON.parse(option)[0].price
      const pricePerQuantity = initialPrice / initialQuantity
      item.qty = parseInt(item.qty) + parseInt(initialQuantity)
      item.total_amount = Number(
        parseFloat(item.qty * pricePerQuantity).toFixed(2)
      )
      this.updateCart(item)
    },
    decrementQty(item, option) {
      const initialQuantity = JSON.parse(option)[0].qty
      if (parseInt(initialQuantity) === parseInt(item.qty)) {
        return
      }
      const initialPrice = JSON.parse(option)[0].price
      const pricePerQuantity = initialPrice / initialQuantity
      item.qty = parseInt(item.qty) - parseInt(initialQuantity)
      item.total_amount = Number(
        parseFloat(item.qty * pricePerQuantity).toFixed(2)
      )
      this.updateCart(item)
    },
    updateCart(item, id = '') {
      this.$axios
        .$post(`digital/cart/update`, {
          workspace_id: this.$getWorkspaceId(),
          cart_product_id: item.id,
          qty: item.qty,
          price: item.total_amount,
          selected_option: id || '',
        })
        .then(({ message, data }) => {
          item.amount = data.amount
          // this.$toast.success(message)
        })
        .catch(console.log)
    },
    getCartList() {
      this.loading = true
      this.$axios
        .$get(`digital/cart/view-cart?workspace_id=${this.$getWorkspaceId()}`)
        .then(({ data }) => {
          this.cartList = (data || []).filter(
            (e) => !e.asset.is_archive && !e.asset.is_deleted
          )
        })
        .catch(console.log)
        .finally(() => {
          this.loading = false
        })
    },
    removeCartItem() {
      this.$axios
        .$post(`digital/cart/delete-product`, {
          workspace_id: this.$getWorkspaceId(),
          cart_product_id: this.deletionId,
        })
        .then(({ message }) => {
          this.$toast.success(message)
          this.cartList.splice(
            this.cartList.findIndex((i) => i.id === this.deletionId),
            1
          )
          this.$store.dispatch('product/fetchBadgeCount')
        })
        .catch(console.log)
    },
  },
  head() {
    return {
      title: 'Cart | ' + this.$brandName() || 'Digital Asset Manager',
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

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
