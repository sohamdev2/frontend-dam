<template>
  <li>
    <div class="preview-img tb-column flex10" style="cursor: pointer">
      <div class="media">
        <div class="media-left">
          <div class="categary-image">
            <img
              :src="
                require(assetsCount
                  ? '~/assets/img/folder-icon.svg'
                  : '~/assets/img/folder-icon2.svg')
              "
              alt="Folder Icon"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="categary-name tb-column flex27">
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
                    folder: folder.folder_name || folder.category_name,
                  },
                  hash: `#${folder.id}`,
                }
          "
        >
          <span>{{ folder.folder_name || folder.category_name }}</span>
        </nuxt-link>
      </div>
    </div>
    <div class="assets tb-column flex18">
      <div class="top-column">
        <span
          ><template v-if="assetsCount">
            <template v-if="folder.sub_category_count > 0"
              >{{ folder.sub_category_count }} Folder<template
                v-if="folder.sub_category_count > 1"
                >s</template
              ></template
            >
            <template v-if="folder.total_assets > 0"
              >{{ folder.total_assets }} Asset<template
                v-if="folder.total_assets > 1"
                >s</template
              ></template
            ></template
          >
          <template v-else>Empty Folder</template></span
        >
      </div>
    </div>
    <div class="update-date tb-column flex18">
      <div class="top-column">
        <label style="font-size: 13px">{{
          $moment(folder.updated_at).format('Do MMM, YYYY')
        }}</label>
      </div>
    </div>
    <div class="size tb-column flex12">
      <div class="top-column">
        <label style="font-size: 13px">&dash;</label>
      </div>
    </div>
    <div class="categary-action tb-column flex15">
      <div class="top-column">
        <div class="categary-actions text-right">
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
