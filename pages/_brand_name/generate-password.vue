<template>
  <div v-if="error" class="body-content expireLink">
    <div class="sign-screen customscrollbar h-100 w-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-body">
              <nuxt-link to="/">
                <img
                  :src="require('~/assets/img/lariat-marketing-hub.svg')"
                  alt=""
                />
              </nuxt-link>
              <div class="error-text">
                <h2>{{ message }}</h2>
                <h4>This URL is not valid to reset Password.</h4>
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
          <div class="sign-screen-content">
            <div class="sign-heading-text text-center">
              <nuxt-link to="/">
                <img
                  v-if="form.logo"
                  :src="form.logo"
                  alt=""
                  class="img-responsive img-center"
                />
                <h2 v-else>{{ $getBrandName() }}</h2>
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
    loginPage() {
      this.$router.push('/')
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
