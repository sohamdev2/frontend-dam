<template>
  <div id="general" class="center-box">
    <div class="center-part-view-subheading">
      <h4>Support</h4>
    </div>
    <form class="row" @submit.prevent="submitHandler">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Full Name<em>*</em></label>
                  <input
                    v-model="form.name"
                    disabled
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-sm-6"></div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Email<em>*</em></label>
                  <input
                    :value="form.email"
                    type="text"
                    disabled
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-sm-6"></div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Feedback<em>*</em></label>
                  <textarea
                    v-model="form.feedback"
                    class="form-control"
                    rows="10"
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
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'app-min-no-search',
  middleware: ['check-auth', 'check-url'],
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
}
</script>
