<template>
  <div
    :class="{
      'section-title d-flex flex-column flex-lg-row align-items-center':
        hashParam != 'search' ? true : false,
    }"
  >
    <div class="sec-title-left d-flex align-items-center">
      <nuxt-link v-if="!hashParam" class="home-icon" :to="`/${$getBrandName()}`"
        ><svg
          id="Layer_1"
          class="home-icon orange"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 16.2 18"
          xml:space="preserve"
        >
          <g id="Group_4409" transform="translate(-871.194 -659.595)">
            <g id="Path_3470">
              <path
                id="Path_3514"
                class="fill-color"
                d="M879.3,661.5l6.6,5.1v9.2c0,0.2-0.1,0.3-0.3,0.3H873c-0.2,0-0.3-0.1-0.3-0.3v-9.2L879.3,661.5M879.3,659.6l-8.1,6.3v9.9c0,1,0.8,1.8,1.8,1.8h12.6c1,0,1.8-0.8,1.8-1.8v-9.9L879.3,659.6z"
              ></path>
            </g>
            <g id="Path_3471">
              <path
                id="Path_3515"
                class="fill-color"
                d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
              ></path>
            </g>
          </g></svg
      ></nuxt-link>
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
        ><svg
          id="Layer_1"
          class="home-icon orange"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 16.2 18"
          xml:space="preserve"
        >
          <g id="Group_4409" transform="translate(-871.194 -659.595)">
            <g id="Path_3470">
              <path
                id="Path_3514"
                class="fill-color"
                d="M879.3,661.5l6.6,5.1v9.2c0,0.2-0.1,0.3-0.3,0.3H873c-0.2,0-0.3-0.1-0.3-0.3v-9.2L879.3,661.5M879.3,659.6l-8.1,6.3v9.9c0,1,0.8,1.8,1.8,1.8h12.6c1,0,1.8-0.8,1.8-1.8v-9.9L879.3,659.6z"
              ></path>
            </g>
            <g id="Path_3471">
              <path
                id="Path_3515"
                class="fill-color"
                d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
              ></path>
            </g>
          </g></svg
      ></nuxt-link>
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

    <template v-if="searchbar">
      <div
        v-if="hashParam == 'search' && searchbar.getFilterItems()"
        class="filter-result"
      >
        <h2 v-if="assetsCount > 0">{{ assetsCount }} Assets found</h2>
        <div class="filter-tags">
          <transition-group tag="div" name="slide-right" class="tag-add-box">
            <span
              v-for="filterItem in searchbar.getFilterItems()"
              :key="filterItem.key"
              class="added-tag"
            >
              <label :inner-html.prop="filterItem.name"></label>
              <span @click="searchbar.removeFilterItem(filterItem)"
                ><svg
                  id="Layer_1"
                  class="close-icon h-red"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
                    <path
                      id="Path_3424"
                      class="fill-color"
                      d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                    ></path>
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    ></path>
                  </g>
                </svg>
              </span>
            </span>
          </transition-group>
          <a class="clear-filter" @click="removeAllFilterItem()"
            >Clear Filters</a
          >
        </div>
      </div>
    </template>

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
                hashParam
                  ? hashParam === 'search' || isInteger || ''
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
                  style="cursor: pointer; margin-bottom: 8px"
                  @click="emitSortParamsArray()"
                >
                  <!--                  <img
                    height="18"
                    width="18"
                    src="@/assets/img/down-arrow.svg"
                    :style="{
                      transform: `rotate(${sortingDesc ? 180 : 0}deg)`,
                    }"
                  />-->
                  <svg
                    id="Layer_1"
                    :style="{
                      transform: `rotate(${sortingDesc ? 180 : 0}deg)`,
                    }"
                    class="big-down-arrow-icon"
                    style="max-height: 16px"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 492 492"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path
                          class="fill-color"
                          d="M442.7,268.5l-16.1-16.1c-5.1-5.1-11.8-7.9-19-7.9c-7.2,0-14.6,2.8-19.6,7.9L283.7,356V26.9C283.7,12.1,272.9,0,258,0h-22.8c-14.8,0-28.4,12.1-28.4,26.9v330.2l-104-104.7c-5.1-5.1-11.4-7.9-18.7-7.9c-7.2,0-13.8,2.8-18.8,7.9l-16,16.1c-10.5,10.5-10.4,27.6,0,38.1l177.6,177.6c5.1,5.1,11.8,7.9,19.1,7.9h0.1c7.2,0,14-2.8,19-7.9l177.5-177.6C453.2,296.1,453.2,279,442.7,268.5z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </template>
            </li>
            <li>
              <div class="gried-view">
                <span
                  class="gridview"
                  :class="{ active: mode == 'row' }"
                  @click="$emit('update:mode', 'row')"
                  ><svg
                    id="Layer_1"
                    class="gridview-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4377" transform="translate(-594.872 -288.043)">
                      <path
                        id="Path_3460"
                        class="fill-color"
                        d="M600.9,289.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H600.9 M600.9,288h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C602.9,288.9,602,288,600.9,288z"
                      ></path>
                      <path
                        id="Path_3461"
                        class="fill-color"
                        d="M610.9,289.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H610.9 M610.9,288h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C612.9,288.9,612,288,610.9,288z"
                      ></path>
                      <path
                        id="Path_3462"
                        class="fill-color"
                        d="M600.9,299.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H600.9 M600.9,298h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C602.9,298.9,602,298,600.9,298z"
                      ></path>
                      <path
                        id="Path_3463"
                        class="fill-color"
                        d="M610.9,299.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H610.9 M610.9,298h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C612.9,298.9,612,298,610.9,298z"
                      ></path>
                    </g></svg
                ></span>
                <span
                  class="listview"
                  :class="{ active: mode == 'column' }"
                  @click="$emit('update:mode', 'column')"
                  ><svg
                    id="Layer_1"
                    class="listview-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4378" transform="translate(-645.53 -288.043)">
                      <path
                        id="Path_3464"
                        class="fill-color"
                        d="M648.5,289.5v1.5H647v-1.5H648.5 M648.5,288H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5v-1.5C650,288.7,649.4,288,648.5,288z"
                      ></path>
                      <path
                        id="Path_3465"
                        class="fill-color"
                        d="M662.8,291H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,291,662.8,291L662.8,291z"
                      ></path>
                      <path
                        id="Path_3466"
                        class="fill-color"
                        d="M648.5,296.3v1.5H647v-1.5H648.5 M648.5,294.8H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5v-1.5C650,295.5,649.4,294.8,648.5,294.8L648.5,294.8z"
                      ></path>
                      <path
                        id="Path_3467"
                        class="fill-color"
                        d="M662.8,297.8H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,297.8,662.8,297.8L662.8,297.8z"
                      ></path>
                      <path
                        id="Path_3468"
                        class="fill-color"
                        d="M648.5,303v1.5H647V303H648.5 M648.5,301.5H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5V303C650,302.2,649.4,301.5,648.5,301.5z"
                      ></path>
                      <path
                        id="Path_3469"
                        class="fill-color"
                        d="M662.8,304.5H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,304.5,662.8,304.5L662.8,304.5z"
                      ></path>
                    </g></svg
                ></span>
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
    searchbar: { type: Object, default: null },
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
    isInteger() {
      return Number.isInteger(parseInt(this.hashParam))
    },
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
      this.$setPageTitle(title + ' | ' + this.$brandName())
    },
    intialCount(intialCount) {
      this.$emit('update:assetCount', intialCount)
    },
    assetCount(assetCount) {
      this.intialCount = assetCount || '12'
    },
  },
  mounted() {
    if (this.hashParam !== 'search') {
      this.$setPageTitle(
        'All ' +
          this.categoriesObject
            .find(({ id }) => this.hashParam === id)
            ?.text?.toLowerCase() +
          ' | ' +
          this.$brandName()
      )
    } else {
      switch (this.hashParam) {
        case 'search':
          this.$setPageTitle('Showing result of' + ' | ' + this.$brandName())
          break
        case 'popular':
          this.$setPageTitle(
            'Showing result of Popular Tag: ' +
              this.$route.query.tag +
              ' | ' +
              this.$brandName()
          )
      }
    }
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
  head() {
    return {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: this.$_auth() === null ? '/favicon.png' : this.$_auth().favicon,
        },
      ],
    }
  },
}
</script>
