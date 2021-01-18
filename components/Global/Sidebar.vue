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

<style>
.asset-left {
  overflow: hidden;
}
.asset-left > div,
.popular-tags,
.subfolder-list.sidebar {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.asset-overview {
  margin-bottom: 1rem;
}
.dam-folder-list {
  flex: 1;
  overflow: auto !important;
  margin-bottom: 1rem;
}
.folder-list.ec-list {
  max-height: unset !important;
  overflow: hidden !important;
  margin-bottom: 0;
}
.asset-left > div,
.popular-tags {
  height: 100%;
}

.subfolder-list.sidebar {
  flex: 1;
}
.popular-tags {
  flex: 1;
  max-height: 35%;
  margin-top: 0rem;
}
.popular-tags .tag-inner {
  flex: 1;
  height: 100%;
  max-height: unset;
  padding-bottom: 1rem;
  overflow: auto;
}

.popular-tags input[type='text'] {
  display: none;
}
</style>
