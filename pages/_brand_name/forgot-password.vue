<template>
  <div class="body-content login">
    <style type="text/css">
      {{ customStyles() }}
    </style>
    <div class="sign-screen customscrollbar h-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-heading-text text-center">
              <nuxt-link to="/">
                <img
                  v-if="logo"
                  :src="logo"
                  alt=""
                  class="img-responsive img-center"
                />
                <h2 v-else>{{ $brandDetail().brand_name }}</h2>
              </nuxt-link>
            </div>
            <div class="sign-body">
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
                  <div class="col-sm-12">
                    <div class="pull-right mt-18 text-right">
                      <nuxt-link :to="`/${brandName}/login`" class="forgotPass">
                        <svg
                          id="Capa_1"
                          class="back-long-arrow-icon"
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
                            />
                          </g>
                        </svg>
                        Back to Login
                      </nuxt-link>
                    </div>
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
    customStyles() {
      return `:root {
  --primary: ${this.$brandDetail().branding.primary_color} !important;
  --secondary: ${this.$brandDetail().branding.secondary_color} !important;
  --header-default: ${this.hex2rgba(
    this.$brandDetail().branding.secondary_color
      ? this.$brandDetail().branding.secondary_color
      : '#ffffff',
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
      throw new Error('Bad Hex')
    },
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
  head() {
    return {
      title: this.$brandDetail()?.brand_name || 'Digital Asset Manager',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: this.$brandDetail()?.branding.brand_favicon || '/favicon.png',
        },
      ],
    }
  },
  validations: {
    form: {
      email: { required, email },
    },
  },
}
</script>
