<template>
  <div>
    <AssetOverview></AssetOverview>
    <div class="subfolder-list sidebar">
      <div class="add-folder">
        <h4>Folders</h4>
      </div>
      <FolderList></FolderList>
    </div>
    <div class="popular-tags">
      <h4>Popular Keywords</h4>
      <div class="tag-inner">
        <TagsInput
          v-if="dashboardData"
          :value="
            dashboardData.popular_keywords.map(({ tag_name }, id) => ({
              tag_name,
              id,
            }))
          "
          disabled
          imutable
          click-event
          @click:item.stop="openTagView"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dashboardData() {
      return this.$store.state.appData.dashboardData
    },
  },
  methods: {
    openTagView({ tagItemText }) {
      this.$router.push({
        name: 'brand_name-folders',
        params: {
          brand_name: this.$getBrandName(),
        },
        hash: '#popular',
        query: { tag: tagItemText },
      })
    },
  },
}
</script>

<style></style>
