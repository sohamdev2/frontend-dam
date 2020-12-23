<template>
  <div class="pagination-container">
    <ul class="pagination">
      <!-- <li v-if="page > 2" class="page-item" @click="page = 1">
        <a class="page-link">
          <i class="fa fa-angle-double-left" aria-hidden="true"></i>
        </a>
      </li> -->
      <li v-if="page > 1" class="page-item" @click="page -= 1">
        <a class="page-link">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </a>
      </li>
      <li
        v-for="i in lastPage"
        :key="i"
        class="page-item"
        :class="{ active: page == i }"
        @click="page = i"
      >
        <a class="page-link">{{ i }}</a>
      </li>
      <li v-if="page != lastPage" class="page-item" @click="page += 1">
        <a class="page-link">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </a>
      </li>
      <!-- <li
        v-if="page != lastPage - 1"
        class="page-item"
        @click="page = lastPage"
      >
        <a class="page-link">
          <i class="fa fa-angle-double-right" aria-hidden="true"></i>
        </a>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    lastPage: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
  },
  data() {
    return {
      page: this.currentPage,
    }
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

<style></style>
