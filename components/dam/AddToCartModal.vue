<template>
  <Model v-model="active" class="add-to-cart-modal" layout-class="modal-small">
    <div class="modal-header">
      <h5 id="exampleModalLongTitle" class="modal-title">Add to Cart</h5>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        @click="active = false"
      >
        <span aria-hidden="true"
          ><svg
            id="Layer_1"
            class="close-icon h-red"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4358" transform="translate(-69.745 -317.549)">
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
            </g></svg
        ></span>
      </button>
    </div>
    <div v-if="cartAdded" class="modal-body">
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
      <div class="d-flex align-items-center justify-content-center">
        <nuxt-link
          :to="{
            name: 'brand_name-cart',
          }"
          class="btn"
          >View Cart</nuxt-link
        >
      </div>
    </div>
    <div v-else class="modal-body">
      <h4 class="mb20">{{ file && file.display_file_name }}</h4>
      <div class="form-group">
        <label class="control-label">Price:</label>
        <strong
          >${{
            assetProduct.pricing_option === '1' ? calculatedPrice : minPrice
          }}
          (1 Qty = {{ assetProduct.unit }} Units)</strong
        >
      </div>

      <div class="form-group mb0">
        <div class="d-flex align-items-center">
          <template v-if="assetProduct.pricing_option === '1'">
            <label class="control-label">Qty</label>
            <div class="quantity">
              <div
                class="quantity-button quantity-down"
                :class="
                  !Boolean(parseInt(assetProduct.is_customize))
                    ? 'disabled'
                    : ''
                "
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
                  @click="decrementQty"
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
                v-if="!Boolean(parseInt(assetProduct.is_customize))"
                type="number"
                :min="getPriceOptions[0].qty"
                :value="cartQuantity"
                class="form-control"
                disabled
              />
              <input
                v-else
                v-model="cartQuantity"
                type="number"
                :min="getPriceOptions[0].qty"
                class="form-control"
              />
              <div
                class="quantity-button quantity-up"
                :class="
                  !Boolean(parseInt(assetProduct.is_customize))
                    ? 'disabled'
                    : ''
                "
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
                  @click="incrementQty"
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
          <a
            href="javascript:void(0);"
            class="btn btn-icon"
            data-toggle="modal"
            data-target="#ProductAddtoCart"
            @click="addToCart"
          >
            <svg
              id="Capa_1"
              class="cart-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <g>
                  <g>
                    <path
                      class="fill-color"
                      d="M194.6,382.7c-35.6,0-64.6,29-64.6,64.6s29,64.6,64.6,64.6s64.6-29,64.6-64.6S230.2,382.7,194.6,382.7z M194.6,473.2c-14.3,0-25.9-11.6-25.9-25.9s11.6-25.9,25.9-25.9c14.3,0,25.9,11.6,25.9,25.9C220.4,461.6,208.9,473.2,194.6,473.2z"
                    ></path>
                    <path
                      class="fill-color"
                      d="M385.9,382.7c-35.6,0-64.6,29-64.6,64.6s29,64.6,64.6,64.6s64.6-29,64.6-64.6S421.6,382.7,385.9,382.7z M385.9,473.2c-14.3,0-25.9-11.6-25.9-25.9s11.6-25.9,25.9-25.9c14.3,0,25.9,11.6,25.9,25.9C411.8,461.6,400.2,473.2,385.9,473.2z"
                    ></path>
                    <path
                      class="fill-color"
                      d="M498.1,126.3c-3.7-4.6-9.3-7.3-15.2-7.3H143.3l-17.6-89.1c-1.5-7.8-7.7-13.9-15.5-15.3L32.6,0.3C22-1.6,12,5.4,10,15.9s5,20.6,15.6,22.6l64.6,11.8L147.1,338c1.8,9.1,9.8,15.6,19,15.6h271.5c9,0,16.9-6.2,18.9-15l45.3-195.9C503.1,136.9,501.8,130.9,498.1,126.3z M422.2,314.8H182.1L151,157.7h307.5L422.2,314.8z"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            Add to Cart
          </a>
        </div>
        <p
          v-if="
            assetProduct.pricing_option === '1' &&
            assetProduct.is_customize === '1'
          "
        >
          <strong class="text-danger">*</strong> Qty is allowed to adjust
          addition by <span>{{ getPriceOptions[0].qty }}</span>
        </p>
      </div>
    </div>
  </Model>
</template>

<script>
import Model from '@/components/widgets/Model'
export default {
  components: { Model },
  extends: Model,
  props: {
    file: {
      type: Object,
      required: true,
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
    initProduct() {
      if (this.file && this.getPriceOptions.length) {
        this.cartQuantity = parseInt(this.getPriceOptions[0].qty)
        this.initialQuantity = parseInt(this.getPriceOptions[0].qty)
        this.selectedOption = this.getPriceOptions[0].id
        this.minPrice = parseInt(this.getPriceOptions[0].price)
        this.calculatedPrice = parseInt(this.getPriceOptions[0].price)
      }
    },
    incrementQty() {
      if (!this.assetProduct.is_customize) {
        return
      }
      this.pricePerQuantity = this.minPrice / this.initialQuantity
      this.cartQuantity += parseInt(this.initialQuantity)
      this.calculatedPrice = parseFloat(
        this.cartQuantity * this.pricePerQuantity
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
      this.calculatedPrice = parseFloat(
        this.cartQuantity * this.pricePerQuantity
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
          this.$store.dispatch('product/fetchBadgeCount')
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error))
        })
    },
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
</style>
