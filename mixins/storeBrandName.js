export default {
  computed: {
    brandName() {
      return this.$route.query.brand_name || this.$route.params.brand_name
    },
  },
}
