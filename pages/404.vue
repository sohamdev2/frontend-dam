<template>
  <div class="error-page">
    <div class="error-text text-center">
      <h1>
        {{
          (error.statusCode || error.code || error.status) == 404
            ? 'Page not found'
            : error.status || 'Oops'
        }}
      </h1>
      <p>
        {{
          error.message ||
          "Sorry, We didn't find the page you are looking for..."
        }}
      </p>
    </div>
    <div class="error-img mt-4">
      <img src="~/assets/img/404-bg.png" alt class="img-responsive" />
    </div>
    <div class="error-text text-center mt-3">
      <nuxt-link to="/">Back to Home</nuxt-link>
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
