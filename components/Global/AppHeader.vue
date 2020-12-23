<template>
  <header class="header-sec row no-gutters">
    <div class="main-logo col">
      <nuxt-link to="/">
        <img src="@/assets/img/brand-logo.svg" alt="Logo" />
      </nuxt-link>
    </div>
    <div class="main-menu col-7">
      <ul>
        <li><a href="images.html">Images</a></li>
        <li><a href="documents.html">Documents</a></li>
        <li><a href="audios.html">Audios</a></li>
        <li><a href="videos.html">Videos</a></li>
      </ul>
    </div>
    <div class="login-info col">
      <div class="btn-group">
        <a
          class="login-name"
          data-toggle="tooltip"
          data-placement="top"
          :title="user.name"
        >
          {{ user.name }}
        </a>
        <a
          role="button"
          class="dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img src="@/assets/img/login-parson.jpg" alt="parson" />
        </a>
        <div class="dropdown-menu custom-dropdown">
          <a class="dropdown-item" href="javascript:void(0);">My account</a>
          <a class="dropdown-item" href="javascript:void(0);">Cart</a>
          <a class="dropdown-item" href="javascript:void(0);" @click="$logout">
            Sign out
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.user
    },
  },
  mounted() {
    window.$(this.$el).find('[data-toggle="tooltip"]').tooltip()
    window.$(this.$el).find('.dropdown-toggle').dropdown()
  },
}
</script>
