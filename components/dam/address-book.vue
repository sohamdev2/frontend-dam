<template>
  <div class="general-settings h-100 w-100">
    <div class="general-settings-right w-100 h-100">
      <div class="general-settings-title d-flex align-items-center">
        <nuxt-link
          :to="{
            name: 'brand_name-address-book',
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
        <h2 class="title">{{ getTitle }}</h2>
      </div>
      <div class="workspace-settings">
        <div class="row no-gutters h-100">
          <div class="col-lg-6 col-md-12 h-100">
            <div class="workspace-setting">
              <div class="general-settings-box customscrollbar">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group required">
                      <label class="control-label">Company Name</label>
                      <input
                        v-model="address.company_name"
                        type="text"
                        name="cname"
                        placeholder=""
                        class="form-control"
                      />
                      <div
                        v-if="
                          $v.address.$error && !$v.address.company_name.required
                        "
                        class="input-error"
                      >
                        Field is required
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group required">
                      <label class="control-label">Name</label>
                      <input
                        v-model="address.name"
                        type="text"
                        name="name"
                        placeholder=""
                        class="form-control"
                      />
                      <div
                        v-if="$v.address.$error && !$v.address.name.required"
                        class="input-error"
                      >
                        Field is required
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group required">
                      <label class="control-label">Email</label>
                      <input
                        v-model="address.email"
                        type="email"
                        name="cmail"
                        placeholder=""
                        class="form-control"
                      />
                      <div v-if="$v.address.$error" class="input-error">
                        <span v-if="!$v.address.email.required"
                          >Field is required</span
                        >
                        <span v-else-if="!$v.address.email.email"
                          >Please enter valid email address</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group required">
                      <label class="control-label">Phone</label>
                      <input
                        v-model="address.phone"
                        type="text"
                        name="phone"
                        placeholder=""
                        class="form-control"
                      />
                      <div v-if="$v.address.$error" class="input-error">
                        <span v-if="!$v.address.phone.numeric"
                          >Please enter valid phone</span
                        >
                        <span v-else>Field is required</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <label class="control-label">Address Line 1</label>
                      <input
                        v-model="address.address1"
                        type="text"
                        name="address-line1"
                        placeholder=""
                        class="form-control"
                      />
                      <div
                        v-if="
                          $v.address.$error && !$v.address.address1.required
                        "
                        class="input-error"
                      >
                        Field is required
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label class="control-label">Address Line 2</label>
                      <input
                        v-model="address.address2"
                        type="text"
                        name="address-line2"
                        placeholder=""
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group required">
                      <label class="control-label">City</label>
                      <input
                        v-model="address.city"
                        type="text"
                        name="city"
                        placeholder=""
                        class="form-control"
                      />
                      <div
                        v-if="$v.address.$error && !$v.address.city.required"
                        class="input-error"
                      >
                        Field is required
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group required">
                      <label class="control-label">State/Province</label>
                      <input
                        v-model="address.state"
                        type="text"
                        name="state"
                        placeholder=""
                        class="form-control"
                      />
                      <div
                        v-if="$v.address.$error && !$v.address.state.required"
                        class="input-error"
                      >
                        Field is required
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group required">
                      <label class="control-label">ZIP</label>
                      <input
                        v-model="address.zip_code"
                        type="text"
                        name="zip"
                        placeholder=""
                        class="form-control"
                      />
                      <div
                        v-if="
                          $v.address.$error && !$v.address.zip_code.required
                        "
                        class="input-error"
                      >
                        Field is required
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group required">
                      <label class="control-label">Country</label>
                      <Select2
                        v-model="address.country"
                        :options="['United States', 'Canada']"
                        placeholder="Country"
                      ></Select2>
                      <div
                        v-if="$v.address.$error && !$v.address.country.required"
                        class="input-error"
                      >
                        Field is required
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <button
                      type="submit"
                      name="submit"
                      class="btn"
                      :disabled="loading"
                      @click="saveAddress"
                    >
                      {{ edit ? 'Update address' : 'Save Address' }}
                    </button>
                    <nuxt-link
                      class="btn btn-gray"
                      :to="{
                        name: 'brand_name-address-book',
                        params: { brand_name: this.$getBrandName() },
                      }"
                    >
                      Cancel
                    </nuxt-link>
                  </div>
                </div>
                <!-- End -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, numeric } from 'vuelidate/lib/validators'
const checkNull = (value) => value !== 0 && value !== '' && value !== null
export default {
  props: {
    edit: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      address: {
        user_id: this.$auth.user.user_id,
        workspace_id: this.$getWorkspaceId(),
        company_name: '',
        name: '',
        email: '',
        phone: null,
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
      },
      loading: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    getTitle() {
      return this.edit ? 'Edit address book' : 'Add New Address'
    },
  },
  mounted() {
    if (this.edit) {
      this.viewAddress()
    }
  },
  methods: {
    // getCompanyDetails() {
    //   this.$axios
    //     .$get(`digital/order/user-details`, {
    //       params: {
    //         url_workspace_id: this.$getWorkspaceId(),
    //       },
    //     })
    //     .then(({ data }) => {
    //       this.address.company_name = data.company_name
    //       this.address.email = data.userEmail
    //       this.address.name = data.userName
    //       this.address.phone = data.userPhone
    //     })
    //     .catch(console.log)
    // },
    viewAddress() {
      this.$axios
        .$post(`digital/user-address/view-address`, {
          address_id: this.$route.params.id,
          workspace_id: this.$getWorkspaceId(),
        })
        .then(({ data }) => {
          this.address = data
        })
    },
    saveAddress() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.loading = true
      const url = this.edit ? 'update-address' : 'create-address'
      if (this.edit) {
        this.address.address_id = this.address.id
        this.address.workspace_id = this.$getWorkspaceId()
        delete this.address.id
      }
      this.$axios
        .$post(`digital/user-address/${url}`, {
          ...this.address,
        })
        .then(({ message }) => {
          this.$toast.success(message)
          this.$router.replace({
            name: 'brand_name-address-book',
            params: { brand_name: this.$getBrandName() },
          })
          this.loading = false
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
          this.loading = false
        })
    },
  },
  validations() {
    return {
      address: {
        company_name: {
          required,
        },
        name: {
          required,
        },
        address1: {
          required,
        },
        email: {
          email,
          required,
        },
        phone: {
          required,
          numeric,
          checkNull,
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
}
</script>

<style></style>
