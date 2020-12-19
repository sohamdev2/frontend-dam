<template>
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
                @click="loginPage"
              />
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
                      v-model.lazy="$v.form.password.$model"
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
                  <button
                    type="submit"
                    :class="{
                      'btn btn-block cs-btn': true,
                      'btn-disable': loading,
                    }"
                  >
                    Sign In to MarComHQ
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                  </button>
                </div>
                <div class="col-sm-12">
                  <div class="pull-right mt-25 text-right">
                    <nuxt-link to="forgot-password" class="color-gray"
                      >Forgot Password</nuxt-link
                    >
                  </div>
                </div>
              </div>

              <div class="signin-more">
                <p>or</p>
              </div>
              <div class="signin-with signin-with-title mb0">
                <div class="google-btn-wrapper">
                  <a class="btn btn-block" @click="googleSignIn">
                    <img
                      src="~/assets/img/google-icon.png"
                      alt
                      class="hidden-xs"
                    />
                    <img
                      src="~/assets/img/google-icon-mobile.jpg"
                      alt
                      class="visible-xs"
                    />
                    Sign in with Google
                  </a>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="signin-with-btn">
                      <h3 class="text-center">Don’t have an account?</h3>
                    </div>
                    <a
                      href="javascript:void(0)"
                      class="btn btn-block"
                      @click="goToSignup"
                    >
                      Sign Up
                    </a>
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
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null,
      },
    }
  },
  methods: {
    async login(e) {
      if (this.checkIfAlreadyLogin()) {
        this.processIfAlreadyLoggedIn()
        return
      }

      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })

        // set auth token globally
        this.$axios.setToken(this.$auth.getToken('local'))

        // set force-logout to false if it is true, when user logged in again
        this.$store.commit('setForceLogin', false)

        const currentWorkspace = {
          id: this.$auth.user.workspace_id,
          workspace_unique_id: this.$auth.user.workspace_unique_id,
          name: this.$auth.user.workspace_name,
          role: this.$auth.user.role,
          type: this.$auth.user.workspace_type,
        }

        // set current workspace globally
        this.$auth.$storage.setUniversal('currentWorkspace', currentWorkspace)

        if (this.$auth.$storage.getUniversal('trackReferringUrl') === true) {
          return this.$router.replace({
            name: this.$auth.$storage.getUniversal('referringUrlName'),
            params: this.$auth.$storage.getUniversal('referringUrlParams'),
            query: this.$auth.$storage.getUniversal('referringUrlQuery'),
          })
        }

        if (this.$auth.user.workspace_id === 0) {
          return this.$router.replace('create-workspace')
        }
        if (this.$auth.user.workspace_id > 0) {
          return this.$router.replace({
            name: 'workspace_id-dashboard',
            params: { workspace_id: this.$auth.user.workspace_id },
          })
        }
      } catch (e) {
        this.loading = false
        this.$toast.global.error(this.$getErrorMessage(e))
        // this.$toast.global.success(data.message);
        // this.$toast.global.info(data.message);
        // this.$toast.global.woops();
      }
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
