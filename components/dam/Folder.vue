<template>
  <li :class="{ selected }">
    <div class="preview-img tb-column flex10">
      <label v-if="!shareMode" class="check-label">
        <input :checked="selected" type="checkbox" />
        <label
          class="check-span"
          @click="$emit('click:selected', folder)"
        ></label>
      </label>
      <div class="categary-image folder-image">
        <span>
          <img src="~/assets/img/folder-icon.svg" alt="Folder Icon" />
          <b v-if="assetsCount"
            >{{ assetsCount }} Asset<template v-if="assetsCount > 1"
              >s</template
            ></b
          >
          <b v-else>Empty Folder</b>
        </span>
      </div>
    </div>
    <div class="categary-name tb-column flex27">
      <div class="top-column">
        <nuxt-link
          :is="shareMode ? 'a' : 'nuxt-link'"
          :event="selected || shareMode ? '' : 'click'"
          :style="{
            cursor: shareMode ? 'default' : 'pointer',
          }"
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
    <div class="assets tb-column flex18">
      <div class="top-column">
        <label
          ><template v-if="assetsCount"
            >{{ assetsCount }} Asset<template v-if="assetsCount > 1"
              >s</template
            ></template
          >
          <template v-else>Empty Folder</template></label
        >
      </div>
    </div>
    <div class="update-date tb-column flex18">
      <div class="top-column">
        <label>{{ $moment(folder.updated_at).format('Do MMM, YYYY') }}</label>
      </div>
    </div>
    <div class="size tb-column flex12">
      <div class="top-column">
        <label>&dash;</label>
      </div>
    </div>
    <div class="categary-action tb-column flex15">
      <div class="top-column">
        <div class="categary-actions">
          <template v-if="shareMode"> - </template>
          <template v-else>
            <a
              class="share-it action-btn"
              @click="$refs.shareDialog.toggleModel()"
            >
              <img src="~/assets/img/share.svg" alt="" />
            </a>
          </template>
        </div>
      </div>
    </div>
    <client-only>
      <ShareFile ref="shareDialog" :folders="[folder]" type="folder" />
    </client-only>
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
