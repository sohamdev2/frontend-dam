<template>
  <ListingHeaderTemplate>
    <div class="preview-img pb-1 no-pointer flex10"></div>
    <div
      class="categary-name sorting sortarrow flex27"
      :class="sortingClass('display_file_name')"
    >
      <span
        @click="
          sortingModel = 'display_file_name'
          emitSort([
            ['subFolders', 'folder_name', $sortToUpperCase],
            ['files', 'display_file_name', $sortToUpperCase],
          ])
        "
        >Name</span
      >
    </div>
    <div
      class="assets sorting sortarrow flex18"
      :class="sortingClass('file_type')"
    >
      <span
        @click="
          sortingModel = 'file_type'
          emitSort([
            ['subFolders', 'total_contain', $sortToTypedNumber],
            ['files', 'file_type', $sortToUpperCase],
          ])
        "
        >Assets</span
      >
    </div>
    <div
      class="update-date sorting sortarrow flex18"
      :class="sortingClass('updated_at')"
    >
      <span
        @click="
          sortingModel = 'updated_at'
          emitSort([
            ['subFolders', 'updated_at', $sortToTime],
            ['files', 'updated_at', $sortToTime],
          ])
        "
        >Date</span
      >
    </div>
    <div
      class="size sorting sortarrow flex12"
      :class="sortingClass('file_size')"
    >
      <span
        @click="
          sortingModel = 'file_size'
          emitSort([
            ['subFolders', 'total_contain', $sortToTypedNumber],
            ['files', 'file_size', $sortToTypedNumber],
          ])
        "
        >Size</span
      >
    </div>
    <div class="categary-action sorting no-pointer flex15 text-right">
      <span>Action</span>
    </div>
  </ListingHeaderTemplate>
</template>

<script>
import ListingHeaderTemplate from '~/components/dam/ListingHeaderTemplate'
export default {
  components: { ListingHeaderTemplate },
  extends: ListingHeaderTemplate,
  // props: { sorting: { type: String, required: false, default: null } },
  // data() {
  //   return {
  //     sortingModel: this.sorting,
  //   }
  // },
  // watch: {
  //   sorting(sorting) {
  //     this.sortingModel = sorting
  //   },

  //   sortingModel(sortingModel) {
  //     this.$emit('update:sorting', sortingModel)
  //   },
  // },
  methods: {
    emitSort(arg) {
      this.$nextTick(() => this.$emit('sort', arg))
    },
  },
}
</script>
