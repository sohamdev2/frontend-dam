<template>
  <div
    :class="{
      'section-title d-flex flex-column flex-lg-row align-items-center':
        hashParam != 'search' ? true : false,
    }"
  >
    <div class="sec-title-left d-flex align-items-center">
      <nuxt-link v-if="!hashParam" class="home-icon" :to="`/${$getBrandName()}`"
        ><img src="~/assets/img/address.svg" alt=""
      /></nuxt-link>
      <div v-if="!hashParam" class="breadcrumb-links">
        <ul>
          <li>&nbsp;</li>
          <li><span>All Folders</span></li>
        </ul>
      </div>
      <nuxt-link
        v-if="breadcrumbs"
        class="home-icon"
        :to="`/${$getBrandName()}`"
        ><img src="~/assets/img/address.svg" alt=""
      /></nuxt-link>
      <div v-if="breadcrumbs" class="breadcrumb-links">
        <ul>
          <li>&nbsp;</li>
          <li v-for="(crumb, i) in breadcrumbs" :key="i">
            <component :is="crumb.url ? 'nuxt-link' : 'span'" :to="crumb.url">
              {{ crumb.name }}
            </component>
          </li>
        </ul>
      </div>
      <client-only>
        <div v-if="showSelect" class="search-by ml-3">
          <Select2
            class="select2-hidden-accessible"
            :value="hashParam"
            :options="categoriesObject"
            :attrs="{ minimumResultsForSearch: -1 }"
            @input="goToCategory"
          />
        </div>
      </client-only>
    </div>
    <div
      v-if="hashParam == 'search' && $route.params.filterItems"
      class="filter-result"
    >
      <h2 v-if="assetsCount > 0">{{ assetsCount }} Assets found</h2>
      <div class="filter-tags">
        <transition-group tag="div" name="slide-right" class="tag-add-box">
          <span
            v-for="filterItem in $route.params.filterItems"
            :key="filterItem.key"
            class="added-tag"
          >
            <label :inner-html.prop="filterItem.name"></label>
            <span @click="$route.params.removeFilterItem(filterItem)"
              ><img src="~/assets/img/close.svg" alt="" />
            </span>
          </span>
        </transition-group>
        <a class="clear-filter" @click="removeAllFilterItem()">Clear Filters</a>
      </div>
    </div>

    <div
      v-if="assetsCount > 0"
      :class="{
        'section-title d-flex flex-column flex-lg-row align-items-center':
          hashParam == 'search' ? true : false,
        'sec-title-right d-flex align-items-center ml-lg-auto':
          hashParam != 'search' ? true : false,
      }"
    >
      <div
        :class="{
          'sec-title-right flex-row justify-content-between justify-content-lg-end align-items-center ml-lg-auto d-flex':
            hashParam == 'search' ? true : false,
        }"
      >
        <div class="table-filter">
          <ul>
            <li>
              <template v-if="subfolderCount > 0"
                >{{ subfolderCount }} Folder<template v-if="subfolderCount > 1"
                  >s</template
                ></template
              >
              <template v-if="fileCount > 0"
                >{{ fileCount }} Asset<template v-if="fileCount > 1"
                  >s</template
                ></template
              >
            </li>
            <li
              v-if="
                hashParam !== ''
                  ? hashParam === 'search'
                    ? false
                    : true
                  : false
              "
            >
              <div class="search-by small-wd">
                <Select2
                  :value="intialCount"
                  :options="assetCountOptions"
                  :attrs="{ minimumResultsForSearch: -1 }"
                  @input="emitSortAssetCount"
                />
              </div>
            </li>
            <li>
              <div class="search-by">
                <Select2
                  :value="sortingModel"
                  :options="sortingOptions"
                  :attrs="{ minimumResultsForSearch: -1 }"
                  @input="emitSortParamsArray"
                />
              </div>
            </li>
            <li>
              <template>
                <div
                  v-if="sortingModel != 'Sort by'"
                  class="px-2 ml-3 mt-2"
                  style="cursor: pointer"
                  @click="emitSortParamsArray()"
                >
                  <img
                    height="18"
                    width="18"
                    src="@/assets/img/down-arrow.svg"
                    :style="{
                      transform: `rotate(${sortingDesc ? 180 : 0}deg)`,
                    }"
                  />
                </div>
              </template>
            </li>
            <li>
              <div class="gried-view">
                <span
                  class="gridview"
                  :class="{ active: mode == 'row' }"
                  @click="$emit('update:mode', 'row')"
                  ><img src="~/assets/img/tile-view.svg" alt=""
                /></span>
                <span
                  class="listview"
                  :class="{ active: mode == 'column' }"
                  @click="$emit('update:mode', 'column')"
                  ><img src="~/assets/img/list-view.svg" alt=""
                /></span>
              </div>
            </li>
          </ul>
        </div>
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
    breadcrumb: { type: Object, default: null },
    fileCount: { type: Number, default: 0 },
    subfolderCount: { type: Number, default: 0 },
    assetCount: { type: String, default: '12' },
  },
  data() {
    return {
      sortingModel: this.sorting || 'Sort by',
      intialCount: this.assetCount || '12',
      sortingOptions: [
        { text: 'Name', id: 'display_file_name' },
        { text: 'Date', id: 'updated_at' },
        { text: 'Size', id: 'file_size' },
        { text: 'Type', id: 'file_type' },
      ],
      assetCountOptions: [
        { text: '12', id: '12' },
        { text: '20', id: '20' },
        { text: '40', id: '40' },
        { text: '80', id: '80' },
        { text: '100', id: '100' },
      ],
      categoriesObject: [
        { text: 'Folders', id: '' },
        { text: 'Audio', id: 'audio' },
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
    inCategory() {
      return categories.includes(this.hashParam)
    },
    breadcrumbs() {
      if (!this.hashParam || this.hashParam === 'search') return null

      const breadcrumbs = []

      switch (this.hashParam) {
        case 'uncategorized':
          breadcrumbs.push({
            name: 'Uncategorized Assets',
          })
          break
        default:
          if (this.inCategory)
            breadcrumbs.push({
              name: 'All ' + this.category.text?.toLowerCase(),
            })
          else {
            const recursivePush = (item, array) => {
              if (!item) return

              array.push({
                name: item.folder_name,
                url:
                  item.id.toString() !== this.hashParam.toString()
                    ? {
                        name: 'brand_name-folders',
                        params: { brand_name: this.$getBrandName() },
                        hash: `#${item.id}`,
                      }
                    : null,
              })

              recursivePush(item.parent, array)
            }

            recursivePush(this.breadcrumb, breadcrumbs)
          }
      }

      return breadcrumbs.reverse()
    },

    category() {
      return this.categoriesObject.find(({ id }) => this.hashParam === id)
    },
  },
  watch: {
    $route() {
      this.showDropdown = false
      this.$nextTick(() => (this.showDropdown = true))
    },
    sortingModel(sortingModel) {
      this.$emit('update:sorting', sortingModel)
    },
    sorting(sorting) {
      this.sortingModel = sorting || 'Sort by'
    },
    title(title) {
      this.$setPageTitle(title + ' | Digital Asset Manager')
    },
    intialCount(intialCount) {
      this.$emit('update:assetCount', intialCount)
    },
    assetCount(assetCount) {
      this.intialCount = assetCount || '12'
    },
  },
  methods: {
    emitSortAssetCount(data) {
      this.$emit('emitAssetCount', data)
    },
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
            ['subFolders', 'total_contain', this.$sortToTypedNumber],
            ['files', 'file_type', this.$sortToUpperCase],
          ]
          break
        case 'updated_at':
          toEmit = [
            ['subFolders', 'updated_at', this.$sortToTime],
            ['files', 'updated_at', this.$sortToTime],
          ]
          break
        case 'file_size':
          toEmit = [
            ['subFolders', 'total_contain', this.$sortToTypedNumber],
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
    removeAllFilterItem() {
      if (this.$route.params.searchParams) {
        this.$router.push({
          name: 'brand_name-folders',
          params: {
            brand_name: this.$getBrandName(),
            workspace_id: this.$getWorkspaceId(),
          },
        })
        this.moreOptions = false
      }
    },
  },
}
</script>
