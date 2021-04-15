<template>
  <div class="body-content user-profile">
    <div class="general-settings h-100 w-100">
      <div class="general-settings-right w-100 h-100">
        <div class="general-settings-title">
          <h2 class="title">User Profile</h2>
        </div>
        <div class="workspace-settings">
          <div class="row no-gutters h-100">
            <div class="col-lg-8 col-md-12 h-100">
              <div class="workspace-setting-left">
                <div class="general-settings-box customscrollbar">
                  <form @submit.prevent="submitHandler">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <div class="img-upload imgwidth-input">
                            <div class="img-upload-img">
                              <div
                                v-if="logo.src || user.profile_image"
                                class="v-center"
                              >
                                <img :src="logo.src || user.profile_image" />
                              </div>
                              <span v-else>{{
                                (userModel.email || userModel.name || '')[0]
                              }}</span>
                            </div>
                            <div v-if="!saving" class="img-upload-alt">
                              <span>Profile Picture</span>
                              <small class="upload-note"
                                >Upload square picture for best viewing
                                experience</small
                              >
                              <div
                                class="file-select"
                                @click="$refs.file.click()"
                              >
                                <div class="file-select-name">
                                  Update Profile Picture
                                </div>
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
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group required w-75">
                          <label class="control-label">Full Name</label>
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
                      <div class="col-sm-12">
                        <div class="form-group required">
                          <label class="control-label">Email</label>
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
                          :class="{
                            'btn-disable': saving || isSame || !canSave,
                          }"
                          type="submit"
                        >
                          <template v-if="saving">
                            <SpinLoading />
                            Saving...
                          </template>
                          <template v-else> Save </template>
                        </button>
                        <button
                          v-if="!isSame"
                          class="btn btn-gray"
                          @click="clear"
                        >
                          Cancel
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
      formData.append('instance_id', this.user.instance_id)

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
