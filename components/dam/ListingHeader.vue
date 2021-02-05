<template>
  <div class="arange-filters">
    <div class="preview-head"></div>
    <div
      class="name-head sorting"
      @click="
        sortingModel = 'display_file_name'
        emitSort([
          ['subFolders', 'folder_name', $sortToUpperCase],
          ['files', 'display_file_name', $sortToUpperCase],
        ])
      "
    >
      <span>Name</span>
      <SortIcon />
    </div>
    <div
      class="format-type sorting"
      @click="
        sortingModel = 'file_type'
        emitSort([
          ['subFolders', 'total_assets', $sortToUpperCase],
          ['files', 'file_type', $sortToUpperCase],
        ])
      "
    >
      <span>Assets</span>
      <SortIcon />
    </div>
    <div
      class="date sorting"
      @click="
        sortingModel = 'updated_at'
        emitSort([
          ['subFolders', 'date', $sortToTime],
          ['files', 'date', $sortToTime],
        ])
      "
    >
      <span>Date</span>
      <SortIcon />
    </div>
    <div
      class="size sorting"
      @click="
        sortingModel = 'file_size'
        emitSort([
          ['subFolders', '', $sortToUpperCase],
          ['files', 'file_size', $sortToTypedNumber],
        ])
      "
    >
      <span>Size</span>
      <SortIcon />
    </div>
    <div class="action-head">Action</div>
  </div>
</template>

<script>
export default {
  props: { sorting: { type: String, required: false, default: null } },
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
    emitSort(arg) {
      this.$nextTick(() => this.$emit('sort', arg))
    },
  },
}
</script>
