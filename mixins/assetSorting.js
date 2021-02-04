/* eslint-disable camelcase */
const categories = ['video', 'audio', 'image', 'application', 'archive']

export default {
  data() {
    return {
      sorting: { files: {}, subFolders: {}, toolbar: { value: '', dsec: '' } },
    }
  },

  methods: {
    apiSortValue() {
      return this.sorting.files.field === 'date'
        ? 'updated_at'
        : this.sorting.files.field || 'updated_at'
    },
    apiSortOrder() {
      const toReverse =
        this.sorting.files.field === 'date' ||
        this.sorting.files.field === 'updated_at'
      const order = this.sorting.toolbar.desc
      return (toReverse ? !order : order) ? 'DESC' : 'ASC'
    },
    resetSort() {
      this.sorting = {
        files: {},
        subFolders: {},
        toolbar: { value: '', dsec: '' },
      }
    },
    sort(path, field_name, _primer) {
      if (!field_name) return

      const primer = _primer || ((v) => v)
      const hasPages = this.lastPage > 1

      const toReverse = field_name === 'date' || field_name === 'updated_at'
      // console.log({ [field_name]: toReverse });
      this.sorting[path].reverse =
        this.sorting[path].field === field_name
          ? !this.sorting[path].reverse
          : toReverse

      this.sorting[path].field = field_name

      // only update ui on files
      if (path === 'files') {
        this.sorting.toolbar.desc = this.sorting[path].reverse
        if (toReverse) this.sorting.toolbar.desc = !this.sorting.toolbar.desc
      }

      if (hasPages)
        if (categories.includes(this.hashParam)) {
          if (path === 'subFolders') return

          return this.prefetch()
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
