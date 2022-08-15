<template>
  <div class="body-content-right checkout p0">
    <div
      class="general-settings-title d-flex align-items-center mb10 border-bottom"
    >
      <h2 class="title">Checkout</h2>
    </div>
    <div class="workspace-settings customscrollbar">
      <div class="row big-gutters">
        <div class="col-md-7">
          <h4 class="mt1">Billing Information</h4>
          <div class="form">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group required">
                  <label class="control-label">Full Name</label>
                  <input
                    v-model="billingInfo.user_name"
                    type="text"
                    name="name"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.billingInfo.$error &&
                      !$v.billingInfo.user_name.required
                    "
                    class="input-error"
                  >
                    Field is required
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Email</label>
                  <input
                    v-model="billingInfo.user_email"
                    type="email"
                    name="name"
                    class="form-control"
                  />
                  <div v-if="$v.billingInfo.$error" class="input-error">
                    <span v-if="!$v.billingInfo.user_email.required"
                      >Field is required</span
                    >
                    <span v-else-if="!$v.billingInfo.user_email.email"
                      >Please enter valid email address</span
                    >
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Phone</label>
                  <input
                    v-model="billingInfo.user_phone"
                    type="text"
                    name="name"
                    class="form-control"
                  />
                  <div v-if="$v.billingInfo.$error" class="input-error">
                    <span
                      v-if="
                        $v.billingInfo.user_phone.$error &&
                        !$v.billingInfo.user_phone.required
                      "
                      >Field is required</span
                    >
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="control-label">Special Instruction</label>
                  <textarea
                    v-model="billingInfo.user_note"
                    cols="4"
                    rows="4"
                    class="form-control"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <h4 class="mt1">Shipping Information</h4>
          <div class="form">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <!-- <label class="control-label">Existing Address</label> -->
                  <select2
                    v-model="selectedAddressOption"
                    placeholder="Select Existing Address or Enter New Address"
                  >
                    <optgroup
                      v-for="(group, name) in addressOptions"
                      :key="name"
                      :label="group.name"
                    >
                      <option
                        v-for="(option, index) in group.type"
                        :key="index"
                        :value="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </optgroup></select2
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Company Name</label>
                  <input
                    v-model="shippingInfo.shipping_company_name"
                    type="text"
                    name="cname"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.shippingInfo.$error &&
                      !$v.shippingInfo.shipping_company_name.required
                    "
                    class="input-error"
                  >
                    Field is required
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Name</label>
                  <input
                    v-model="shippingInfo.shipping_user_name"
                    type="text"
                    name="name"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.shippingInfo.$error &&
                      !$v.shippingInfo.shipping_user_name.required
                    "
                    class="input-error"
                  >
                    Field is required
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Email</label>
                  <input
                    v-model="shippingInfo.shipping_user_email"
                    type="email"
                    name="email"
                    class="form-control"
                  />
                  <div v-if="$v.shippingInfo.$error" class="input-error">
                    <span v-if="!$v.shippingInfo.shipping_user_email.required"
                      >Field is required</span
                    >
                    <span v-else-if="!$v.shippingInfo.shipping_user_email.email"
                      >Please enter valid email address</span
                    >
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Phone</label>
                  <input
                    v-model="shippingInfo.shipping_user_phone"
                    type="text"
                    name="phone"
                    class="form-control"
                  />
                  <div v-if="$v.shippingInfo.$error" class="input-error">
                    <span
                      v-if="
                        $v.shippingInfo.shipping_user_phone.$error &&
                        !$v.shippingInfo.shipping_user_phone.required
                      "
                      >Field is required</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Address Line 1</label>
                  <input
                    v-model="shippingInfo.address1"
                    type="text"
                    name="address1"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.shippingInfo.$error &&
                      !$v.shippingInfo.address1.required
                    "
                    class="input-error"
                  >
                    Field is required
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Address Line 2</label>
                  <input
                    v-model="shippingInfo.address2"
                    type="text"
                    name="address2"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">City</label>
                  <input
                    v-model="shippingInfo.city"
                    type="text"
                    name="city"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.shippingInfo.$error && !$v.shippingInfo.city.required
                    "
                    class="input-error"
                  >
                    Field is required
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">State</label>
                  <input
                    v-model="shippingInfo.state"
                    type="text"
                    name="state"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.shippingInfo.$error && !$v.shippingInfo.state.required
                    "
                    class="input-error"
                  >
                    Field is required
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Postal Code</label>
                  <input
                    v-model="shippingInfo.zip_code"
                    type="text"
                    name="postal"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.shippingInfo.$error &&
                      !$v.shippingInfo.zip_code.required
                    "
                    class="input-error"
                  >
                    Field is required
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Country</label>
                  <select2
                    v-model="shippingInfo.country"
                    :options="['United States', 'Canada']"
                    placeholder="Select Country"
                  />
                  <div
                    v-if="
                      $v.shippingInfo.$error &&
                      !$v.shippingInfo.country.required
                    "
                    class="input-error"
                  >
                    Field is required
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="check-label"
                    >Save to Address Book
                    <input
                      v-model="shippingInfo.is_save_address"
                      type="checkbox"
                      name=""
                    />
                    <span class="check-span"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <h4 class="mt2">Order Summary</h4>
          <div class="box bg-lightgray">
            <div class="paymentInfo">
              <div
                class="d-flex align-items-center justify-content-between mt-2"
              >
                <label>Sub Total</label>
                <h5>{{ getPrice(shippingInfo.sub_total) }}</h5>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mt-2"
              >
                <label><sup>#</sup>Shipping Cost</label>
                <h5>-</h5>
              </div>
              <hr />
              <div
                class="d-flex align-items-center justify-content-between mt-2"
              >
                <strong>Grand Total</strong>
                <h5>{{ getPrice(shippingInfo.grand_total) }}</h5>
              </div>
            </div>
          </div>
          <div class="success-msg mt2">
            <div class="alert alert-warning">
              <svg
                id="Layer_1"
                class="alert-icon"
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
              <sup>#</sup> Please note that Shipping charges will be added Once
              your admin assign Shipping method to your placed order and You
              will also notified through Your billing email ID.
            </div>
          </div>
          <div class="mt2">
            <button
              href="javascript:;"
              class="btn btn-big btn-block"
              :disabled="loading"
              @click="placeOrder"
            >
              <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { email, required } from 'vuelidate/lib/validators'
const checkNull = (value) => value !== 0 && value !== '' && value !== null
export default {
  layout: 'app-sidebar',
  middleware: ['check-url', 'check-auth', 'can-access-cart-store'],
  components: {
    // ContentLoader,
  },
  data() {
    return {
      billingInfo: {
        user_name: '',
        user_email: '',
        user_phone: '',
        user_note: '',
      },
      shippingInfo: {
        user_id: this.$auth.user.user_id,
        workspace_id: this.$getWorkspaceId(),
        shipping_company_name: '',
        shipping_user_name: '',
        shipping_user_email: '',
        shipping_user_phone: null,
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
        is_save_address: false,
        grand_total: 0,
        sub_total: 0,
      },
      addressOptions: [],
      loading: false,
      selectedAddressOption: '',
    }
  },
  computed: {
    orderManagementAllowed() {
      return !!this.$auth.user.subscription_features?.asset_order_management
        ?.enable
    },
  },
  watch: {
    selectedAddressOption() {
      this.getAddress()
    },
  },
  created() {
    if (!this.orderManagementAllowed) return
    this.getCartList()
  },
  mounted() {
    if (!this.orderManagementAllowed) return
    this.getAddressList()
    this.$store.dispatch('appData/fetchFolders')
    this.getUserInfo()
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
    getUserInfo() {
      this.loading = true
      this.$axios
        .$get(`digital/order/user-details`, {
          params: {
            url_workspace_id: this.$getWorkspaceId(),
          },
        })
        .then(({ data }) => {
          this.billingInfo.user_name = data.userName
          this.billingInfo.user_email = data.userEmail
          this.billingInfo.user_phone = data.userPhone
          this.shippingInfo.shipping_user_email = data.userEmail
          this.shippingInfo.shipping_user_name = data.userName
          this.shippingInfo.shipping_user_phone = data.userPhone
          this.shippingInfo.shipping_company_name = data.company_name
        })
        .catch(console.log)
        .finally(() => {
          this.loading = false
        })
    },
    getCartList() {
      this.loading = true
      this.$axios
        .$post(`digital/order/order-summary`, {
          url_workspace_id: this.$getWorkspaceId(),
        })
        .then(({ data }) => {
          this.shippingInfo.grand_total = data.grand_total
          this.shippingInfo.sub_total = data.sub_total
          if (data.grand_total <= 0) {
            this.$router.push({
              name: 'brand_name',
            })
          }
        })
        .catch(console.log)
        .finally(() => {
          this.loading = false
        })
    },
    getAddressList() {
      this.$axios
        .$get(
          `digital/order/existing-address-list`,

          {
            params: {
              url_workspace_id: this.$getWorkspaceId(),
              user_id: this.$auth.user.user_id,
            },
          }
        )
        .then(({ data }) => {
          this.addressOptions = data.map((address) => {
            return {
              id: address.id,
              text: address.full_address,
              name: address.full_address,
            }
          })
          this.addressOptions = [
            {
              type: [
                { name: 'Add New Address', id: '0', text: 'Add New Address' },
              ],
              name: 'Add New Address',
            },
            { type: [...this.addressOptions], name: 'Existing Address' },
          ]
        })
    },
    getAddress() {
      if (parseInt(this.selectedAddressOption) === 0) {
        this.shippingInfo.address1 = ''
        this.shippingInfo.address2 = ''
        this.shippingInfo.city = ''
        this.shippingInfo.state = ''
        this.shippingInfo.country = ''
        this.shippingInfo.shipping_company_name = ''
        this.shippingInfo.shipping_user_name = ''
        this.shippingInfo.shipping_user_email = ''
        this.shippingInfo.zip_code = ''
        this.shippingInfo.shipping_user_phone = null
        return
      }
      this.$axios
        .$post(`digital/user-address/view-address`, {
          address_id: this.selectedAddressOption,
          workspace_id: this.$getWorkspaceId(),
        })
        .then(({ data }) => {
          this.shippingInfo.address1 = data.address1
          this.shippingInfo.address2 = data.address2
          this.shippingInfo.city = data.city
          this.shippingInfo.state = data.state
          this.shippingInfo.country = data.country
          this.shippingInfo.zip_code = data.zip_code
          this.shippingInfo.shipping_company_name = data.company_name
          this.shippingInfo.shipping_user_name = data.user_name
          this.shippingInfo.shipping_user_email = data.user_email
          this.shippingInfo.shipping_user_phone = data.user_phone
        })
    },
    placeOrder() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const payload = {
        ...this.billingInfo,
        ...this.shippingInfo,
      }
      this.loading = true
      this.$axios
        .$post(
          `digital/order/place-order?url_workspace_id=${this.$getWorkspaceId()}`,
          payload
        )
        .then(({ data, status }) => {
          if (status) {
            this.$router.push({
              name: 'brand_name-success',
              query: {
                id: data.order_id,
                order_id: data.id,
              },
            })
            this.$store.dispatch('product/fetchBadgeCount')
            this.loading = false
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
          this.loading = false
        })
    },
  },
  validations() {
    return {
      billingInfo: {
        user_name: { required },
        user_email: { email, required },
        user_phone: { required, checkNull },
      },
      shippingInfo: {
        shipping_company_name: { required },
        shipping_user_name: { required },
        shipping_user_email: { email, required },
        shipping_user_phone: { required, checkNull },
        address1: {
          required,
        },
        city: {
          required,
        },
        state: {
          required,
        },
        country: {
          required,
        },
        zip_code: {
          required,
        },
      },
    }
  },
  head() {
    return {
      title: 'Checkout | ' + this.$brandName() || 'Digital Asset Manager',
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
</style>
