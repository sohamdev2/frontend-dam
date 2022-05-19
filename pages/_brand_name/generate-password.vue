<template>
  <div v-if="error" class="body-content expireLink">
    <div class="sign-screen customscrollbar h-100 w-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-body">
              <nuxt-link :to="`/${brandName}/login`">
                <img
                  :src="require('~/assets/img/lariat-marketing-hub.svg')"
                  alt=""
                />
              </nuxt-link>
              <div class="error-text">
                <h2>{{ message }}</h2>
                <h4>This URL is not valid to reset Password.</h4>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="mt-18">
                    <nuxt-link :to="`/${brandName}/login`" class="forgotPass">
                      Go to Login
                      <svg
                        id="Capa_1"
                        version="1.1"
                        class="back-long-arrow-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                        xml:space="preserve"
                      >
                        <g>
                          <path
                            class="fill-color"
                            d="M44.952,22.108c0-1.25-0.478-2.424-1.362-3.308L30.627,5.831c-0.977-0.977-2.561-0.977-3.536,0
		c-0.978,0.977-0.976,2.568,0,3.546l10.574,10.57H2.484C1.102,19.948,0,21.081,0,22.464c0,0.003,0,0.025,0,0.028
		c0,1.382,1.102,2.523,2.484,2.523h35.182L27.094,35.579c-0.978,0.978-0.978,2.564,0,3.541c0.977,0.979,2.561,0.978,3.538-0.001
		l12.958-12.97c0.885-0.882,1.362-2.059,1.362-3.309C44.952,22.717,44.952,22.231,44.952,22.108z"
                          />
                        </g>
                      </svg>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="body-content login">
    <style type="text/css">
      {{ customStyles() }}
    </style>
    <div class="sign-screen customscrollbar h-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-heading-text text-center">
              <nuxt-link :to="`/${brandName}/login`">
                <img
                  v-if="form.logo"
                  :src="form.logo"
                  alt=""
                  class="img-responsive img-center"
                />
                <h2 v-else>{{ $brandDetail().brand_name }}</h2>
              </nuxt-link>
            </div>
            <div class="sign-body bg-white">
              <h4>Generate Password</h4>
              <p>You’re generating password for {{ form.email }}</p>
              <form class="form" @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <label class="control-label">Name</label>
                      <input
                        v-model="$v.form.name.$model"
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        data-lpignore="true"
                      />
                      <div
                        v-if="$v.form.name.$error && !$v.form.name.required"
                        class="input-error"
                      >
                        Name is required
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
                      <template #loading>Submiting</template>
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import moment from 'moment-timezone'
import storeBrandName from '~/mixins/storeBrandName'

export default {
  mixins: [storeBrandName],
  middleware: ['check-url'],
  async asyncData({ $guestAxios, query, $showErrorToast, redirect, error }) {
    const { invitation_token } = query

    // eslint-disable-next-line camelcase
    if (!invitation_token) return redirect('/')

    try {
      const {
        data: { message, status, data },
      } = await $guestAxios.post('get-invitation-details', {
        invitation_token,
      })

      if (!status) {
        $showErrorToast(message)
        return redirect('/login')
      }

      return {
        form: { ...data, password: '', confirm_password: '' },
        message,
        error: false,
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
  created() {
    if (!this.error) {
      this.form.logo = this.$store.state.appData.logo
    }
  },
  methods: {
    customStyles() {
      const textColor = this.$brandDetail().themes_option.header_text_color
      const textHoverColor =
        this.$brandDetail().themes_option.header_text_hover_color
      const backgroundColor =
        this.$brandDetail().themes_option.header_background_color
      return `.login .sign-screen{
        background-color: ${backgroundColor};
      }
      .login .sign-heading-text h2,.bottom-fix-link-center a{
        color: ${textColor};
      }
      .bottom-fix-link-center a:hover{
      color: ${textHoverColor};
      }`
    },
    handleSubmit(e) {
      if ((this.$v.$touch(), this.$v.$invalid) || this.loading) return

      this.form.timezone = moment.tz.guess()

      this.$guestAxios
        .post('generate-password', {
          email_token: this.form.reset_token,
          token: this.form.invitation_token,
          password: this.form.password,
          name: this.form.name,
        })
        .then(
          ({
            message,
            data: {
              message: dataMessage,
              data: {
                user: { url },
              },
            },
          }) => {
            this.$toast.global.success(dataMessage || message)
            this.$router.replace(`/${url}/login`)
          }
        )
        .catch(this.$showErrorToast)

      this.loading = false
    },
  },
  validations: {
    form: {
      name: { required },
      password: { required, minLength: minLength(6) },
      confirm_password: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  head() {
    return {
      title: this.$brandDetail()?.brand_name || 'Digital Asset Manager',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: this.$brandDetail()?.favicon || '/favicon.png',
        },
      ],
    }
  },
}
</script>
