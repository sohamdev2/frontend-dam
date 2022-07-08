<template>
  <div id="shop" class="tab-pane">
    <h4>{{ file.display_file_name }}</h4>
    <ul class="overview-table shop-info">
      <li>
        <span>SKU</span>
        <span>{{ file.asset_product.sku || '-' }}</span>
      </li>
      <li>
        <span>Price</span>
        <span>{{
          assetProduct.pricing_option === '1'
            ? getPrice(calculatedPrice)
            : getPrice(minPrice)
        }}</span>
      </li>
      <li>
        <span>Unit per Qty</span>
        <span>{{ file.asset_product.unit }}</span>
      </li>
      <li>
        <span>Qty</span>
        <template v-if="assetProduct.pricing_option === '1'">
          <div class="quantity">
            <div
              class="quantity-button quantity-down"
              :class="
                !Boolean(parseInt(assetProduct.is_customize)) ? 'disabled' : ''
              "
              @click="decrementQty"
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
                <g id="Group_4454" transform="translate(-1005 -577.999)">
                  <path
                    id="Path_3395"
                    class="fill-color"
                    d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7s0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                  ></path>
                </g>
              </svg>
            </div>
            <input
              type="number"
              :min="getPriceOptions[0].qty"
              :value="cartQuantity"
              class="form-control"
              disabled
            />
            <div
              class="quantity-button quantity-up"
              :class="
                !Boolean(parseInt(assetProduct.is_customize)) ? 'disabled' : ''
              "
              @click="incrementQty"
            >
              <svg
                id="Layer_1"
                class="quantity-plus-icon"
                :style="
                  Boolean(parseInt(assetProduct.is_customize))
                    ? 'font-weight:bold'
                    : ''
                "
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_5341" transform="translate(-1005 -577.999)">
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
        </template>
        <Select2
          v-else-if="assetProduct.pricing_option === '2'"
          v-model="selectedOption"
          :options="getPriceOptions"
          :attrs="{ minimumResultsForSearch: -1 }"
          placeholder="Select pricing option"
        />
      </li>
      <li v-if="assetProduct.pricing_option === '1'">
        <span>&nbsp;</span>
        <p
          v-if="
            assetProduct.pricing_option === '1' &&
            assetProduct.is_customize === '1'
          "
        >
          <strong class="text-danger">*</strong> Qty is allowed to adjust
          addition by <span>{{ getPriceOptions[0].qty }}</span>
        </p>
      </li>
      <li>
        <a
          href="javascript:void(0);"
          class="btn btn-icon mt1"
          @click="addToCart"
        >
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
              <g id="shopping-cart_1_" transform="translate(0 -21.006)">
                <g id="Group_39446" transform="translate(12.008 33.69)">
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
          Add to Cart
        </a>
      </li>
    </ul>
    <!-- <div v-if="cartAdded" class="modal-body">
      <div class="success-msg">
        <div class="alert alert-success">
          <svg
            id="Layer_1"
            class="alert-icon mr-1"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <path
              class="fill-color"
              d="M369.2,174.8c7.8,7.8,7.8,20.5,0,28.3L235,337.2c-7.8,7.8-20.5,7.8-28.3,0l-63.9-63.9c-7.8-7.8-7.8-20.5,0-28.3c7.8-7.8,20.5-7.8,28.3,0l49.7,49.7l120-120C348.7,167,361.4,167,369.2,174.8z M512,256c0,141.5-114.5,256-256,256C114.5,512,0,397.5,0,256C0,114.5,114.5,0,256,0C397.5,0,512,114.5,512,256z M472,256c0-119.4-96.6-216-216-216C136.6,40,40,136.6,40,256c0,119.4,96.6,216,216,216C375.4,472,472,375.4,472,256z"
            ></path>
          </svg>
          Product is added to cart.
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    file: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      selectedOption: '',
      cartQuantity: 0,
      initialQuantity: 0,
      minPrice: 0,
      cartAdded: false,
      calculatedPrice: 0,
      pricePerQuantity: 0,
    }
  },
  computed: {
    getPriceOptions() {
      if (this.file) {
        return JSON.parse(this.file.asset_product.options).map((elem) => {
          return {
            ...elem,
            name: elem.qty + ' Qty - ' + elem.price + ' $',
            text: elem.qty + ' Qty - ' + elem.price + ' $',
          }
        })
      }
      return []
    },
    assetProduct() {
      if (this.file) {
        return this.file.asset_product
      }
      return {}
    },
  },
  watch: {
    active(v) {
      if (!v) {
        this.cartAdded = false
      }
    },
    selectedOption: {
      handler() {
        if (this.file) {
          const data = JSON.parse(this.file.asset_product.options)
          const item = data.find((e) => e.id === this.selectedOption)
          if (item) {
            this.minPrice = item.price
          }
        }
      },
    },
    file: {
      handler() {
        this.initProduct()
      },
      deep: true,
    },
  },
  mounted() {
    this.initProduct()
  },
  methods: {
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
    initProduct() {
      if (this.file && this.getPriceOptions.length) {
        this.cartQuantity = parseFloat(this.getPriceOptions[0].qty)
        this.initialQuantity = parseFloat(this.getPriceOptions[0].qty)
        this.selectedOption = this.getPriceOptions[0].id
        this.minPrice = parseFloat(this.getPriceOptions[0].price)
        this.calculatedPrice = parseFloat(this.getPriceOptions[0].price)
      }
    },
    incrementQty() {
      if (!this.assetProduct.is_customize) {
        return
      }
      this.pricePerQuantity = this.minPrice / this.initialQuantity
      this.cartQuantity += parseInt(this.initialQuantity)
      this.calculatedPrice = Number(
        parseFloat(this.cartQuantity * this.pricePerQuantity).toFixed(2)
      )
    },
    decrementQty() {
      if (this.cartQuantity === this.initialQuantity) {
        return
      }
      if (!this.assetProduct.is_customize) {
        return
      }
      this.cartQuantity -= this.initialQuantity
      this.calculatedPrice = Number(
        parseFloat(this.cartQuantity * this.pricePerQuantity).toFixed(2)
      )
    },
    addToCart() {
      const payload = this.getPriceOptions.find(
        (e) => e.id === this.selectedOption
      )
      this.$axios
        .$post('digital/cart/add-to-cart', {
          workspace_id: this.$getWorkspaceId(),
          asset_id: this.assetProduct.asset_id,
          asset_product_id: this.assetProduct.id,
          selected_option: this.selectedOption,
          qty:
            this.assetProduct.pricing_option === '1'
              ? this.cartQuantity
              : payload.qty,
          price:
            this.assetProduct.pricing_option === '1'
              ? this.calculatedPrice
              : payload.price,
          unit: this.assetProduct.unit,
        })
        .then(({ message }) => {
          this.cartAdded = true
          this.$toast.success(message)
          setTimeout(() => {
            this.$router.push({
              name: 'brand_name-cart',
            })
          }, 300)
          this.$store.dispatch('product/fetchBadgeCount')
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error))
        })
    },
  },
}
</script>

<style></style>
