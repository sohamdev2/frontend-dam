<template>
  <div id="general" class="center-box">
    <div class="center-part-view-subheading">
      <h4>User Profile</h4>
    </div>
    <form class="row" @submit.prevent="submitHandler">
      <div class="col-md-12">
        <div class="row">
          <div class="col-sm-8">
            <div class="form-group">
              <div class="img-upload imgwidth-input">
                <div class="img-upload-img">
                  <div v-if="logo.src || user.profile_image" class="v-center">
                    <img :src="logo.src || user.profile_image" class="bg-img" />
                  </div>
                  <span v-else>{{
                    (userModel.email || userModel.name || '')[0]
                  }}</span>
                  <div v-if="!saving" class="file-upload">
                    <div class="file-select" @click="$refs.file.click()">
                      <div class="file-select-name">Choose file</div>
                      <div class="file-field-box">
                        <input
                          ref="file"
                          type="file"
                          :disabled="saving"
                          name="logo"
                          :accept="$fileAcceptInputImage"
                          hidden
                          @input="logoChange"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="img-upload-alt">
                  <span class="hidden-xs">Profile Picture</span>
                  <small class="upload-note"
                    >Upload square logo for best viewing experience</small
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Full Name<em>*</em></label>
                  <input
                    v-model="userModel.name"
                    :disabled="saving"
                    type="text"
                    class="form-control"
                  />
                  <div v-if="!userModel.name" class="input-error">
                    Please enter a name
                  </div>
                </div>
              </div>
              <div class="col-sm-6"></div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Email<em>*</em></label>
                  <input
                    :value="user.email"
                    type="text"
                    disabled
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <button
                  class="btn"
                  :disabled="isSame || saving || !canSave"
                  :class="{ 'btn-disable': saving || isSame || !canSave }"
                  type="submit"
                >
                  <template v-if="saving">
                    <SpinLoading />
                    Saving...
                  </template>
                  <template v-else> Save </template>
                </button>
                <button v-if="!isSame" class="btn bg-light-gray" @click="clear">
                  Cancel
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
      userModel: { ...this.$auth.user },
      logo: { file: null, src: null },
      removeLogo: false,
      saving: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    isSame() {
      return !this.logo.src && this.user.name === this.userModel.name
    },
    canSave() {
      return !!this.logo.src || !!this.userModel.name
    },
  },
  methods: {
    clear() {
      this.$refs.file.value = null
      this.logo = { src: null, file: null }
      this.userModel = { ...this.user }
    },
    async submitHandler() {
      if (this.isSame || !this.canSave || this.saving) return

      this.saving = true

      const formData = new FormData()
      formData.append('id', this.user.id)
      formData.append('instance_id', this.user.instance.id)

      if (this.logo.file) formData.append('profile_image', this.logo.file)
      formData.append('name', this.userModel.name)
      // formData.append("email", this.user.email);
      formData.append('phone', this.userModel.phone)

      await this.$axios
        .$post('digital/instance/update-user', formData)
        .then(({ data, message }) => {
          this.$auth.setUser({ ...this.user, ...data })
          this.$toast.success(message)

          this.userModel = { ...this.user, ...data }
        })
        .catch(this.$showErrorToast)

      this.saving = false
    },
    logoChange({ target }) {
      const minSize = 2097152 * 2 // 4 mb
      const {
        files: [file],
      } = target

      if (!file) {
        // this.logo = { file: null, src: null }
        return
      }

      if (file.size > minSize) {
        this.$toast.global.error('File size should not be more than 4MB')
        return
      }

      const reader = new FileReader()
      reader.onload = ({ target: { result } }) => {
        this.logo = { file, src: result }
        this.removeLogo = false
        target.value = null
      }

      reader.readAsDataURL(file)
    },
  },
}
</script>
