<template>
  <div class="filter-search row no-gutters">
    <div class="filter-wrapper col">
      <div class="input-group-prepend filter-select">
        <client-only>
          <Select2
            v-model="searchParams.filter"
            class="select"
            :attrs="{ minimumResultsForSearch: -1 }"
            :options="filterOptions"
          />
        </client-only>
      </div>
      <input
        v-model.trim="searchParams.search_term"
        type="text"
        class="form-control search-field"
        aria-label="Text input with dropdown button"
        placeholder="Search assets"
        @keyup.enter="search()"
        @keyup.esc="moreOptions = false"
      />
      <div class="search-more">
        <span v-if="dashboardData">
          {{ $localeNumber(dashboardData.media_assets) }} assets
        </span>

        <a class="search-btn" @click="moreOptions = !moreOptions">
          <img
            src="~/assets/img/icon/tag-icon.svg"
            style="filter: invert(1)"
            alt="filter"
          />
        </a>
      </div>
    </div>
    <div class="upload-btn">
      <button
        :to="{
          name: 'workspace_id-asset-manager-upload',
          params: { workspace_id: workspaceId },
        }"
        type="button"
        class="btn btn-icon"
        :class="{ 'btn-disable': !hasFilters }"
        :disabled="!hasFilters"
        @click="search"
      >
        Search
        <img
          src="~/assets/img/icon/bigsearch-icon.svg"
          style="filter: invert(1)"
          alt="search"
        />
      </button>
    </div>
    <!-- filter options -->
    <div class="tag-list" :class="{ open: moreOptions }">
      <div class="daterange-loop daterange-wrapper"></div>
      <div class="row align-items-center">
        <div
          class="col-md-12 col-lg-6 mb-4 order-2 order-lg-1"
          style="display: flex; align-items: center"
        >
          <h4 style="margin-bottom: 3px">Refine your search</h4>
          <!-- <div
              v-if="searchParams.search_term"
              class="custom-checkbox"
              style="flex: 1; margin-left: 1rem"
            >
              <input
                id="search-exact_term"
                type="checkbox"
                class="form-check-input"
                :checked="searchParams.exact_term"
                @input="ev => (searchParams.exact_term = ev.target.checked)"
              />
              <label for="search-exact_term">Search exact terms</label>
            </div> -->
        </div>
        <div
          class="col-md-12 col-lg-6 mb-2 order-1 order-lg-2 text-right justify-content-between justify-content-lg-end align-items-center d-flex"
        >
          <button
            v-if="filterItems.length"
            class="btn dam-btn-outline"
            type="button"
            @click="
              $route.params.searchParams &&
                ($router.push({
                  name: 'brand_name-folders',
                  params: { brand_name: $getBrandName() },
                  params: { workspace_id: $getWorkspaceId() },
                }),
                (moreOptions = false))

              searchParams = new SearchParams($route)
            "
          >
            Reset
          </button>
          <button
            type="button"
            class="btn"
            :class="{ 'btn-disable': !hasFilters }"
            :disabled="!hasFilters"
            @click="search"
          >
            Apply Filters
          </button>
          <a class="close-tags" @click="moreOptions = false">
            <img src="~/assets/img/icon/close-icon.svg" />
          </a>
        </div>
      </div>
      <div class="inside-wrapper">
        <div class="row">
          <div class="col-md-12 mb-3">
            <transition-group
              tag="div"
              name="slide-right"
              class="popular-tags selected-tags"
            >
              <div
                v-for="filterItem in filterItems"
                :key="filterItem.key"
                class="select-field"
              >
                <label v-html="filterItem.name"></label>
                <span @click="removeFilter(filterItem)"></span>
              </div>
            </transition-group>
          </div>
          <div class="col-md-12 col-lg-6 col-xl mb-5 mb-xl-0">
            <h6>Upload Date</h6>

            <div
              v-for="date in optionDates"
              :key="date.value"
              class="select-field"
            >
              <input
                :id="`uploaddate-${date.value}`"
                :value="date.value"
                type="radio"
                :checked="searchParams.date == date.value"
                name="uploadDate"
                @click="selectDate"
              />
              <label :for="`uploaddate-${date.value}`">
                {{ date.text }}
              </label>
            </div>
            <div class="form-group">
              <div class="input-group">
                <DateRangePicker
                  v-if="!searchDataLoading"
                  ref="dateRangePicker"
                  :class="{
                    'dam-selected':
                      searchParams.start_date || searchParams.end_date,
                  }"
                  class="form-control type-2"
                  :start-date.sync="searchParams.start_date"
                  :end-date.sync="searchParams.end_date"
                  placeholder="Custom Date date"
                  opens="center"
                  no-color
                  parent=".daterange-loop"
                  format="MMM Do, YYYY"
                  @dateRangeUpdateDate="
                    ;(searchParams.start_date || searchParams.end_date) &&
                      (searchParams.date = '')
                  "
                />
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-6 col-xl mb-5 mb-xl-0">
            <h6>Popular File Types</h6>
            <div
              v-for="type in [...searchData.popular_file_type]
                .filter((a) => a && a.total_assets_count >= 5)
                .sort($sortBy('total_assets_count'))
                .slice(0, 9)"
              :key="type.id"
              class="select-field"
            >
              <input
                :id="`file-type-${type.file_type}`"
                :value="type.file_type"
                :checked="searchParams.file_types.includes(type.file_type)"
                type="checkbox"
                name="file-type"
                @click="selectFileType"
              />
              <label :for="`file-type-${type.file_type}`">
                <span>{{ type.file_type }}</span>
                <span>
                  {{ Number(type.total_assets_count || 0).toLocaleString() }}
                </span>
              </label>
            </div>
          </div>
          <div class="col-md-12 col-lg-12 col-xl-4 mb-3 mb-xl-0">
            <h6>Popular Tags</h6>
            <div class="popular-tags mb-3">
              <div
                v-for="tag in [...searchData.popular_tag]
                  .filter((a) => a && a.total_tag_count >= 5)
                  .sort($sortBy('total_tag_count'))
                  .slice(0, 12)"
                :key="tag.id"
                class="select-field"
              >
                <input
                  :id="`tags-${tag.tag_name}`"
                  :value="tag.tag_name"
                  type="checkbox"
                  :checked="searchParams.tags.includes(tag.tag_name)"
                  name="tags"
                  @input="addTag"
                />
                <label :for="`tags-${tag.tag_name}`">
                  {{ tag.tag_name }} ({{
                    Number(tag.total_tag_count || 0).toLocaleString()
                  }})
                </label>
              </div>
            </div>
            <div class="search-tag">
              <div class="form-group row">
                <div
                  v-if="searchData.popular_tag_select && moreOptions"
                  class="col-sm-12"
                >
                  <SelectMultiple
                    v-model="searchParams.other_tags"
                    class="form-control"
                    :options="
                      searchData.popular_tag_select.map((item) => ({
                        ...item,
                        text: item.tag_name,
                        id: item.tag_id,
                        value: item.tag_id,
                      }))
                    "
                    placeholder="Other Tags"
                    custom-event
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-12 col-xl mb-3 mb-xl-0">
            <template v-if="searchData.orientation">
              <h6>Orientation</h6>
              <div
                v-for="orientation in orientations"
                :key="orientation.value"
                class="select-field"
              >
                <input
                  :id="`orientation-${orientation.value}`"
                  :value="orientation.value"
                  :checked="searchParams.orientation == orientation.value"
                  type="radio"
                  name="orientation"
                  @click="selectOrientation"
                />
                <label :for="`orientation-${orientation.value}`">
                  <span>{{ orientation.text }}</span>
                  <span>
                    {{
                      Number(
                        searchData.orientation[orientation.value] || 0
                      ).toLocaleString()
                    }}
                  </span>
                </label>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */

import moment from 'moment'
const orientations = Object.freeze([
  { text: 'Horizontal', value: 'horizontal' },
  { text: 'Vertical', value: 'vertical' },
  { text: 'Square', value: 'square' },
])
const DATE_FORMAT = 'YYYY-MM-DD'

const subFromToday = (...arg) =>
  moment()
    .startOf('day')
    .subtract(...arg)
    .format(DATE_FORMAT)

const getToday = () => moment().startOf('day').format(DATE_FORMAT)

const optionDates = Object.freeze([
  { text: 'All', value: 'all', getDates: () => ['all', 'all'] },
  { text: 'Past 30 minutes', value: '30min' },
  {
    text: 'Past 24 hours',
    value: '24hr',
    getDates: () => [getToday(), subFromToday('1', 'day')],
  },
  {
    text: 'Last week',
    value: '7d',
    getDates: () => [getToday(), subFromToday('1', 'week')],
  },
  {
    text: 'Last 30 days',
    value: '30d',
    getDates: () => [getToday(), subFromToday('30', 'day')],
  },
])

const filterOptions = Object.freeze([
  { text: 'All', id: 'all' },
  { text: 'Audios', id: 'audio' },
  { text: 'Documents', id: 'application' },
  { text: 'Images', id: 'image' },
  { text: 'Videos', id: 'video' },
])

function SearchParams() {
  this.exact_term = false
  this.file_types = []
  this.tags = []
  this.date = 'all'
  this.search_term = ''
  this.start_date = ''
  this.end_date = ''
  this.orientation = ''
  this.other_tags = []
  this.filter = 'all'
}

export default {
  data() {
    return {
      orientations,
      optionDates,
      SearchParams,
      filterOptions,
      searchParams: this.$route.params.searchParams || new SearchParams(),
      moreOptions: false,
      //
      searchData: {},
      searchDataLoading: false,
    }
  },
  computed: {
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    hasFilters() {
      return !!this.filterItems.length
    },
    dashboardData() {
      return this.$store.state.appData.dashboardData
    },
    dashboardDataLoading() {
      return this.$store.state.appData.loading.dashboard
    },
    filterItems() {
      const filters = []

      if (this.searchParams.search_term)
        filters.push({
          key: 'search_term',
          type: 'search_term',
          name: `Term: <b>${this.searchParams.search_term}</b>`,
        })

      if (this.searchParams.exact_term)
        filters.push({
          key: 'exact_term',
          type: 'exact_term',
          name: '<b>Exact match</b>',
        })

      if (this.searchParams.filter !== 'all') {
        const text = filterOptions.find(
          ({ id }) => id === this.searchParams.filter
        ).text

        filters.push({
          key: 'filter',
          type: 'filter',
          name: `Search in :&nbsp;<b>${text}</b>`,
        })
      }

      if (this.searchParams.date !== 'all')
        if (this.searchParams.date) {
          const text = optionDates.find(
            ({ value }) => value === this.searchParams.date
          ).text
          filters.push({
            key: 'date',
            type: 'date',
            name: `Upload Date:&nbsp;<b>${text}</b>`,
          })
        } else if (this.searchParams.start_date || this.searchParams.end_date) {
          if (this.$refs.dateRangePicker)
            filters.push({
              key: 'date',
              type: 'custom_date',
              name: `Upload Date:&nbsp;<b>${this.$refs.dateRangePicker.getValueText()}</b>`,
            })
          else if (this.$route.params.filterItems) {
            const a = this.$route.params.filterItems.find(
              ({ key }) => key === 'date'
            )
            if (a) filters.push(a)
          }
        }

      filters.push(
        ...(this.searchParams.file_types || []).map((type) => ({
          key: `ext-${type}`,
          type: 'file_types',
          name: `Ext:&nbsp;<b>${type}</b>`,
          value: type,
        })),
        ...(this.searchParams.tags || []).map((tag) => ({
          key: `tag-${tag}`,
          type: 'tags',
          name: `Tag:&nbsp;<b>${tag}</b>`,
          value: tag,
        })),
        ...(this.searchParams.other_tags || []).map((tag) => ({
          key: `tag-${tag}`,
          type: 'other_tags',
          name: `Tag:&nbsp;<b>${tag}</b>`,
          value: tag,
        }))
      )

      if (this.searchParams.orientation) {
        const text = orientations.find(
          ({ value }) => value === this.searchParams.orientation
        ).text

        filters.push({
          key: 'orientation',
          type: 'orientation',
          name: `Orientation: &nbsp;<b>${text}</b>`,
          value: this.searchParams.orientation,
        })
      }

      return filters
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
  },
  watch: {
    hashParam() {
      if (!this.$route.params.searchParams)
        this.searchParams.filter =
          filterOptions.find(({ id }) => this.hashParam === id)?.id || 'all'
    },
    '$route.query.moreOptions'(moreOptions) {
      this.moreOptions = moreOptions === true
    },
    moreOptions(moreOptions) {
      if (moreOptions) {
        document.addEventListener('keyup', this.keyEvent)

        this.$nextTick(() => {
          this.$forceUpdate()
        })
      } else {
        const query = { ...this.$route.query }
        delete query.moreOptions

        this.$router.replace({
          params: this.$route.params,
          query,
          hash: this.$route.hash,
        })

        // window.$(".daterangepicker").remove();
        document.removeEventListener('keyup', this.keyEvent)
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.searchParams = this.$route.params.searchParams || new SearchParams()
      if (this.hashParam !== 'search')
        this.searchParams.filter =
          filterOptions.find(({ id }) => this.hashParam === id)?.id || 'all'
    })
    this.getSearchData()
  },
  destroyed() {
    if (this.moreOptions) document.removeEventListener('keyup', this.keyEvent)
  },
  methods: {
    getHasFilters() {
      return this.hasFilters
    },
    getRequestBody() {
      let start_date = null
      let end_date = null
      const date = this.searchParams.date

      if (!date) {
        start_date = moment(this.searchParams.start_date).format(DATE_FORMAT)
        end_date = moment(this.searchParams.end_date).format(DATE_FORMAT)
      } else if (date !== '30min') {
        const optionDate = optionDates.find(({ value }) => value === date)
        ;[end_date, start_date] = optionDate.getDates()
      }

      return {
        workspace_id: this.$getWorkspaceId(),
        popular_file_type: [...this.searchParams.file_types],
        popular_tag: [
          ...this.searchParams.tags,
          ...this.searchParams.other_tags,
        ],
        search_text: this.searchParams.search_term,
        orientation: this.searchParams.orientation,
        last_minutes: date === '30min',
        type:
          this.searchParams.filter === 'all' ? null : this.searchParams.filter,
        start_date,
        end_date,
      }
    },
    search() {
      if (!this.hasFilters) return

      this.$emit('search')

      const routeOptions = {
        params: {
          brand_name: this.$getBrandName(),
          workspace_id: this.$getWorkspaceId(),
          searchParams: this.searchParams,
          hasFilters: this.getHasFilters(),
          searchRequestBody: this.getRequestBody(),
          filterItems: this.filterItems,
        },
        hash: '#search',
        query: { searchId: Date.now() },
      }

      if (this.hashParam !== 'search') routeOptions.name = 'brand_name-folders'

      this.$router.replace(routeOptions)
      this.moreOptions = false
    },
    keyEvent(ev) {
      if (ev.key === 'Escape') this.moreOptions = false
    },
    async getSearchData() {
      this.searchDataLoading = true
      this.searchData = {}
      await this.$axios
        .$get(
          '/digital/all-popular-data?' +
            this.$toQueryString({ workspace_id: this.$getWorkspaceId() })
        )
        .then(({ data }) => (this.searchData = data))
        .catch()
      this.searchDataLoading = false
    },
    removeFilter(item) {
      switch (item.type) {
        case 'search_term':
          this.searchParams.search_term = ''
          break
        case 'exact_term':
          this.searchParams.exact_term = false
          break
        case 'filter':
        case 'date':
          this.searchParams[item.type] = 'all'
          break
        case 'orientation':
          this.searchParams.orientation = ''
          break
        case 'custom_date':
          this.searchParams.date = 'all'
          this.searchParams.start_date = ''
          this.searchParams.end_date = ''
          break
        case 'tags':
        case 'other_tags':
        case 'file_types':
          this.searchParams[item.type] = this.searchParams[item.type].filter(
            (type) => type !== item.value
          )
          break
        default:
          break
      }
    },
    selectOrientation(ev) {
      if (ev.target.value === this.searchParams.orientation)
        this.searchParams.orientation = ''
      else this.searchParams.orientation = ev.target.value
    },
    selectDate(ev) {
      if (
        ev.target.value !== 'all' &&
        this.searchParams.date === ev.target.value
      )
        this.searchParams.date = 'all'
      else this.searchParams.date = ev.target.value

      this.searchParams.start_date = ''
      this.searchParams.end_date = ''
    },
    selectFileType(ev) {
      if (ev.target.checked) this.searchParams.file_types.push(ev.target.value)
      else
        this.searchParams.file_types = this.searchParams.file_types.filter(
          (type) => type !== ev.target.value
        )
    },
    addTag(ev) {
      if (ev.target.checked) this.searchParams.tags.push(ev.target.value)
      else
        this.searchParams.tags = this.searchParams.tags.filter(
          (tag) => tag !== ev.target.value
        )
    },
  },
}
</script>

<style>
.daterange-wrapper .daterangepicker .ranges .range_inputs .btn {
  border-color: #13b854;
  width: 100% !important;
}
.daterange-wrapper .daterangepicker .ranges {
  display: block !important;
}
.selected-tags {
  flex-direction: row;
  height: auto;
  overflow: unset;
}
.daterangepicker td.active,
.daterangepicker td.active:hover {
  background-color: #357ebd !important;
  border-color: transparent;
  color: #fff;
}
.daterangepicker td.in-range {
  background-color: #ebf4f8 !important;
}
.daterangepicker .input-mini {
  height: 30px !important;
}
.daterange-wrapper .daterangepicker {
  padding-bottom: 112px !important;
}

.tag-list .popular-tags,
.toolbar .popular-tags {
  flex-direction: row;
  flex-wrap: wrap;
  height: auto !important;
  max-height: 100% !important;
}
.tag-list .select2 {
  border: none;
}
.tag-list .select2-search__field {
  width: auto !important;
}
.tag-list .select2-selection__choice p {
  display: inline-block;
}

.tag-list .select2-container .select2-search--inline .select2-search__field {
  margin-top: 0;
}
.tag-list .select2-selection__choice {
  display: flex;
  flex-direction: row-reverse;
}
.tag-list
  .select2-container--default
  .select2-selection--multiple
  .select2-selection__choice__remove {
  margin-left: 4px;
  margin-right: 0;
}

.tag-list .select2-container--default .select2-selection--multiple {
  width: 100% !important;
  border: none;
  border-radius: 4px;
  display: flex;
  padding: 3px;
}
.selected-tags .select-field {
  height: 100%;
}

.select-field input + label {
  transition: 240ms ease-out;
}
.selected-tags.popular-tags .select-field span {
  background: url('~@/assets/img/icon/tag-close.svg') no-repeat ce;
}
.tag-list .form-control.type-2 {
  height: 44px !important;
}
.selected-tags.popular-tags .select-field label,
.select-field label,
.tag-list .form-control.type-2,
.popular-tags .select-field label {
  transition: 240ms ease;
  color: #212121;
  outline: none;
  border-radius: 4px;
  background-color: white !important;
  border: 2px solid transparent !important;
  font-weight: 500 !important;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.082) !important;
}
.selected-tags.popular-tags .select-field label:hover,
.select-field label:hover,
.popular-tags .select-field label:hover {
  background-color: #f1f1f1 !important;
}
.selected-tags.popular-tags .select-field label {
  font-size: 12px;
  box-shadow: none !important;
  padding: 2px 28px 2px 4px;
}
.selected-tags.popular-tags .select-field {
  margin-bottom: 8px;
}
.selected-tags.popular-tags .select-field span {
  top: calc(50% - 5px);
  right: 12px;
  line-height: 10px;
  height: 10px;
  width: 10px;
  padding: 2px;
}

.tag-list .form-control.type-2.dam-selected,
.select-field input:checked + label {
  background-color: #e2e2e2 !important;
  color: #483229;
  box-shadow: none !important;
}

.search-btn.btn-disable {
  cursor: default;
  opacity: 0.45;
}
</style>
