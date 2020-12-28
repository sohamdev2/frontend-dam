<template>
  <div class="single-screen choose-work choose-email">
    <div class="sign-screen-dtable">
      <div v-if="error" class="sign-screen-dtable-cell">
        <div class="sign-screen-right-content cs-form-group">
          <div class="sign-heading-text text-center signin-with-title">
            <nuxt-link to="/login">
              <img
                class="logo"
                src="~/assets/img/marcom_hq_2_1.svg"
                alt="MarComHQ"
              />
            </nuxt-link>
            <h2>{{ message }}</h2>
            <h4 class="text-center">
              This URL is not valid to reset Password.
            </h4>
          </div>
        </div>
      </div>

      <div v-else class="sign-screen-dtable-cell">
        <div class="sign-screen-right-content cs-form-group">
          <div class="sign-heading-text text-center signin-with-title">
            <img
              class="logo"
              src="~/assets/img/marcom_hq_2_1.svg"
              alt="MarComHQ"
              @click="loginPage"
            />
            <p>Reset Password</p>
          </div>
          <div class="body-text mb-25 text-center">
            <p>You’re resetting password for {{ form.email }}</p>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Password *</label>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    autofocus
                  />
                  <div
                    v-if="$v.form.password.$error && !$v.form.password.required"
                    class="input-error"
                  >
                    Password is required
                  </div>
                  <div
                    v-if="
                      $v.form.password.$error && !$v.form.password.minLength
                    "
                    class="input-error"
                  >
                    Password must be at least 6 characters
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Confirm Password *</label>
                  <input
                    v-model="form.confirm_password"
                    type="password"
                    class="form-control"
                    placeholder="Confirm Password"
                  />
                  <div
                    v-if="
                      $v.form.confirm_password.$error &&
                      !$v.form.confirm_password.required
                    "
                    class="input-error"
                  >
                    Confirm password is required
                  </div>
                  <div
                    v-else-if="
                      $v.form.confirm_password.$error &&
                      !$v.form.confirm_password.sameAsPassword
                    "
                    class="input-error"
                  >
                    Passwords must match with confirm password
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-25">
              <div class="col-sm-12">
                <AppButton
                  :disabled="loading || $v.$invalid"
                  :loading="loading"
                  type="submit"
                >
                  Submit
                  <template #loading>Submiting</template>
                </AppButton>
              </div>
            </div>
          </form>
        </div>
        <div class="bottom-fix-link-center">
          <a href="javascript:void(0);">Term of use.</a>
          <a href="javascript:void(0);">Privacy policy</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import moment from 'moment-timezone'

export default {
  auth: false,
  async asyncData({ $guestAxios, query, $showErrorToast, redirect, error }) {
    const { token } = query

    // eslint-disable-next-line camelcase
    if (!token) return redirect('/')

    try {
      const {
        data: { message, data, status },
      } = await $guestAxios.post('reset-password-details', { token })

      if (!status) {
        $showErrorToast(message)
        return redirect('/login')
      }

      return {
        form: { ...data, password: '', confirm_password: '' },
        error: false,
        message,
      }
    } catch (e) {
      const { data, status } = e.response || {}
      if (data?.message?.includes('link is expired'))
        return { message: data.message, status, error: true }
      else error({ status: status || 500, message: data?.message || e.message })
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    loginPage() {
      this.$router.push('/')
    },
    handleSubmit(e) {
      if ((this.$v.$touch(), this.$v.$invalid) || this.loading) return

      this.form.timezone = moment.tz.guess()

      this.$guestAxios
        .post('generate-password', {
          email_token: this.form.email_token,
          token: this.form.token,
          password: this.form.password,
        })
        .then(({ data: { message } }) => {
          this.$toast.global.success(message)
          this.$router.replace('/login')
        })
        .catch(this.$showErrorToast)

      this.loading = false
    },
  },
  validations: {
    form: {
      password: { required, minLength: minLength(6) },
      confirm_password: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
}
</script>

<style scoped></style>