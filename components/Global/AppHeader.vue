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
    <div class="login-info col">
      <div class="btn-group">
        <nuxt-link
          v-if="user"
          :to="{
            name: 'brand_name-profile',
            params: { brand_name: this.$getBrandName() },
          }"
          class="login-name"
        >
          <div v-if="user.is_backend_user === 1" class="login-name">
            {{ user.name || user.email }}
          </div>

          <div v-else class="login-name">
            {{ user.name || user.email }}
          </div>
        </nuxt-link>
        <a
          role="button"
          class="dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            v-if="user.profile_image"
            class="bg-light"
            :src="user.profile_image"
            :alt="user.name"
          />
          <span v-else>
            {{ (user.name || user.email || '').slice(0, 2) }}
          </span>
        </a>

        <div class="dropdown-menu custom-dropdown">
          <nuxt-link
            v-if="!user.is_backend_user"
            class="dropdown-item"
            :to="{
              name: 'brand_name-profile',
              params: { brand_name: this.$getBrandName() },
            }"
          >
            Profile
          </nuxt-link>
          <nuxt-link
            v-if="!user.is_backend_user"
            class="dropdown-item"
            :to="{
              name: 'brand_name-shared-urls',
              params: { brand_name: this.$getBrandName() },
            }"
          >
            Shared Urls
          </nuxt-link>
          <nuxt-link
            v-if="!user.is_backend_user"
            class="dropdown-item"
            :to="{
              name: 'brand_name-support',
              params: { brand_name: this.$getBrandName() },
            }"
          >
            Support
          </nuxt-link>
          <a class="dropdown-item" @click="$logout"> Sign out </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      logo: '',
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
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  created() {
    this.logo = this.$store.state.appData.logo
  },
  mounted() {
    console.log(this.$auth.user)
    this.$nextTick(() => {
      window.$(this.$el).find('.dropdown-toggle').dropdown()
    })
  },
}
</script>
