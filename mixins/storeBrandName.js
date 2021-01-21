export default {
  data() {
    return {
      brandName: '',
    }
  },
  mounted() {
    const store = () => {
      this.brandName =
        this.$store.state?.brandName ||
        this.$store.state?.localStorage?.brandName ||
        this.$route.query.brandName

      this.$store.commit('localStorage/brandName', this.brandName)
      this.$store.commit('brandName', this.brandName)
    }

    store()
    this.$nextTick(store)
  },
}
