<template>
  <header class="header-sec row no-gutters">
    <div class="main-logo col">
      <nuxt-link :to="`/${$getBrandName()}`">
        <img
          :src="
            (user && user.instance && user.instance.logo) ||
            require('@/assets/img/logo.svg')
          "
          alt="Logo"
          height="24"
        />
      </nuxt-link>
    </div>
    <div class="main-menu col-7">
      <ul>
        <li v-for="link in headerLinks" :key="link.name">
          <nuxt-link :to="link.to">{{ link.name }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="login-info col">
      <div class="btn-group">
        <a
          v-if="user"
          v-tooltip="user.name"
          class="login-name"
          :title="user.name"
        >
          {{ user.name || user.email }}
        </a>
        <a
          role="button"
          class="dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            v-if="!user.profile_image"
            :src="user.profile_image"
            :alt="user.name"
          />
          <div
            v-else
            style="
              position: relative;
              text-transform: uppercase;
              border-radius: 50%;
            "
            class="bg-light"
          >
            <img style="visibility: hidden" />
            <span
              style="
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateY(-50%) translateX(-50%);
              "
            >
              {{ (user.name || user.email || '').slice(0, 2) }}
            </span>
          </div>
        </a>
        <div class="dropdown-menu custom-dropdown">
          <!-- <a class="dropdown-item disabled">Profile</a>
          <a class="dropdown-item disabled">Share Urls</a> -->
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
      headerLinks: [
        {
          name: 'Images',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#image',
          },
        },
        {
          name: 'Documents',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#application',
          },
        },
        {
          name: 'Audios',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#audio',
          },
        },
        {
          name: 'Videos',
          to: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: '#video',
          },
        },
      ],
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.$(this.$el).find('[data-toggle="tooltip"]').tooltip()
      window.$(this.$el).find('.dropdown-toggle').dropdown()
    })
  },
}
</script>
