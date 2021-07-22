<template>
  <div class="body-content login">
    <div class="sign-screen customscrollbar h-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-heading-text text-center">
              <nuxt-link to="/">
                <img
                  :src="
                    logo
                      ? logo
                      : require('~/assets/img/lariat-marketing-hub.svg')
                  "
                  alt=""
                  class="img-responsive img-center"
                />
              </nuxt-link>
            </div>
            <div class="sign-body bg-white">
              <h4>Forgot Password?</h4>
              <p>Enter your email and we send you a password reset link.</p>
              <form @submit.prevent="submit">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <label class="control-label">Email</label>
                      <input
                        v-model="$v.form.email.$model"
                        type="email"
                        class="form-control"
                        data-lpignore="true"
                      />
                      <template v-if="$v.form.email.$error">
                        <div v-if="!$v.form.email.required" class="input-error">
                          Email address is required
                        </div>
                        <div
                          v-else-if="!$v.form.email.email"
                          class="input-error"
                        >
                          Please enter valid email address.
                        </div>
                      </template>
                    </div>
                  </div>
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
          </div>
          <div class="bottom-fix-link-center">
            <a href="javascript:void(0);">Term of use.</a>
            <a href="javascript:void(0);">Privacy policy</a>
          </div>
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
      form: { email: null, url: null },
      logo: '',
      loading: false,
    }
  },
  created() {
    this.logo = this.$store.state.appData.logo
  },
  methods: {
    async submit(e) {
      if ((this.$v.$touch(), this.$v.$invalid) || this.loading) return

      this.loading = true
      this.form.url = this.brandName
      await this.$guestAxios
        .post('forgot-password', this.form)
        .then(({ message, data }) => {
          this.$toast.global.success(
            data?.message || message || 'Check your inbox for reset s'
          )

          this.$router.replace(`/${this.brandName}/login`)
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
