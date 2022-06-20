<template>
  <div class="filter-search row no-gutters">
    <div class="filter-wrapper col">
      <div class="search-by">
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
        data-lpignore="true"
        @keyup.enter="search()"
        @keyup.esc="moreOptions = false"
      />
      <div class="search-more">
        <span v-if="dashboardData">
          {{ $localeNumber(dashboardData.media_assets) }} assets
        </span>

        <a
          class="search-btn"
          :class="{ 'btn-disable': !hasFilters }"
          :disabled="!hasFilters"
          @click="search"
        >
          <svg
            id="Layer_1"
            class="search-icon white"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <path
              id="Icon_ionic-ios-search"
              class="fill-color"
              d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="refine-btn">
      <button
        type="button"
        class="btn btn-icon filter-icon"
        :class="{ active: hasFilters }"
        @click="moreOptions = !moreOptions"
      >
        Refine
        <svg
          id="Layer_1"
          class="filter-icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <path
            id="Path_3228"
            class="fill-color"
            d="M0,9c0-0.4,0.3-0.7,0.7-0.7l0,0H4V6.6c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7c0,0,0,0,0,0v4.8c0,0.4-0.3,0.7-0.7,0.7c-0.4,0-0.7-0.3-0.7-0.7c0,0,0,0,0,0V9.7H0.7C0.3,9.7,0,9.4,0,9z M17.3,8.3H7.1C6.7,8.3,6.3,8.6,6.4,9c0,0.4,0.3,0.7,0.7,0.7h10.2C17.7,9.7,18,9.4,18,9C18,8.6,17.7,8.3,17.3,8.3C17.3,8.3,17.3,8.3,17.3,8.3L17.3,8.3z M0.7,3.9h9.2c0.4,0,0.7-0.4,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7H0.7C0.3,2.4,0,2.7,0,3.1C0,3.5,0.3,3.9,0.7,3.9C0.7,3.9,0.7,3.9,0.7,3.9z M17.3,2.4h-4.4V0.7c0-0.4-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.3-0.7,0.7v4.8c0,0.4,0.3,0.7,0.7,0.7c0.4,0,0.7-0.3,0.7-0.7l0,0V3.9h4.4c0.4,0,0.7-0.3,0.7-0.7C18,2.8,17.7,2.4,17.3,2.4C17.3,2.4,17.3,2.4,17.3,2.4L17.3,2.4z M17.3,14.1H9.7c-0.4,0-0.7,0.3-0.7,0.7c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0.1,0h7.6c0.4,0,0.7-0.3,0.7-0.7C18,14.5,17.7,14.1,17.3,14.1C17.3,14.1,17.3,14.1,17.3,14.1zM7.3,11.7c-0.4,0-0.7,0.3-0.7,0.7v1.7H0.7c-0.4,0-0.7,0.3-0.7,0.7c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0.1,0h5.9v1.7c0,0.4,0.3,0.7,0.7,0.7c0.4,0,0.7-0.3,0.7-0.7l0,0v-4.8C8.1,12,7.8,11.7,7.3,11.7C7.4,11.7,7.3,11.7,7.3,11.7L7.3,11.7z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="filter-menu customscrollbar" :class="{ show: moreOptions }">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h4 class="m-0">Refine your search</h4>
        </div>
        <div class="col-md-6 d-flex justify-content-end align-items-center">
          <button
            v-if="filterItems.length"
            class="btn btn-gray apply-btn"
            type="button"
            @click="reset"
          >
            Reset
          </button>
          <button
            type="button"
            class="btn apply-btn"
            :class="{ 'btn-disable': !hasFilters }"
            :disabled="!hasFilters"
            @click="search()"
          >
            Apply Filters
          </button>

          <a class="filter-close" @click="moreOptions = false">
            <svg
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
          </a>
        </div>
        <div class="col-md-12 mt-4">
          <transition-group tag="div" name="slide-right" class="tag-add-box">
            <span
              v-for="filterItem in filterItems"
              :key="filterItem.key"
              class="added-tag"
            >
              <label :inner-html.prop="filterItem.name"></label>
              <span>
                <svg
                  id="Layer_1"
                  class="close-icon h-red"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                  @click="removeFilter(filterItem)"
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
                  </g></svg
              ></span>
            </span>
          </transition-group>
        </div>
      </div>
      <div class="filter-wrapper mt-3">
        <div class="row big-gutters">
          <div class="col-md-4 col-lg-3 col-xl">
            <div class="filter-menu-inner">
              <h5>Upload Date</h5>
              <ul class="filter-option">
                <li v-for="date in optionDates" :key="date.value">
                  <input
                    :id="`uploaddate-${date.value}`"
                    :value="date.value"
                    type="radio"
                    :checked="searchParams.date == date.value"
                    name="uploadDate"
                    @click="selectDate"
                  />
                  <label :for="`uploaddate-${date.value}`" class="select-box">
                    <span>{{ date.text }}</span>
                  </label>
                </li>

                <li>
                  <DateRangePicker
                    v-if="!searchDataLoading"
                    ref="dateRangePicker"
                    class="daterange flatpickr-input"
                    :start-date.sync="searchParams.start_date"
                    :end-date.sync="searchParams.end_date"
                    placeholder="Custom Date Range"
                    display-format="MMM Do, YYYY"
                    custom-event
                    human
                    @dateChanged="
                      ;(searchParams.start_date || searchParams.end_date) &&
                        (searchParams.date = '')
                    "
                  />
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 col-lg-3 col-xl">
            <div class="filter-menu-inner">
              <h5>Popular File Types</h5>
              <template v-if="fileTypes.length">
                <ul class="filter-option">
                  <li v-for="type in fileTypes" :key="type.id">
                    <input
                      :id="`file-type-${type.file_type}`"
                      :value="type.file_type"
                      :checked="
                        searchParams.file_types.includes(type.file_type)
                      "
                      type="checkbox"
                      name="file-type"
                      @click="selectFileType"
                    />
                    <label
                      class="select-box"
                      :for="`file-type-${type.file_type}`"
                    >
                      <span>{{ type.file_type }}</span>
                      <span>
                        <b>{{
                          Number(type.total_assets_count || 0).toLocaleString()
                        }}</b>
                      </span>
                    </label>
                  </li>
                </ul>
              </template>
              <ul v-else class="filter-option">
                <li class="mt-3">
                  <span class="text-secondary">No data available.</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 col-lg-3 col-xl-5">
            <div class="filter-menu-inner">
              <h5>Popular Tags</h5>
              <div v-if="popularTags.length" class="tag-box">
                <div
                  v-for="tag in popularTags"
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
              <div v-if="searchData.popular_tag_select" class="tag-dropdown">
                <Multiselect
                  v-model="searchParams.other_tags"
                  class="multiselect"
                  multiple
                  :close-on-select="false"
                  :options="
                    searchData.popular_tag_select.map((item) => item.tag_name)
                  "
                  placeholder="Other Tags"
                  custom-event
                />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-lg-3 col-xl">
            <div class="filter-menu-inner">
              <template v-if="searchData.orientation">
                <h5>Orientation</h5>
                <ul class="filter-option">
                  <li
                    v-for="orientation in orientations"
                    :key="orientation.value"
                  >
                    <input
                      :id="`orientation-${orientation.value}`"
                      :value="orientation.value"
                      :checked="searchParams.orientation == orientation.value"
                      type="radio"
                      name="orientation"
                      @click="selectOrientation"
                    />
                    <label
                      :for="`orientation-${orientation.value}`"
                      class="select-box"
                    >
                      <span>{{ orientation.text }}</span>
                      <span>
                        {{
                          Number(
                            searchData.orientation[orientation.value] || 0
                          ).toLocaleString()
                        }}
                      </span>
                    </label>
                  </li>
                </ul>
              </template>
              <h5 class="mb-2">Permission</h5>
              <Select2
                v-model="searchParams.permission"
                class="select"
                :attrs="{ minimumResultsForSearch: -1 }"
                :options="permissionOptions"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import 'vue-multiselect/dist/vue-multiselect.min.css'

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
const permissionOptions = Object.freeze([
  { text: 'All', id: 'all' },
  { text: 'Public', id: '1' },
  { text: 'Private', id: '0' },
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
  this.permission = 'all'
}

export default {
  components: { Multiselect },
  data() {
    return {
      orientations,
      optionDates,
      SearchParams,
      filterOptions,
      permissionOptions,
      searchParams: this.$route.params.searchParams || new SearchParams(),
      moreOptions: false,
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
    fileTypes() {
      return [...(this.searchData?.popular_file_type || [])]
        .filter((a) => a && a.total_assets_count >= 5)
        .sort(this.$sortBy('total_assets_count', true, this.$sortToTypedNumber))
        .slice(0, 12)
    },
    popularTags() {
      return [...(this.searchData?.popular_tag || [])]
        .filter((a) => a && a.total_tag_count >= 5)
        .sort(this.$sortBy('total_tag_count', true, this.$sortToTypedNumber))
        .slice(0, 12)
    },
    filterItems() {
      const filters = []

      if (this.searchParams.search_term)
        filters.push({
          key: 'search_term',
          type: 'search_term',
          name: `Term: <strong>${this.$escapeHtml(
            this.searchParams.search_term
          )}</strong>`,
        })

      if (this.searchParams.exact_term)
        filters.push({
          key: 'exact_term',
          type: 'exact_term',
          name: '<strong>Exact match</strong>',
        })

      if (this.searchParams.filter !== 'all') {
        const text = filterOptions.find(
          ({ id }) => id === this.searchParams.filter
        ).text

        filters.push({
          key: 'filter',
          type: 'filter',
          name: `Search in: <strong>${text}</strong>`,
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
            name: `Upload Date: <strong>${text}</strong>`,
          })
        } else if (this.searchParams.start_date || this.searchParams.end_date) {
          if (this.$refs.dateRangePicker) {
            if (this.$refs.dateRangePicker.fp) {
              this.$refs.dateRangePicker.fp.setDate([
                this.searchParams.start_date,
                this.searchParams.nd_date,
              ])
            }
            filters.push({
              key: 'date',
              type: 'custom_date',
              name: `Upload Date: <strong>${this.$refs.dateRangePicker.getValueText()}</strong>`,
            })
          } else if (this.$route.params.filterItems) {
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
          name: `Ext: <strong>${type}</strong>`,
          value: type,
        })),
        ...(this.searchParams.tags || []).map((tag) => ({
          key: `tag-${tag}`,
          type: 'tags',
          name: `Tag: <strong>${tag}</strong>`,
          value: tag,
        })),
        ...(this.searchParams.other_tags || []).map((tag) => ({
          key: `tag-${tag}`,
          type: 'other_tags',
          name: `Tag: <strong>${tag}</strong>`,
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
          name: `Orientation: <strong>${text}</strong>`,
          value: this.searchParams.orientation,
        })
      }
      if (this.searchParams.permission !== 'all') {
        const text = permissionOptions.find(
          ({ id }) => id === this.searchParams.permission
        ).text

        filters.push({
          key: 'permission',
          type: 'permission',
          name: `Search in: <strong>${text}</strong>`,
        })
      }

      return filters
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
  },
  watch: {
    $route(route) {
      if (route.hash !== '#search') {
        window.$('body').removeClass('show-overly')
        this.moreOptions = false
        this.reset()
      }
    },
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
        this.getSearchData()
        this.$forceUpdate()
        window.$('body').addClass('show-overly')
      } else window.$('body').removeClass('show-overly')

      if (moreOptions) document.addEventListener('keyup', this.keyEvent)
      else {
        document.removeEventListener('keyup', this.keyEvent)

        const query = { ...this.$route.query }

        if (query.moreOptions) {
          delete query.moreOptions

          this.$router
            .replace({
              params: this.$route.params,
              query,
              hash: this.$route.hash,
            })
            .catch(() => {})
        }
      }
    },
  },
  mounted() {
    this.searchParams = this.$route.params.searchParams || new SearchParams()
    this.$nextTick(() => {
      if (this.hashParam !== 'search')
        this.searchParams.filter =
          filterOptions.find(({ id }) => this.hashParam === id)?.id || 'all'
    })
    this.getSearchData()
    this.loadJs()
    if (this.$route.query?.uploaded === 'yesterday') {
      const yesterday = moment().subtract(1, 'day').format(DATE_FORMAT)
      this.searchParams.date = ''
      this.searchParams.start_date = yesterday
      this.searchParams.end_date = yesterday
      this.search()
    }
  },
  destroyed() {
    if (this.moreOptions) document.removeEventListener('keyup', this.keyEvent)
  },
  methods: {
    reset() {
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

      this.searchParams = new SearchParams()
    },
    removeFilterItem(filterItem) {
      this.removeFilter(filterItem)
      this.$nextTick(() => {
        if (!this.hasFilters) {
          this.$router.replace({
            name: 'brand_name-folders',
          })
          return
        }
        this.search()
      })
    },
    loadJs() {
      window.$('.body-overlay').click(() => {
        this.moreOptions = false
      })
    },
    getHasFilters() {
      return this.hasFilters
    },
    getFilterItems() {
      return this.filterItems
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
        popular_file_type: [...(this.searchParams.file_types || [])],
        popular_tag: [
          ...(this.searchParams.tags || []),
          ...(this.searchParams.other_tags || []),
        ],
        search_text: this.searchParams.search_term,
        orientation: this.searchParams.orientation,
        last_minutes: date === '30min',
        type:
          this.searchParams.filter === 'all' ? null : this.searchParams.filter,
        start_date,
        end_date,
        is_public: this.searchParams.permission,
      }
    },
    search() {
      if (!this.hasFilters) return

      // this.$emit('search')

      const routeOptions = {
        params: {
          brand_name: this.$getBrandName(),
          workspace_id: this.$getWorkspaceId(),
          searchParams: this.searchParams,
          hasFilters: this.getHasFilters(),
          searchRequestBody: this.getRequestBody(),
          filterItems: this.filterItems,
          // removeFilterItem: (filterItem) => {
          //   this.removeFilter(filterItem)
          //   this.$nextTick(() => {
          //     if (!this.hasFilters) {
          //       this.$router.replace({
          //         name: 'brand_name-folders',
          //       })
          //       return
          //     }
          //     this.search()
          //   })
          // },
        },
        hash: '#search',
        query: { searchId: Date.now() },
      }

      if (this.$route.name !== 'brand_name-folders')
        routeOptions.name = 'brand_name-folders'

      this.$router.replace(routeOptions).catch(() => {})
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
        .then(({ data }) => {
          data.popular_tag_select = data.popular_tag_select.sort((a, b) => {
            const fa = a.tag_name.toLowerCase()
            const fb = b.tag_name.toLowerCase()

            if (fa < fb) {
              return -1
            }
            if (fa > fb) {
              return 1
            }
            return 0
          })
          this.searchData = data
        })
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
        case 'permission':
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
