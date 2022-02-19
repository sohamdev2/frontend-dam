<template>
  <li :class="{ selected }">
    <div class="selectbox tb-column flex3">
      <div class="top-column">
        <label class="check-label">
          <input
            type="checkbox"
            :checked="selected"
            @input="$emit('click:selected', folder)"
          />
          <span class="check-span"></span>
        </label>
      </div>
    </div>
    <div class="categary-name tb-column flex49">
      <div class="media">
        <div class="media-left">
          <div class="categary-image">
            <a class="img-link" @click="$emit('nextStack', folder.id)">
              <span>
                <img
                  :src="
                    require(assetsCount
                      ? '~/assets/img/folder-icon.svg'
                      : '~/assets/img/folder-icon2.svg')
                  "
                  alt="Folder Icon"
                />
              </span>
            </a>
          </div>
        </div>
        <div class="media-body">
          <div class="top-column">
            <a
              v-tooltip="{
                html: false,
                content: folder.folder_name || folder.category_name,
              }"
              :style="selected ? { cursor: 'default' } : {}"
              @click="$emit('nextStack', folder.id)"
              >{{ folder.folder_name || folder.category_name }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="assets tb-column flex15">
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
    <div class="update-date tb-column flex15">
      <div class="top-column">
        <label style="font-size: 13px">{{
          $moment(folder.updated_at).format('Do MMM, YYYY')
        }}</label>
      </div>
    </div>
    <div class="size tb-column flex10">
      <div class="top-column">
        <label style="font-size: 13px">&dash;</label>
      </div>
    </div>
    <div class="categary-action tb-column flex8">
      <div class="top-column">
        <div class="categary-actions text-right">
          <a href="javascript:void(0);" @click="downloadSharedFile">
            <svg
              id="Layer_1"
              class="download-icon h-orange"
              data-toggle="tooltip"
              title=""
              data-original-title="Download"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4359" transform="translate(-153.745 -317.549)">
                <path
                  id="Path_3427"
                  class="fill-color"
                  d="M156.4,335.5c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H156.4z"
                ></path>
                <path
                  id="Path_3428"
                  class="fill-color"
                  d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                ></path>
                <path
                  id="Path_3429"
                  class="fill-color"
                  d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                ></path>
              </g>
            </svg>
          </a>
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
    shareId: { type: Number, default: 0 },
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
  methods: {
    downloadSharedFile() {
      this.$store.dispatch('downloadIndicator/downloadMultipleSharedFiles', {
        files: [],
        folders: [this.folder.id],
        shareId: this.shareId,
        shareWorkspaceId: this.shareWorkspaceId,
      })
    },
  },
}
</script>
