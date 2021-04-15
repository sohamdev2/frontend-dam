<template>
  <li>
    <div class="categary-name tb-column flex52">
      <div class="media">
        <div class="media-left">
          <div class="categary-image">
            <img src="~/assets/img/folder-icon.svg" alt="Folder Icon" />
          </div>
        </div>
        <div class="media-body">
          <div class="top-column">
            <nuxt-link
              :is="shareMode ? 'a' : 'nuxt-link'"
              v-tooltip="folder.folder_name || folder.category_name"
              :event="selected || shareMode ? '' : 'click'"
              :to="
                shareMode
                  ? ''
                  : {
                      name: 'brand_name-folders',
                      params: {
                        brand_name: $getBrandName(),
                        folder_name: folder.folder_name || folder.category_name,
                      },
                      hash: `#${folder.id}`,
                    }
              "
            >
              {{ folder.folder_name || folder.category_name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="assets tb-column flex15">
      <div class="top-column">
        <span
          ><template v-if="assetsCount"
            >{{ assetsCount }} Asset<template v-if="assetsCount > 1"
              >s</template
            ></template
          >
          <template v-else>Empty Folder</template></span
        >
      </div>
    </div>
    <div class="update-date tb-column flex15">
      <div class="top-column">
        <label>{{ $moment(folder.updated_at).format('Do MMM, YYYY') }}</label>
      </div>
    </div>
    <div class="size tb-column flex10">
      <div class="top-column">
        <label>&dash;</label>
      </div>
    </div>
    <div class="categary-action tb-column flex8">
      <div class="top-column">
        <div class="categary-actions text-center">
          <template v-if="shareMode"> - </template>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    folder: { type: Object, default: () => ({}) },
    selected: { type: Boolean, default: false },
    shareMode: { type: Boolean, default: false },
  },
  computed: {
    workspaceId() {
      return this.$getWorkspaceId()
    },
    assetsCount() {
      return (
        (this.folder.total_assets || 0) + (this.folder.sub_category_count || 0)
      )
    },
  },
}
</script>
