<template>
  <header class="header-sec row no-gutters">
    <div class="main-logo col">
      <nuxt-link :to="`/${$getBrandName()}`">
        <!-- <img
          :src="
            (user && user.instance && user.instance.logo) ||
            require('~/assets/img/logo.svg')
          "
          alt="Logo"
          height="24"
        /> -->
        <img
          :src="user.default_logo || require('~/assets/img/logo.svg')"
          alt="Logo"
          height="24"
        />
      </nuxt-link>
    </div>
    <div class="main-menu col-7">
      <ul>
        <li
          v-for="link in headerLinks"
          :key="link.name"
          :class="{ active: $route.hash == link.tagName ? true : false }"
        >
          <nuxt-link :to="link.to"
            ><span>{{ link.name }}</span
            ><img :src="link.imageUrl" alt="icon"
          /></nuxt-link>
        </li>
      </ul>
    </div>
    <div class="col d-flex align-items-center justify-content-end">
      <div class="dropdown user-dropdown">
        <a
          id="profileDropdown"
          class="dropdown-toggle"
          href="javascript:void(0);"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>{{ user.name || user.email }}</span>
          <img src="~/assets/img/arrow-down.svg" alt="" />
          <div
            v-if="user.profile_image"
            :title="user.name"
            class="profile-bg"
            :style="{
              backgroundImage: `url(${user.profile_image})`,
            }"
          ></div>
          <div v-else class="profile-char" :title="user.name">
            {{ (user.name || user.email || '').slice(0, 2) }}
          </div>
        </a>
        <div class="dropdown-menu">
          <ul class="workspace-menu customscrollbar">
            <li
              v-for="instance in accessibleIntances"
              :key="instance.instance_id"
            >
              <a
                class="dropdown-item"
                href="javascript:void(0);"
                @click="changeInstance(instance)"
                ><img
                  src="~/assets/img/workspace-icon.svg"
                  :alt="instance.brand_name" /><span>{{
                  instance.brand_name
                }}</span
                ><img
                  v-if="
                    parseInt(auth.instance_id) ===
                    parseInt(instance.instance_id)
                  "
                  src="~/assets/img/check-workspace.svg"
                  class="check-workspace"
                  :alt="instance.brand_name"
              /></a>
            </li>
          </ul>
          <ul class="user-menu">
            <li>
              <nuxt-link
                v-if="!user.is_backend_user"
                class="dropdown-item"
                to="/profile"
              >
                <img src="~/assets/img/user.svg" alt="" />User Profile
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                v-if="!user.is_backend_user"
                class="dropdown-item"
                :to="{
                  name: 'brand_name-shared-urls',
                  params: { brand_name: this.$getBrandName() },
                }"
              >
                <img src="~/assets/img/share.svg" alt="" />Shared URL
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                v-if="!user.is_backend_user"
                class="dropdown-item"
                :to="{
                  name: 'brand_name-support',
                  params: { brand_name: this.$getBrandName() },
                }"
              >
                <img src="~/assets/img/support.svg" alt="" />Support
              </nuxt-link>
            </li>
            <li>
              <a class="dropdown-item" @click="$logout">
                <img src="~/assets/img/logout.svg" alt="" />Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      headerLinks: [
        {
          name: 'Images',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#image',
          },
          imageUrl: require('~/assets/img/images.svg'),
          tagName: '#image',
        },
        {
          name: 'Documents',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#application',
          },
          imageUrl: require('~/assets/img/document.svg'),
          tagName: '#application',
        },
        {
          name: 'Audio',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#audio',
          },
          imageUrl: require('~/assets/img/audio.svg'),
          tagName: '#audio',
        },
        {
          name: 'Videos',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#video',
          },
          imageUrl: require('~/assets/img/video.svg'),
          tagName: '#video',
        },
      ],
      auth: this.$_auth(),
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    accessibleIntances() {
      return this.$auth.user.accessibleInstances
    },
  },
  watch: {
    '$route.params'() {
      this.auth = this.$_auth()
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.$(this.$el).find('.dropdown-toggle').dropdown()
    })
  },
  methods: {
    changeInstance(instance) {
      this.$setCurrentWorkspace(instance.workspace_id)
      this.auth = this.$_auth()
      // redirect then to the appropriate dashboard
      this.$router.push(`/${this.auth.url}`)
    },
  },
}
</script>
