<template>
  <ListingHeaderTemplate>
    <div class="preview-img pb-1 no-pointer flex8"></div>
    <div class="categary-name sorting flex34" :class="sortingClass('name')">
      <span
        @click="
          sortingModel = 'name'
          emitSort([['files', 'name', $sortToUpperCase]])
        "
      >
        Collection Name
      </span>
    </div>
    <div class="assets sorting flex18" :class="sortingClass('updated_at')">
      <span
        @click="
          sortingModel = 'updated_at'
          emitSort([['files', 'updated_at', $sortToTime]])
        "
      >
        Last Updated
      </span>
    </div>
    <div class="update-date sorting flex18">
      <span> Owner </span>
    </div>
    <div class="size sorting flex12">
      <span> Files </span>
    </div>
    <div class="categary-action sorting no-pointer flex10 text-center">
      Action
    </div>
  </ListingHeaderTemplate>
</template>

<script>
import ListingHeaderTemplate from '~/components/dam/ListingHeaderTemplate'

export default {
  components: { ListingHeaderTemplate },
  extends: ListingHeaderTemplate,
  props: {
    deleting: { type: Boolean, default: false },
    selectedAll: { type: Boolean, default: false },
  },
  methods: {
    emitSort(arg) {
      this.$nextTick(() => this.$emit('sort', arg))
    },
  },
}
</script>
