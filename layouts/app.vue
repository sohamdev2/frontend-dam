<template>
  <ShowWhenReady :show="show">
    <AppHeader />
    <nuxt></nuxt>
  </ShowWhenReady>
</template>

<script>
export default {
  data() {
    return {
      key: 0,
    }
  },
  computed: {
    show() {
      return !!this.$store.state?.appData?.status
    },
  },
  mounted() {},
}
</script>
