<template>
  <div class="center-part-view-body">
    <div class="center-part-box m0">
      <div class="col-lg-6 col-lg-offset-3 p0">
        <div class="error-page">
          <div class="error-text text-center">
            <h1>401</h1>
            <p>Sorry, you are not authorised to perform this action.</p>
            <a @click="backToHome">Back to Home</a>
          </div>
          <div class="error-img">
            <img src="~/assets/img/404-bg.png" alt class="img-responsive" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  props: { error: { type: Object, default: () => ({}) } },
  methods: {
    backToHome() {
      this.$router.push('/')
    },
  },
}
</script>
