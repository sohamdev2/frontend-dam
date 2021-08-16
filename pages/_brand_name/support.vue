<template>
  <div class="body-content user-profile">
    <div class="general-settings h-100 w-100">
      <div class="general-settings-right w-100 h-100">
        <div class="general-settings-title">
          <h2 class="title">Support</h2>
        </div>
        <div class="workspace-settings">
          <div class="row no-gutters h-100">
            <div class="col-lg-8 col-md-12 h-100">
              <div class="workspace-setting-left">
                <div class="general-settings-box customscrollbar">
                  <form @submit.prevent="submitHandler">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group required w-75">
                          <label class="control-label">Full Name</label>
                          <span class="input-control">{{ form.name }}</span>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group required">
                          <label class="control-label">Email</label>
                          <span class="input-control">{{ form.email }}</span>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group required">
                          <label class="control-label">Feedback</label>

                          <textarea
                            v-model="form.feedback"
                            class="form-control"
                            cols="5"
                            rows="8"
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <button
                          class="btn"
                          :disabled="!canSave"
                          :class="{ 'btn-disable': !canSave }"
                          type="submit"
                        >
                          <template v-if="saving">
                            <SpinLoading />
                            Sending...
                          </template>
                          <template v-else> Send </template>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app-min-no-search',
  middleware: ['check-auth', 'check-url', 'can-access'],
  data() {
    return {
      form: {
        workspace_id: this.$getWorkspaceId(),
        name: this.$auth.user.name,
        email: this.$auth.user.email,
        feedback: '',
      },
      saving: false,
    }
  },
  computed: {
    canSave() {
      return this.form.feedback !== ''
    },
  },
  methods: {
    clear() {
      this.form = {
        workspace_id: this.$getWorkspaceId(),
        name: this.$auth.user.name,
        email: this.$auth.user.email,
        feedback: '',
      }
    },
    async submitHandler() {
      if (!this.canSave) return

      this.saving = true
      const formData = new FormData()
      Object.keys(this.form).forEach((e) => {
        if (typeof this.form[e] !== 'object' && e !== 'file') {
          formData.append(e, this.form[e])
        }
      })

      await this.$axios
        .$post('digital/feedback', formData)
        .then(({ message }) => {
          this.clear()
          this.$toast.success(message)
        })
        .catch(this.$showErrorToast)
      this.saving = false
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
