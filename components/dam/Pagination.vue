<template>
  <div class="paggination">
    <ul>
      <li v-if="page > 1" @click="page -= 1">
        <a class="page-link">
          <svg
            id="Layer_1"
            class="arrow-left-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4475" transform="translate(-871 -421)">
              <rect
                id="Rectangle_3013"
                x="871"
                y="421"
                class="fill-hide"
                width="18"
                height="18"
              ></rect>
              <g
                id="Icon_feather-chevron-down"
                transform="translate(581.631 103.451)"
              >
                <path
                  id="Path_3433"
                  class="fill-color"
                  d="M301.9,334.3c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l7-7c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-6.5,6.5l6.5,6.5c0.3,0.3,0.3,0.8,0,1.1C302.3,334.2,302.1,334.3,301.9,334.3z"
                ></path>
              </g>
            </g>
          </svg>
        </a>
      </li>
      <template v-for="link in links">
        <li v-if="link.separator" :key="link.key">
          <span>...</span>
        </li>
        <li v-else :key="link.index" @click="page = link.index">
          <a class="page-link" :class="{ active: page == link.index }">{{
            link.index
          }}</a>
        </li>
      </template>
      <li v-if="page != lastPage" @click="page += 1">
        <a class="page-link">
          <svg
            id="Layer_1"
            class="arrow-right-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4476" transform="translate(-921 -421)">
              <rect
                id="Rectangle_3014"
                x="921"
                y="421"
                class="fill-hide"
                width="18"
                height="18"
              ></rect>
              <g
                id="Icon_feather-chevron-down"
                transform="translate(925.75 422.25)"
              >
                <path
                  id="Path_3433"
                  class="fill-color"
                  d="M0.8,15.5c0.2,0,0.4-0.1,0.5-0.2l7-7c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0l-7-7C1-0.1,0.5-0.1,0.2,0.2c-0.3,0.3-0.3,0.8,0,1l6.5,6.5l-6.5,6.5c-0.3,0.3-0.3,0.8,0,1.1C0.4,15.4,0.6,15.5,0.8,15.5z"
                ></path>
              </g>
            </g>
          </svg>
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
