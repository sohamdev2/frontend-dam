<template>
  <div class="pagination-container">
    <ul class="pagination">
      <li v-if="page > 1" class="page-item" @click="page -= 1">
        <a class="page-link">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </a>
      </li>
      <template v-for="link in links">
        <li v-if="link.separator" :key="link.key" class="py-1 mb-2">
          <span>...</span>
        </li>
        <li
          v-else
          :key="link.index"
          :class="{ active: page == link.index }"
          class="page-item"
          @click="page = link.index"
        >
          <a class="page-link">{{ link.index }}</a>
        </li>
      </template>
      <li v-if="page != lastPage" class="page-item" @click="page += 1">
        <a class="page-link">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
const MAX_PAGE = 7

export default {
  props: {
    lastPage: { type: Number, default: -1 },
    currentPage: { type: Number, default: -1 },
  },
  data() {
    return {
      page: this.currentPage,
    }
  },
  computed: {
    links() {
      const links = []
      const mid = Math.round(MAX_PAGE / 2)

      if (this.lastPage <= MAX_PAGE) {
        Array(this.lastPage)
          .fill(null)
          .forEach((_, i) => links.push({ index: i + 1 }))
      } else if (this.page < mid) {
        Array(mid)
          .fill(null)
          .forEach((_, i) => links.push({ index: i + 1 }))

        links.push({ separator: true, key: 'mid-sep' })
        const startEnd = this.lastPage - mid + 1

        Array(mid - 1)
          .fill(null)
          .forEach((_, i) => links.push({ index: startEnd + i + 1 }))
      } else if (this.page >= mid && this.page <= this.lastPage - mid) {
        links.push({ index: 1 })
        if (this.page >= mid) links.push({ separator: true, key: 'start-sep' })
        Array(MAX_PAGE - 2)
          .fill(null)
          .forEach((_, i) =>
            links.push({ index: this.page + i + 1 - Math.round(mid / 2) })
          )

        if (this.page + mid < this.lastPage)
          links.push({ separator: true, key: 'end-sep' })
        links.push({ index: this.lastPage })
      } else {
        Array(mid - 2)
          .fill(null)
          .forEach((_, i) => links.push({ index: i + 1 }))

        links.push({ separator: true, key: 'mid-sep' })
        const startEnd = this.lastPage - mid

        Array(mid + 1)
          .fill(null)
          .forEach((_, i) => links.push({ index: startEnd + i }))
      }
      return links
    },
  },
  watch: {
    page(page) {
      this.$emit('update:currentPage', page)
    },
    currentPage(currentPage) {
      this.page = currentPage
    },
  },
}
</script>

<style>
.pagination {
  margin: 1rem 0px;
}
</style>
