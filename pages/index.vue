<template>
  <div class="body-content login defaultPage">
    <div class="sign-screen customscrollbar h-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-heading-text text-center">
              <nuxt-link to="/">
                <img
                  class="logo"
                  src="~/assets/img/lariat-marketing-hub.svg"
                  alt="Lariat"
                />
              </nuxt-link>
            </div>
            <div class="sign-body">
              <p class="small">
                Please visit
                <a :href="`${$config.damBackendBaseUrl}`">Lariat</a> in order to
                create a Digital Asset Manger (DAM) instance or contact our team
                if you need any help to setup a DAM instance.
              </p>
              <p class="small">
                Already have an instance? Enter your brand url endpoint below.
              </p>
              <form class="form" @submit.prevent="submitHandler">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <input
                        v-model.trim="brandName"
                        class="form-control"
                        placeholder
                        autofocus
                        data-lpignore="true"
                      />
                      <div v-if="$v.brandName.$error" class="input-error">
                        <template v-if="!$v.brandName.required">
                          Please provide a url.
                        </template>
                      </div>
                      <div
                        v-else
                        class="input-error text-info"
                        style="color: #17a2b8 !important"
                      >
                        <template v-if="!brandName">eg.</template>
                        {{ $config.baseUrl }}/<strong v-if="brandName">{{
                          brandName
                        }}</strong
                        ><strong v-else>&lt;Brand_URL&gt;</strong>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 text-center">
                    <button
                      class="btn"
                      type="submit"
                      :disabled="$v.brandName.$error || loading || !canGo"
                    >
                      <SpinLoading v-if="loading" style="margin-left: 0" />
                      <template v-else-if="brandName">
                        Go to {{ brandName }}
                      </template>
                      <template v-else>Enter your brand url</template>
                    </button>
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
import { required } from 'vuelidate/lib/validators'

export default {
  middleware: ['redirect-if-logged-in'],
  data() {
    return {
      brandName: '',
      loading: false,
      canGo: true,
    }
  },
  methods: {
    async submitHandler() {
      if ((this.$v.$touch(), this.$v.$invalid)) return

      this.loading = true
      this.canGo = false

      await this.$axios
        .post('verify-domain', {
          url: this.brandName,
        })
        .then((response) => {
          this.$toast.global.success(response.data.message)
          this.$router.push({
            name: 'brand_name',
            params: {
              brand_name: this.brandName,
            },
          })
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
          this.canGo = true
          this.loading = false
        })
    },
  },
  validations: {
    brandName: {
      required,
    },
  },
}
</script>
