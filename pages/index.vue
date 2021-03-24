<template>
  <div style="min-height: 100vh; display: flex">
    <div style="margin: auto; padding: 1rem; max-width: 640px">
      <div style="text-align: center">
        <div class="mb-25">
          <nuxt-link to="/">
            <img
              class="logo"
              src="~/assets/img/marcom_hq_2_1.svg"
              alt="MarComHQ"
            />
          </nuxt-link>
        </div>
        <p>
          Please visit
          <a href="https://dev-marcom3.herokuapp.com/">MarComHQ</a> in order to
          create a Digital Asset Manger (DAM) instance or contact our team if
          you need any help to setup a DAM instance.
        </p>
        <p>Already have an instance? Enter your brand url endpoint below.</p>
      </div>
      <form
        style="max-width: 380px; margin: auto"
        @submit.prevent="submitHandler"
      >
        <div class="form-group">
          <input
            v-model.trim="brandName"
            class="form-control mt-3"
            placeholder
            autofocus
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
            <template v-if="!brandName">eg.</template> {{ $config.baseUrl }}/<b
              v-if="brandName"
              >{{ brandName }}</b
            ><b v-else>&lt;Brand_URL&gt;</b>
          </div>
        </div>
        <div style="text-align: center">
          <button
            class="btn"
            type="submit"
            :disabled="$v.brandName.$error || loading || !canGo"
          >
            <SpinLoading v-if="loading" style="margin-left: 0" />
            <template v-else-if="brandName"> Go to {{ brandName }} </template>
            <template v-else>Enter your brand url</template>
          </button>
        </div>
      </form>
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
