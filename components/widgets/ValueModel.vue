<script>
export default {
  props: { value: { type: Boolean, default: false } },
  data() {
    return {
      active: this.value,
    }
  },
  watch: {
    value(value) {
      this.active = value
    },
    active(active) {
      this.$emit('input', active)
    },
  },
}
</script>
