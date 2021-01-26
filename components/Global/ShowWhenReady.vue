<template>
  <div>
    <FadeTransition>
      <div v-if="show">
        <slot></slot>
      </div>
      <div v-else class="preloader">
        <div class="loading">
          <img
            src="@/assets/img/marcom_hq_2_1.svg"
            alt="MarcomHQ"
            class="img-responsive"
          />
        </div>
      </div>
    </FadeTransition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'

export default {
  components: { FadeTransition },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    loaded() {
      return (
        this.$localStorageLoaded &&
        (this.$auth.isLoggedIn
          ? this.$store.state?.appData?.dashboardData
          : this.$store.state?.appData?.status)
      )
    },
  },
  watch: {
    loaded() {
      this.show = this.loaded
    },
  },
  mounted() {
    this.$nextTick(() => (this.show = this.loaded))
  },
  updated() {
    // this.$nextTick(() => (this.show = this.loaded))
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
