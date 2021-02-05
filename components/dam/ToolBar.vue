<template>
  <div
    class="section-title d-flex flex-column flex-lg-row align-items-center toolbar"
  >
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
      <client-only>
        <div v-if="showSelect" class="section-filter">
          <Select2
            class="select2-hidden-accessible"
            :value="hashParam"
            :options="categoriesObject"
            :attrs="{ minimumResultsForSearch: -1 }"
            @input="goToCategory"
          />
        </div>
      </client-only>
      <div
        v-if="hashParam == 'search' && $route.params.filterItems"
        class="mt-2 ml-3"
      >
        <transition-group
          tag="div"
          name="slide-right"
          class="popular-tags selected-tags"
        >
          <div
            v-for="filterItem in $route.params.filterItems.slice(0, 2)"
            :key="filterItem.key"
            style="cursor: default"
            class="select-field"
          >
            <label v-html="filterItem.name"></label>
          </div>
          <div
            v-if="$route.params.filterItems.length > 2"
            key="more"
            class="select-field"
            style="display: inline-flex; align-items: center"
          >
            <div class="mr-2">and</div>
            <label
              style="cursor: pointer; white-space: nowrap"
              @click="openSearch"
            >
              {{ $route.params.filterItems.length - 2 }} more
            </label>
          </div>
        </transition-group>
      </div>
    </div>
    <div
      v-if="assetsCount > 0"
      class="sec-title-right flex-row justify-content-between justify-content-lg-end align-items-center ml-lg-auto d-flex"
    >
      <div>
        <span class="file-counter">{{ assetsCount }} Assets</span>
      </div>
      <template>
        <div class="file-sort">
          <Select2
            :value="sortingModel"
            :options="sortingOptions"
            :attrs="{ minimumResultsForSearch: -1 }"
            @input="emitSortParamsArray"
          />
        </div>
        <div
          v-if="sortingModel != 'Sort by'"
          class="px-2 ml-3 mt-2"
          style="cursor: poister"
          @click="emitSortParamsArray()"
        >
          <img
            height="18"
            width="18"
            src="@/assets/img/down-arrow.svg"
            :style="{ transform: `rotate(${sortingDesc ? 180 : 0}deg)` }"
          />
        </div>
      </template>

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
    sorting: { type: String, default: 'Sort by' },
    sortingDesc: { type: Boolean, default: false },
  },
  data() {
    return {
      sortingModel: this.sorting || 'Sort by',
      sortingOptions: [
        'Sort by',
        { text: 'Name', id: 'display_file_name' },
        { text: 'Recent', id: 'updated_at' },
        { text: 'Size', id: 'file_size' },
        { text: 'Type', id: 'file_type' },
      ],
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
    showSelect() {
      return (
        !this.isFolder &&
        this.hashParam !== 'search' &&
        this.hashParam !== 'popular'
      )
    },
    title() {
      return this.getTitle()
    },
  },
  watch: {
    sortingModel(sortingModel) {
      this.$emit('update:sorting', sortingModel)
    },
    sorting(sorting) {
      this.sortingModel = sorting || 'Sort by'
    },
    title(title) {
      this.$setPageTitle(title + ' | Digital Asset Manager')
    },
  },
  methods: {
    openSearch() {
      this.$router.replace({
        params: this.$route.params,
        query: { ...this.$route.query, moreOptions: true },
        hash: this.$route.hash,
      })
    },
    getTitle() {
      if (!this.hashParam) return 'Folders'

      switch (this.hashParam) {
        case 'search':
          return 'Showing result of'
        case 'popular':
          return 'Popular Tag: ' + this.$route.query.tag
      }

      if (this.isFolder)
        return this.folder?.folder_name || this.folder?.category_name || ''

      return (
        'All ' +
        this.categoriesObject
          .find(({ id }) => this.hashParam === id)
          ?.text?.toLowerCase()
      )
    },
    goToCategory(value) {
      this.$router.replace({
        name: 'brand_name-folders',
        params: { brand_name: this.$getBrandName() },
        hash: `#${value}`,
      })
    },
    emitSortParamsArray(value = this.sortingModel) {
      let toEmit = null

      switch (value) {
        case 'display_file_name':
          toEmit = [
            ['subFolders', 'folder_name', this.$sortToUpperCase],
            ['files', 'display_file_name', this.$sortToUpperCase],
          ]
          break
        case 'file_type':
          toEmit = [
            ['subFolders', 'total_assets', this.$sortToUpperCase],
            ['files', 'file_type', this.$sortToUpperCase],
          ]
          break
        case 'updated_at':
          toEmit = [
            ['subFolders', 'date', this.$sortToTime],
            ['files', 'date', this.$sortToTime],
          ]
          break
        case 'file_size':
          toEmit = [
            ['subFolders', 'file_size', this.$sortToTypedNumber],
            ['files', 'file_size', this.$sortToTypedNumber],
          ]
          break
        default:
          // toEmit = [
          //   ['subFolders', 'id', this.$sortToTypedNumber],
          //   ['files', 'id', this.$sortToTypedNumber],
          // ]
          break
      }

      this.sortingModel = value

      this.$nextTick(() => {
        if (toEmit) this.$emit('sort', toEmit)
      })
    },
  },
}
</script>

<style>
.toolbar .popular-tags .select-field label {
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.082) !important;
  padding-right: 8px;
}

.custom-checkbox label.hide-select {
  padding-left: 0 !important;
  cursor: default;
}
.select2-search.select2-search--dropdown {
  display: none;
}
.custom-checkbox label.hide-select:before {
  opacity: 0 !important;
}
</style>
