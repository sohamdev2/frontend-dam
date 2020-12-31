<template>
  <div class="section-title d-flex flex-column flex-lg-row align-items-center">
    <div
      class="d-flex sec-title-left justify-content-between justify-content-lg-start"
    >
      <div class="custom-checkbox">
        <input
          v-if="!!assetsCount && hashParam"
          id="toolbar-dam-select"
          class="form-check-input"
          type="checkbox"
          :checked="selectedAll"
          @input="
            (ev) =>
              $emit(`click:${ev.target.checked ? 'select-all' : 'select-none'}`)
          "
        />
        <label
          for="toolbar-dam-select"
          :class="{ 'hide-select': !assetsCount || !hashParam }"
        >
          <span class="h2">
            {{ title }}
          </span>
        </label>
      </div>
      <div v-if="!isFolder && hashParam != 'search'" class="section-filter">
        <Select2
          class="select2-hidden-accessible"
          :value="hashParam"
          :options="categoriesObject"
          :attrs="{ minimumResultsForSearch: -1 }"
          @input="goToCategory"
        />
      </div>
    </div>
    <div
      v-if="assetsCount > 0"
      class="sec-title-right flex-row justify-content-between justify-content-lg-end align-items-center ml-lg-auto d-flex"
    >
      <div>
        <span class="file-counter">{{ assetsCount }} Assets</span>
      </div>
      <div class="file-sort">
        <Select2
          value="Sort by"
          :options="[
            'Sort by',
            { text: 'Name', id: 'name' },
            { text: 'Date', id: 'date' },
            { text: 'Type', id: 'file_type' },
            { text: 'Size', id: 'file_size' },
          ]"
          :attrs="{ minimumResultsForSearch: -1 }"
          @input="emitSortParamsArray"
        />
      </div>
      <div class="file-grid">
        <span
          class="tile"
          :class="{ active: mode == 'row' }"
          @click="$emit('update:mode', 'row')"
        >
          <img src="@/assets/img/icon/grid-icon.svg" alt="" />
        </span>
        <span
          class="list"
          :class="{ active: mode == 'column' }"
          @click="$emit('update:mode', 'column')"
        >
          <img src="@/assets/img/icon/list-icon.svg" alt="" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const categories = ['video', 'audio', 'image', 'application', 'archive']

export default {
  props: {
    folder: { type: Object, default: null },
    selectedAll: { type: Boolean, default: false },
    assetsCount: { type: Number, default: 0 },
    mode: { type: String, default: 'row' },
  },
  data() {
    return {
      categoriesObject: [
        { text: 'Folders', id: '' },
        { text: 'Audios', id: 'audio' },
        { text: 'Documents', id: 'application' },
        { text: 'Images', id: 'image' },
        { text: 'Videos', id: 'video' },
      ],
    }
  },
  computed: {
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    isFolder() {
      return (
        !!this.hashParam &&
        !categories.includes(this.hashParam) &&
        !isNaN(Number(this.hashParam))
      )
    },
    title() {
      if (!this.hashParam) return 'Folders'

      if (this.hashParam === 'search') return 'Search Result'

      if (this.isFolder)
        return this.folder?.folder_name || this.folder?.category_name || ''

      return (
        'All ' +
        this.categoriesObject
          .find(({ id }) => this.hashParam === id)
          .text.toLowerCase()
      )
    },
  },
  watch: {
    title(title) {
      this.$setPageTitle(title)
    },
  },
  methods: {
    goToCategory(value) {
      this.$router.replace({
        name: 'navigator',
        hash: `#${value}`,
      })
    },
    emitSortParamsArray(value) {
      let toEmit = null
      switch (value) {
        case 'name':
          toEmit = [
            ['subFolders', 'folder_name', this.$sortToUpperCase],
            ['files', 'display_file_name', this.$sortToUpperCase],
          ]
          break
        case 'date':
          toEmit = [
            ['subFolders', 'folder_name', this.$sortToUpperCase],
            ['files', 'file_type', this.$sortToUpperCase],
          ]
          break
        case 'file_type':
          toEmit = [
            ['subFolders', 'date', this.$sortToTime],
            ['files', 'date', this.$sortToTime],
          ]
          break
        case 'file_size':
          toEmit = [
            ['subFolders', 'total_assets', this.$sortToTypedNumber],
            ['files', 'file_size', this.$sortToTypedNumber],
          ]
          break
        default:
          toEmit = [
            ['subFolders', 'id', this.$sortToTypedNumber],
            ['files', 'id', this.$sortToTypedNumber],
          ]
          break
      }

      if (toEmit) this.$emit('sort', toEmit)
    },
  },
  head: {
    title: 'Navigator | Digital Asset Manager',
  },
}
</script>

<style>
.custom-checkbox label.hide-select {
  padding-left: 0 !important;
}
.custom-checkbox label.hide-select:before {
  opacity: 0 !important;
}
</style>
