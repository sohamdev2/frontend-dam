<template>
  <div class="body-content login">
    <div class="sign-screen customscrollbar h-100">
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
                :src="
                  logo ? logo : require('~/assets/img/lariat-marketing-hub.svg')
                "
                alt=""
                class="img-responsive img-center"
              />
            </div>
            <div class="sign-body bg-white">
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
                      Login to Lariat Marketing Hub
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
  middleware: ['redirect-if-logged-in', 'check-url'],
  mixins: [storeBrandName],
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null,
        type: 'sub_doamin',
      },
      logo: '',
    }
  },
  created() {
    this.logo = this.$store.state.appData.logo
  },
  methods: {
    async login(e) {
      if ((this.$v.$touch(), this.$v.$invalid)) return

      this.loading = true

      await this.$auth
        .loginWith('local', { data: { ...this.form, url: this.brandName } })
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
  // head() {
  //   return {
  //     title:
  //       this.$store.state.appData.brand === null
  //         ? 'Digital Asset Manager'
  //         : this.$store.state.appData.brand.brand_name,
  //     link: [
  //       {
  //         rel: 'icon',
  //         type: 'image/x-icon',
  //         href:
  //           this.$store.state.appData.brand === null
  //             ? '/favicon.png'
  //             : this.$store.state.appData.brand.favicon,
  //       },
  //     ],
  //   }
  // },
}
</script>
