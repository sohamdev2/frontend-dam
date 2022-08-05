<template>
  <div class="body-content login">
    <style type="text/css">
      {{ customStyles() }}
    </style>
    <div class="sign-screen loginPage customscrollbar h-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <!-- <div class="sign-heading-text text-center">
                <img
                  :src="logo"
                  alt=""
                  class="img-responsive img-center logo-size"
                />
              </div> -->
            <div class="sign-heading-text text-center">
              <img
                v-if="logo"
                :src="logo"
                alt=""
                class="img-responsive img-center"
              />
              <h2 v-else>{{ $brandDetail().brand_name }}</h2>
            </div>
            <div class="sign-body">
              <p>Please login to your account</p>
              <form class="form" @submit.prevent="login">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <label class="control-label">Email</label>
                      <input
                        v-model="$v.form.email.$model"
                        type="email"
                        class="form-control"
                        placeholder
                        autofocus
                        data-lpignore="true"
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
                    <div class="form-group required">
                      <label class="control-label">Password</label>
                      <input
                        v-model="$v.form.password.$model"
                        type="password"
                        class="form-control"
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
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <AppButton
                      type="submit"
                      :disabled="loading || $v.$invalid"
                      :loading="loading"
                    >
                      <template #loading> Signing in... </template>
                      Login
                    </AppButton>
                  </div>
                  <div class="col-sm-12">
                    <div class="pull-right mt-25 text-right">
                      <nuxt-link
                        :to="`/${brandName}/forgot-password`"
                        class="forgotPass"
                      >
                        Forgot Password
                      </nuxt-link>
                    </div>
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
import { required, email } from 'vuelidate/lib/validators'
import storeBrandName from '~/mixins/storeBrandName'

export default {
  middleware: ['redirect-if-logged-in', 'check-url'],
  mixins: [storeBrandName],
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null,
      },
      logo: '',
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
    },
    async login(e) {
      if ((this.$v.$touch(), this.$v.$invalid)) return

      this.loading = true

      await this.$auth
        .loginWith('local', {
          data: {
            ...this.form,
            workspace_id: this.$brandDetail()?.workspace.url_slug,
          },
        })
        .then(() => {
          // set current workspace
          this.$auth.user.workspace_id &&
            this.$setCurrentWorkspace(this.$auth.user.workspace_id)
          this.$router.push(`/${this.brandName}`)
        })
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
  head() {
    return {
      title: this.$brandDetail()?.brand_name || 'Digital Asset Manager',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          hid: 'favicon',
          href: this.$brandDetail()?.branding.brand_favicon || '/favicon.png',
        },
      ],
    }
  },
}
</script>
