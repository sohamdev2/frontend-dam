<template>
  <div class="single-screen choose-work choose-email">
    <div class="sign-screen-dtable">
      <div class="sign-screen-dtable-cell">
        <div class="sign-screen-right-content cs-form-group">
          <div class="sign-heading-text text-center signin-with-title">
            <nuxt-link to="/">
              <img
                class="logo"
                src="~/assets/img/marcom_hq_2_1.svg"
                alt="MarComHQ"
              />
            </nuxt-link>
            <p>Forgot Password?</p>
          </div>
          <div class="body-text mb-25 text-center">
            <p>Enter your email and we send you a password reset link.</p>
          </div>
          <form @submit.prevent="submit">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Email Address *</label>
                  <input
                    v-model="$v.form.email.$model"
                    type="email"
                    class="form-control"
                  />
                  <template v-if="$v.form.email.$error">
                    <div v-if="!$v.form.email.required" class="input-error">
                      Email address is required
                    </div>
                    <div v-else-if="!$v.form.email.email" class="input-error">
                      Please enter valid email address.
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="row mt-25">
              <div class="col-sm-12">
                <AppButton
                  type="submit"
                  :disabled="loading || $v.$invalid"
                  :loading="loading"
                >
                  <template #loading> Please wait... </template>
                  Send Password Reset Link
                </AppButton>
              </div>
            </div>
          </form>
        </div>
        <div class="bottom-fix-link-center">
          <a>Term of use.</a>
          <a>Privacy policy</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import storeBrandName from '~/mixins/storeBrandName'

export default {
  middleware: ['check-url'],
  mixins: [storeBrandName],
  data() {
    return {
      form: { email: null },
      loading: false,
    }
  },
  methods: {
    async submit(e) {
      if ((this.$v.$touch(), this.$v.$invalid) || this.loading) return

      this.loading = true

      await this.$guestAxios
        .post('forgot-password', this.form)
        .then(({ message, data }) => {
          this.$toast.global.success(
            data?.message || message || 'Check your inbox for reset s'
          )

          this.$router.replace(`${this.brandName}/login`)
        })
        .catch(this.$showErrorToast)

      this.loading = false
    },
  },
  validations: {
    form: {
      email: { required, email },
    },
  },
}
</script>
