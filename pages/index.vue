<template>
  <div class="body-content login">
    <div class="sign-screen customscrollbar h-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-heading-text text-center">
              <nuxt-link to="/">
                <img
                  src="~/assets/img/marcom_hq_2_1.svg"
                  alt=""
                  class="img-responsive img-center"
                />
              </nuxt-link>
            </div>
            <div class="sign-body bg-white">
              <p class="small">
                Please visit
                <a href="https://dev-marcom3.herokuapp.com/">MarComHQ</a> in
                order to create a Digital Asset Manger (DAM) instance or contact
                our team if you need any help to setup a DAM instance.
              </p>
              <p class="small">
                Already have an instance? Enter your brand url endpoint below.
              </p>
              <form class="form" @submit.prevent="submitHandler">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <!-- <label class="control-label">Email</label> -->

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
                        <template v-else-if="!$v.brandName.hasUrl">
                          There is no instance with url "{{ brandName }}"
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
            <a href="javascript:void(0);">Term of use.</a>
            <a href="javascript:void(0);">Privacy policy</a>
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
    submitHandler() {
      if ((this.$v.$touch(), this.$v.$invalid)) return

      this.$router.push({
        name: 'brand_name',
        params: {
          brand_name: this.brandName,
        },
      })
    },
  },
  validations: {
    brandName: {
      async hasUrl(value) {
        if (value === '') return true

        this.loading = true
        this.canGo = false

        return await this.$axios
          .post('verify-domain', {
            url: value,
          })
          .then(({ data: { code } }) => {
            this.canGo = true
            return code === 200
          })
          .catch(() => {})
          .finally(() => (this.loading = false))
      },
      required,
    },
  },
}
</script>
