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
          @click:item.stop
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
}
</script>

<style></style>
