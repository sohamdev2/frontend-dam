/* eslint-disable camelcase */
// const categories = ['video', 'audio', 'image', 'application', 'archive']
const initialSortingData = () => ({
  initialData: true,
  files: {
    field: 'name',
    reverse: false,
  },
  subFolders: {
    field: 'name',
    reverse: false,
  },
  toolbar: { value: 'name', desc: false },
  // totalAssetCount: '12',
})

export default {
  data() {
    return {
      sorting: initialSortingData(),
    }
  },

  methods: {
    // changeEmitAssetCount(data) {
    //   this.sorting.totalAssetCount = data
    //   return this.prefetch()
    // },
    apiSortValue() {
      return this.sorting.toolbar.value === 'Sort by'
        ? 'updated_at'
        : this.sorting.toolbar.value || 'updated_at'
    },
    apiSortOrder() {
      // const toReverse =
      //   this.sorting.files.field === "date" ||
      //   this.sorting.files.field === "updated_at";
      // let order = this.sorting.toolbar.desc;
      const order = this.sorting.files.reverse
      // order = toReverse ? !order : order;
      return order ? 'DESC' : 'ASC'
    },
    resetSort() {
      this.sorting = initialSortingData()
    },
    sort(path, field_name, _primer) {
      if (!field_name) return
      const primer = _primer || ((v) => v)
      let tst = null
      if (this.$route.name.search('collection') > -1) {
        if (path === 'subFolders') {
          tst = 2
        } else {
          tst = -1
        }
      } else {
        tst = this.lastPage
      }
      const hasPages = tst > 1

      const toReverse = true
      // field_name === 'date' || field_name === 'updated_at'
      // console.log({ [field_name]: toReverse });
      this.sorting[path].reverse =
        this.sorting[path].field === field_name
          ? !this.sorting[path].reverse
          : toReverse

      this.sorting[path].field = field_name

      // only update ui on files
      if (path === 'files') {
        this.sorting.toolbar.desc = this.sorting[path].reverse
        // if (toReverse) this.sorting.toolbar.desc = !this.sorting.toolbar.desc
      }

      if (hasPages) {
        if (path === 'subFolders')
          // if (categories.includes(this.hashParam)) {
          return

        return this.prefetch()
        // }
      }

      this[path] = this[path].sort(
        this.$sortBy(
          this.sorting[path].field,
          this.sorting[path].reverse,
          (x) => primer(x, this.sorting[path].reverse)
        )
      )
    },
  },
}
