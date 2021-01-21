<template>
  <ShowWhenReady>
    <div class="single-screen login-screen">
      <div class="sign-screen">
        <div class="sign-screen-dtable">
          <div class="sign-screen-dtable-cell">
            <div class="sign-screen-right-content">
              <div class="sign-heading-text text-center">
                <img
                  class="logo"
                  src="~/assets/img/marcom_hq_2_1.svg"
                  alt="MarComHQ"
                />
                <!-- <h2 class="my-3">Digital Asset Manager</h2> -->
                <p>Sign In to Your Account</p>
                <div class="body-text">
                  Required fields are marked with an asterisk (*)
                </div>
              </div>
              <form @submit.prevent="login">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label>Email Address *</label>
                      <input
                        v-model="$v.form.email.$model"
                        type="email"
                        class="form-control"
                        placeholder
                        autofocus
                      />
                      <div
                        v-if="$v.form.email.$error && !$v.form.email.required"
                        class="input-error"
                      >
                        Email address is required
                      </div>
                      <div
                        v-if="$v.form.email.$error && !$v.form.email.email"
                        class="input-error"
                      >
                        Please enter valid email address.
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label>Password *</label>
                      <input
                        v-model="$v.form.password.$model"
                        type="password"
                        class="form-control"
                      />
                      <div
                        v-if="
                          $v.form.password.$error && !$v.form.password.required
                        "
                        class="input-error"
                      >
                        Password is required
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <AppButton
                      type="submit"
                      :disabled="loading || $v.$invalid"
                      :loading="loading"
                    >
                      <template #loading> Signing in... </template>
                      Sign In to MarcomHQ
                    </AppButton>
                  </div>
                  <div class="col-sm-12">
                    <div class="pull-right mt-25 text-right">
                      <nuxt-link
                        :to="`/forgot-password?brandName=${brandName}`"
                        class="color-gray"
                      >
                        Forgot Password
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="bottom-fix-link-center">
              <a href="javascript:void(0);">Terms of Use.</a>
              <a href="javascript:void(0);">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ShowWhenReady>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import storeBrandName from '~/mixins/storeBrandName'

export default {
  auth: false,
  mixins: [storeBrandName],
  data() {
    return {
      loading: false,
      brandName: '',
      form: {
        email: null,
        password: null,
        type: 'sub_doamin',
      },
    }
  },
  methods: {
    async login(e) {
      if ((this.$v.$touch(), this.$v.$invalid)) return

      this.loading = true

      await this.$auth
        .loginWith('local', { data: this.form })
        .then(() => this.$router.push(`/${this.brandName}`))
        .catch(this.$showErrorToast)

      this.loading = false
    },
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
}
</script>
