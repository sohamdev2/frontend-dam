<template>
  <div @click="closeMoreOptions">
    <div v-if="showModel">
      <slot></slot>
    </div>
    <div v-if="!showModel" class="preloader">
      <div class="loading">
        <img
          src="~/assets/img/lariat-loader.svg"
          alt="Lariat"
          class="img-responsive"
        />
      </div>
    </div>
    <div class="body-overlay"></div>
  </div>
</template>

<script>
export default {
  props: { show: { type: Boolean, default: true } },
  data() {
    return {
      showModel: false,
    }
  },
  computed: {
    loaded() {
      // return (
      //   this.show &&
      //   // this.$localStorageLoaded &&
      //   (this.$auth.isLoggedIn
      //     ? !!this.$store.state?.appData?.dashboardData
      //     : this.$store.state?.appData?.status)
      // )
      return true
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
  methods: {
    closeMoreOptions() {
      this.$bus.$emit('closeDropDown')
    },
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
