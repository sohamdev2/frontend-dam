<template>
  <div class="dam-res">
    <div class="resource-box folder" :class="{ selected }">
      <div v-if="!shareMode" class="custom-checkbox">
        <input :checked="selected" type="checkbox" class="form-check-input" />
        <label @click="$emit('click:selected', folder)"></label>
      </div>
      <div class="preview-container">
        <div class="preview-images">
          <div class="folder-inside">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="220"
              height="180"
              viewBox="0 0 220 180"
            >
              <path
                data-name="Icon feather-folder"
                d="M223,164.5c0,11.046-9.85,20-22,20H25c-12.15,0-22-8.954-22-20V24.5c0-11.046,9.85-20,22-20H80l22,30h99c12.15,0,22,8.954,22,20Z"
                transform="translate(-3 -4.5)"
                fill="#edf0f5"
              ></path>
            </svg>
            <span v-if="assetsCount">
              {{ assetsCount }} Asset<template v-if="assetsCount > 1"
                >s</template
              >
            </span>
            <span v-else>Empty Folder</span>
          </div>
        </div>
      </div>
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
        class="resource-title"
      >
        <span>{{ folder.folder_name || folder.category_name }}</span>
      </nuxt-link>
      <div class="format-type">
        <span style="text-transform: unset">
          <template v-if="assetsCount"
            >{{ assetsCount }} Asset<template v-if="assetsCount > 1"
              >s</template
            ></template
          >
          <template v-else>Empty Folder</template>
        </span>
      </div>
      <div class="date">
        {{ $moment(folder.updated_at).format('Do MMM, YYYY') }}
      </div>
      <div class="size">&dash;</div>
      <div class="resource-info">
        <template v-if="shareMode"> - </template>
        <template v-else>
          <a
            class="share-it action-btn"
            @click="$refs.shareDialog.toggleModel()"
          >
            <ShareIcon />
          </a>
        </template>
      </div>
    </div>
    <client-only>
      <ShareFile ref="shareDialog" :folders="[folder]" type="folder" />
    </client-only>
  </div>
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
