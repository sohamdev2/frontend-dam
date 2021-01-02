<template>
  <li :class="{ expanded: hasSubFolder, open: expanded }">
    <component
      :is="props.is"
      v-bind="props"
      class="folder-item"
      :class="{ active: folder.id == ($route.hash || '').replace('#', '') }"
      v-on="listeners"
    >
      {{ folder.folder_name || folder.category_name }}
    </component>
    <template v-if="hasSubFolder">
      <i
        v-if="hasSubFolder"
        class="menu-expand"
        @click="expanded = !expanded"
      ></i>
      <transition-group class="sub-menu" name="slide" tag="ul">
        <ContentLoader
          v-if="loading"
          key="loading"
          :speed="1"
          :width="240"
          style="margin-top: 1rem"
          :height="134"
          :animate="true"
        >
          <rect x="10" y="5" rx="2" ry="2" width="220" height="24" />
          <rect x="10" y="40" rx="2" ry="2" width="220" height="24" />
          <rect x="10" y="75" rx="2" ry="2" width="220" height="24" />
          <rect x="10" y="110" rx="2" ry="2" width="220" height="24" />
        </ContentLoader>
        <FolderItem
          v-for="subFolder in sortedFolders"
          :key="subFolder.id"
          :folder="subFolder"
        />
      </transition-group>
    </template>
  </li>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import FolderItem from './FolderItem'

export default {
  name: 'FolderItem',
  components: { FolderItem, ContentLoader },
  props: {
    folder: { type: Object, required: true },
  },
  data() {
    return {
      expanded: false,
      loading: false,
      sortedFolders: [],
      hasSubFolder: false,
    }
  },
  computed: {
    workspaceId() {
      return this.$getWorkspaceId()
    },
    props() {
      const props = { is: 'nuxt-link' }

      props.to = {
        name: 'brand_name-folders',
        params: { brand_name: this.$getBrandName() },
        hash: `#${this.folder.id}`,
      }

      return props
    },
    listeners() {
      const listeners = { ...this.$listeners }

      return listeners
    },
  },
  watch: {
    folder: {
      deep: true,
      handler() {
        this.makeData()
      },
    },
    expanded() {
      window.$(this.$el).find('.sub-menu').first().slideToggle()

      this.getSubfoldersifNeeded()
    },
  },
  mounted() {
    this.getSubfoldersifNeeded()
    this.makeData()
  },
  methods: {
    makeData(folder = this.folder) {
      this.sortedFolders = [...(folder.sub_category_data || [])].sort(
        this.$sortBy('folder_name', false, null, true)
      )

      this.hasSubFolder =
        folder.sub_category_count > 0 || !!this.sortedFolders.length
    },
    getSubfoldersifNeeded() {
      if (this.expanded) {
        if (
          this.folder.sub_category_count !==
          (this.folder.sub_category_data &&
            this.folder.sub_category_data.length)
        ) {
          this.loading = true

          this.$axios
            .$post('digital/view-category', {
              workspace_id: this.workspaceId,
              category_id: this.folder.id,
            })
            .then(({ data }) => {
              this.makeData(data)
              this.$store.commit('appData/setFolderItem', data)
            })
            .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
            .finally(() => (this.loading = false))
        }
      }
    },
  },
}
</script>

<style>
.folder-item {
  position: relative;
}
.folder-item::after {
  content: '';
  position: absolute;
  top: 1px;
  right: 1px;
  left: 1px;
  bottom: 1px;
  border-top: 4px solid transparent;
  border-radius: inherit;
  transition: border 230ms ease-out;
}

.folder-item.active::after {
  border-color: #ed703d;
}

.folder-list li.expanded.open > .menu-expand {
  background-color: transparent !important;
}
</style>
