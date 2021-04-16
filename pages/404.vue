<template>
  <div class="body-content page404 p0">
    <div class="sign-screen customscrollbar h-100 w-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-body">
              <div class="error-text">
                <h2>
                  {{
                    (error.statusCode || error.code || error.status) == 404
                      ? 'Page not found'
                      : error.status || 'Oops'
                  }}
                </h2>
                <h4>
                  {{
                    error.message ||
                    "Sorry, We didn't find the page you are looking for..."
                  }}
                </h4>
                <nuxt-link to="/">Back to Home</nuxt-link>
              </div>
              <div class="error-img">
                <img src="~/assets/img/404-bg.png" alt="" />
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
  props: { error: { type: Object, default: () => ({}) } },
  methods: {
    backToHome() {
      this.$router.push('/')
    },
  },
}
</script>
