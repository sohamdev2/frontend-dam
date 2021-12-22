<template>
  <ListingHeaderTemplate>
    <div class="preview-img sorting sortarrow flex10"></div>
    <div
      class="categary-name sorting flex27"
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
    <div class="assets sorting flex18" :class="sortingClass('file_type')">
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
    <div class="update-date sorting flex18" :class="sortingClass('updated_at')">
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
      class="size sorting flex12"
      :class="hashParam ? sortingClass('file_size') : ''"
    >
      <span
        v-if="hashParam"
        @click="
          sortingModel = 'file_size'
          emitSort([
            ['subFolders', 'total_contain', $sortToTypedNumber],
            ['files', 'file_size', $sortToTypedNumber],
          ])
        "
        >Size</span
      >
      <span v-else> Size </span>
    </div>
    <div class="categary-action sorting text-right flex15">
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
  computed: {
    hashParam() {
      return this.$route.hash?.replace('#', '')
    },
  },
  methods: {
    emitSort(arg) {
      this.$nextTick(() => this.$emit('sort', arg))
    },
  },
}
</script>
