<template>
  <div class="body-content user-profile">
    <div class="tabs-view h-100">
      <ul class="nav" role="tablist">
        <li class="nav-item">
          <nuxt-link
            class="nav-link active"
            :to="{
              name: 'brand_name-profile',
              params: { brand_name: this.$getBrandName() },
            }"
            >User Profile</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :to="{
              name: 'brand_name-my-orders',
              params: { brand_name: this.$getBrandName() },
            }"
            >My Orders</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :to="{
              name: 'brand_name-address-book',
              params: { brand_name: this.$getBrandName() },
            }"
            >Address Book</nuxt-link
          >
        </li>
      </ul>
      <div class="tab-content customscrollbar">
        <div id="user-profile" class="tab-pane active">
          <div class="workspace-settings h-100">
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
                                      data-lpignore="true"
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
                        <!-- <div class="col-sm-12">
                          <div class="form-group">
                            <ul class="choose-workspce">
                              <li class="media">
                                <div class="media-left media-middle">&nbsp;</div>
                                <div class="media-right media-middle">
                                  <div class="default-workspace">
                                    <label class="control-label mb0"
                                      >Default Instance</label
                                    >
                                  </div>
                                </div>
                              </li>
                              <li
                                v-for="instance in userModel.accessibleInstances"
                                :key="instance.instance_id"
                                class="media"
                              >
                                <div class="media-left media-middle">
                                  <label class="radio-label">
                                    <input
                                      type="radio"
                                      name="profile-workspace"
                                      :checked="
                                        userModel.default_instance_id ==
                                        instance.instance_id
                                      "
                                      @click="
                                        userModel.default_instance_id =
                                          instance.instance_id
                                      "
                                    />
                                    <span class="radio-span"></span>
                                  </label>
                                </div>
                                <div class="media-right media-middle">
                                  <div class="default-workspace">
                                    <input
                                      type="text"
                                      name="workspace"
                                      :value="instance.brand_name"
                                      disabled="disabled"
                                      class="form-control"
                                    />
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div> -->
                        <div class="col-sm-12">
                          <div class="form-group email-notification-info">
                            <div class="media">
                              <div class="media-body">
                                <div class="d-flex align-items-center">
                                  Digital Asset Management Email Notification
                                  <i
                                    v-tooltip="
                                      'You will get an email notification once your DAM admin add/update any asset.'
                                    "
                                    class="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>
                              <div class="media-left">
                                <label class="label-switch no-text">
                                  <SpinLoading v-if="loadingUser" />
                                  <input
                                    v-else
                                    v-model="notification"
                                    type="checkbox"
                                    class="switch"
                                  />
                                  <span class="lable"></span>
                                </label>
                              </div>
                            </div>
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
                <div class="workspace-setting-right">
                  <div class="general-settings-box customscrollbar">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <h5>Change Password</h5>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group w-75 required">
                          <label class="control-label">Old Password</label>
                          <input
                            v-model.lazy="$v.changePasswordForm.old_pass.$model"
                            type="password"
                            name="password"
                            class="form-control"
                            data-lpignore="true"
                          />
                          <div
                            v-if="
                              $v.changePasswordForm.old_pass.$error &&
                              !$v.changePasswordForm.old_pass.required
                            "
                            class="input-error"
                          >
                            Old password is required
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group w-75 required">
                          <label class="control-label">New Password</label>
                          <input
                            v-model.lazy="$v.changePasswordForm.password.$model"
                            type="password"
                            name="password"
                            class="form-control"
                            data-lpignore="true"
                          />
                          <div
                            v-if="
                              $v.changePasswordForm.password.$error &&
                              !$v.changePasswordForm.password.required
                            "
                            class="input-error"
                          >
                            New password is required
                          </div>
                          <div
                            v-if="
                              $v.changePasswordForm.password.$error &&
                              !$v.changePasswordForm.password.minLength
                            "
                            class="input-error"
                          >
                            Password must be at least 6 characters
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group w-75 required">
                          <label class="control-label">Confirm Password</label>
                          <input
                            v-model.lazy="
                              $v.changePasswordForm.confirm_password.$model
                            "
                            type="password"
                            class="form-control"
                            data-lpignore="true"
                          />
                          <div
                            v-if="
                              $v.changePasswordForm.confirm_password.$error &&
                              !$v.changePasswordForm.confirm_password
                                .sameAsPassword
                            "
                            class="input-error"
                          >
                            Passwords must be identical.
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <!-- <button
                          class="btn"
                          :disabled="password_loading"
                          :class="{
                            'btn-disable': password_loading,
                          }"
                          type="submit"
                          @click="generateUserPassword"
                        >
                          <template v-if="password_loading">
                            <SpinLoading />
                            Saving...
                          </template>
                          <template v-else> Save </template>
                        </button> -->
                        <button
                          type="submit"
                          :class="{
                            btn: true,
                            'btn-disable': password_loading,
                          }"
                          :disabled="password_loading"
                          @click="changeUserPassword"
                        >
                          <i
                            v-if="password_loading"
                            class="fa fa-circle-o-notch fa-spin"
                          ></i>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  layout: 'app-min-no-search',
  middleware: ['check-auth', 'can-access'],
  data() {
    return {
      userModel: { ...this.$auth.user },
      logo: { file: null, src: null },
      removeLogo: false,
      saving: false,
      password_loading: false,
      changePasswordForm: {
        old_pass: null,
        password: null,
        confirm_password: null,
      },
      oldNotification: false,
      notification: false,
      loadingUser: true,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    isSame() {
      return (
        !this.logo.src &&
        this.user.name === this.userModel.name &&
        this.user.default_instance_id === this.userModel.default_instance_id &&
        this.oldNotification === this.notification
      )
    },
    canSave() {
      return (
        !!this.logo.src ||
        !!this.userModel.name ||
        !!this.userModel.default_instance_id ||
        this.oldNotification !== this.notification
      )
    },
  },
  mounted() {
    this.loadingUser = true
    this.$axios
      .$get('/user')
      .then(({ data }) => {
        this.oldNotification = !!data.user.enable_notification
        this.notification = !!data.user.enable_notification
      })
      .catch((_) => {
        this.oldNotification = false
        this.notification = false
      })
      .finally(() => (this.loadingUser = false))
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
      // formData.append('instance_id', this.user.instance_id)
      formData.append('instance_id', this.userModel.default_instance_id)

      if (this.logo.file) formData.append('profile_image', this.logo.file)
      formData.append('name', this.userModel.name)
      // formData.append("email", this.user.email);
      formData.append('phone', this.userModel.phone)
      formData.append('enable_notification', ~~this.notification)

      await this.$axios
        .$post('digital/instance/update-user', formData)
        .then(({ data, message }) => {
          this.$auth.fetchUser()
          // this.$auth.setUser({ ...this.user, ...data })
          this.$toast.success(message)
          this.oldNotification = !!this.notification
          // this.userModel = { ...this.user, ...data }
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
    async changeUserPassword(e) {
      this.$v.changePasswordForm.$touch()
      if (this.$v.changePasswordForm.$invalid) {
        return
      }
      try {
        this.password_loading = true
        const data = await this.$axios.$post('/auth-change-password', {
          old_password: this.changePasswordForm.old_pass,
          password: this.changePasswordForm.password,
          // confirm_password: this.changePasswordForm.confirm_password,
        })
        this.changePasswordForm.old_pass = ''
        this.changePasswordForm.password = ''
        this.changePasswordForm.confirm_password = ''
        this.password_loading = false
        this.$toast.success(data.message)
        this.$nextTick(() => {
          this.$v.$reset()
        })
      } catch (e) {
        const { data } = e.response
        this.password_loading = false
        this.$toast.error(data.message)
      }
    },
  },
  validations: {
    changePasswordForm: {
      old_pass: { required },
      password: { required, minLength: minLength(6) },
      confirm_password: { required, sameAsPassword: sameAs('password') },
    },
  },
  head() {
    return {
      title: this.$brandName() || 'Digital Asset Manager',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          hid: 'favicon',
          href: this.$auth.user.branding.brand_favicon || '/favicon.png',
        },
      ],
    }
  },
}
</script>
