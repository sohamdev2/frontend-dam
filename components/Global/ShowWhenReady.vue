<template>
  <div>
    <FadeTransition>
      <div v-if="showModel">
        <slot></slot>
      </div>
      <div v-else class="preloader">
        <div class="loading">
          <img
            src="~/assets/img/marcomhq-logo1.svg"
            alt="MarcomHQ"
            class="img-responsive"
          />
        </div>
      </div>
      <div class="body-overlay"></div>
    </FadeTransition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'

export default {
  components: { FadeTransition },
  props: { show: { type: Boolean, default: true } },
  data() {
    return {
      showModel: false,
    }
  },
  computed: {
    loaded() {
      return (
        this.show &&
        this.$localStorageLoaded &&
        (this.$auth.isLoggedIn
          ? !!this.$store.state?.appData?.dashboardData
          : this.$store.state?.appData?.status)
      )
    },
  },
  watch: {
    loaded() {
      this.showModel = this.loaded
    },
  },
  mounted() {
    this.$nextTick(() => (this.showModel = this.loaded))
  },
  updated() {
    this.$nextTick(() => (this.showModel = this.loaded))
  },
}
</script>

<style>
.fadeIn,
.fadeOut {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
