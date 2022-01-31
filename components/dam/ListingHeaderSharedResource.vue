<template>
  <ListingHeaderTemplate>
    <div
      class="selectbox sorting flex3"
      :class="{ semicheck: selectedCount != 0 && assetsCount != selectedCount }"
    >
      <label class="check-label">
        <input
          type="checkbox"
          :checked="selectedAll"
          @input="
            (ev) =>
              $emit(`click:${ev.target.checked ? 'select-all' : 'select-none'}`)
          "
        />
        <span class="check-span"></span>
      </label>
    </div>
    <div
      class="categary-name sorting sortarrow flex49"
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
        >Asset Name</span
      >
    </div>
    <!--    <div class="assets sorting flex18" :class="sortingClass('file_type')">
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
    <div class="size sorting flex12" :class="sortingClass('file_size')">
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
    </div>-->
    <div class="assets sorting flex15">
      <span>Asset Type</span>
    </div>
    <div class="update-date sorting flex15">
      <span>Date</span>
    </div>
    <div class="size sorting flex10">
      <span>Size</span>
    </div>
    <div class="categary-action sorting no-pointer flex8 text-right">
      <span>Action</span>
    </div>
  </ListingHeaderTemplate>
</template>

<script>
import ListingHeaderTemplate from '~/components/dam/ListingHeaderTemplate'
export default {
  components: { ListingHeaderTemplate },
  extends: ListingHeaderTemplate,
  props: {
    assetsCount: { type: [Number, String], default: 0 },
    selectedCount: { type: [Number, String], default: 0 },
    selectedAll: { type: Boolean, default: false },
  },
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
