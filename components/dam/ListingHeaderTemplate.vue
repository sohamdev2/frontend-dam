<template>
  <ul class="thead">
    <li>
      <slot />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    sorting: { type: String, required: false, default: null },
    reverse: { type: Boolean, default: false },
  },
  data() {
    return {
      sortingModel: this.sorting,
    }
  },
  watch: {
    sorting(sorting) {
      this.sortingModel = sorting
    },
    sortingModel(sortingModel) {
      this.$emit('update:sorting', sortingModel)
    },
  },
  methods: {
    sortingClass(sorting) {
      return {
        sortarrow: this.sorting === sorting,
        descending: this.sorting === sorting && this.reverse,
        active: this.sorting === sorting && this.reverse,
      }
    },
  },
}
</script>
