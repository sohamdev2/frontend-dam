<template>
  <div v-if="error" class="body-content expireLink">
    <div class="sign-screen customscrollbar h-100 w-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-body">
              <img
                :src="require('~/assets/img/lariat-marketing-hub.svg')"
                alt=""
              />
              <div class="error-text">
                <h2>{{ message }}</h2>
                <h4 class="text-center">
                  This URL is not valid to reset Password.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="body-content login">
    <div class="sign-screen customscrollbar h-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <style type="text/css">
            {{ customStyles() }}
          </style>
          <div class="sign-screen-content">
            <div class="sign-heading-text text-center">
              <nuxt-link :to="`/${form.brand_name}/login`">
                <img
                  v-if="form.logo"
                  :src="
                    form.logo
                      ? form.logo
                      : require('~/assets/img/lariat-marketing-hub.svg')
                  "
                  alt=""
                  class="img-responsive img-center"
                />
                <h2 v-else>{{ form.brand_name }}</h2>
              </nuxt-link>
            </div>
            <div class="sign-body bg-white">
              <h4>Reset Password</h4>
              <p>You’re resetting password for {{ form.email }}</p>
              <form class="form" @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <label class="control-label">Password</label>
                      <input
                        v-model="$v.form.password.$model"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        autofocus
                        data-lpignore="true"
                      />
                      <div
                        v-if="
                          $v.form.password.$error && !$v.form.password.required
                        "
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
                    <div class="form-group required">
                      <label class="control-label">Confirm Password</label>
                      <input
                        v-model="$v.form.confirm_password.$model"
                        type="password"
                        class="form-control"
                        placeholder="Confirm Password"
                        data-lpignore="true"
                      />
                      <div
                        v-if="
                          $v.form.confirm_password.$error &&
                          !$v.form.confirm_password.required
                        "
                        class="input-error"
                      >
                        Confirm Password is required
                      </div>
                      <div
                        v-else-if="
                          $v.form.confirm_password.$error &&
                          !$v.form.confirm_password.sameAsPassword
                        "
                        class="input-error"
                      >
                        Password and Confirm Password did not match.
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <AppButton
                      :disabled="loading || $v.$invalid"
                      :loading="loading"
                      type="submit"
                    >
                      Submit
                      <template #loading>Submitting</template>
                    </AppButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="bottom-fix-link-center">
            <a
              href="https://www.marketinghub.com/terms-conditions/"
              target="_blank"
              >Term of use.</a
            >
            <a
              href="https://www.marketinghub.com/privacy-policy/"
              target="_blank"
              >Privacy policy</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import moment from 'moment-timezone'

export default {
  middleware: ['redirect-if-logged-in'],
  asyncData({ $guestAxios, query, redirect, error }) {
    const { token } = query

    if (!token) return redirect('/404')

    return $guestAxios
      .post('reset-password-details', { token })
      .then(({ data: { message, data, status } }) => {
        if (!status) return error({ status: status || 500, message })
        return {
          form: { ...data, password: '', confirm_password: '' },
          error: false,
          message,
        }
      })
      .catch(({ response, message }) => {
        /* const { data, status } = response || {}

        error({ status: status || 500, message: data?.message || message }) */

        const { data, status } = response || {}
        if (data?.message?.includes('This link is expired'))
          return { message: data.message, status, error: true }
        else error({ status: status || 500, message: data?.message || message })
      })
  },
  data() {
    return {
      loading: false,
    }
  },

  methods: {
    customStyles() {
      return `:root {
  --primary: ${this.form.primaryColor} !important;
  --secondary: ${this.form.secondaryColor} !important;
  --header-default: ${this.hex2rgba(
    this.form.secondaryColor ? this.form.secondaryColor : '#ffffff',
    0.6
  )};
}`
    },
    hex2rgba(hex, code) {
      let c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return (
          'rgba(' +
          [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
          ',' +
          code +
          ')'
        )
      }
    },
    handleSubmit(e) {
      if ((this.$v.$touch(), this.$v.$invalid) || this.loading) return

      this.form.timezone = moment.tz.guess()

      this.$guestAxios
        .post('reset-password', {
          reset_token: this.form.email_token,
          token: this.form.token,
          password: this.form.password,
          timezone: this.form.timezone,
        })
        .then(
          ({
            data: {
              message,
              data: {
                user: { url },
              },
            },
          }) => {
            this.$toast.global.success(message)
            this.$router.replace(`/${url}/login`)
          }
        )
        .catch(this.$showErrorToast)

      this.loading = false
    },
  },
  head() {
    return {
      title: this.form?.brand_name || 'Digital Asset Manager',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: this.form?.favicon || '/favicon.png',
        },
      ],
    }
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
