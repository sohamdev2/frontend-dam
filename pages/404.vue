<template>
  <div class="col-lg-6 offset-lg-3">
    <div class="error-page">
      <div class="error-text text-center">
        <h1>Page not found</h1>
        <p>
          {{
            error.message ||
            "Sorry, We didn't find the page you are looking for..."
          }}
        </p>
        <nuxt-link v-if="$auth.loggedIn" to="/">Back to Home</nuxt-link>
      </div>
      <div class="error-img">
        <img src="@/assets/img/icon/404-bg.png" alt class="img-responsive" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app-min-no-search',
  props: { error: { type: Object, default: () => ({}) } },
  methods: {
    backToHome() {
      this.$router.push('/')
    },
  },
}
</script>
