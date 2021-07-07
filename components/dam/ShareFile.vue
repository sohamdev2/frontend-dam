<template>
  <Model v-model="active">
    <div class="modal-header">
      <h5 class="modal-title">Share selected files</h5>
      <button type="button" class="close" @click="active = false">
        <span aria-hidden="true"
          ><svg
            id="Layer_1"
            class="close-icon h-red"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4358" transform="translate(-69.745 -317.549)">
              <path
                id="Path_3424"
                class="fill-color"
                d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
              />
              <path
                id="Path_3425"
                class="fill-color"
                d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
              />
            </g></svg
        ></span>
      </button>
    </div>
    <div class="modal-body">
      <template v-if="shareUrl">
        <p>Share Link</p>
        <div class="mt-3 align-items-center" style="display: flex">
          <div style="flex: 1; padding-right: 1rem">
            <input
              type="text"
              :value="shareUrl"
              class="form-control"
              spellcheck="false"
              readonly
              onClick="this.setSelectionRange(0, this.value.length)"
            />
          </div>
          <div>
            <button
              v-clipboard="shareUrl"
              v-clipboard:success="() => (copied = true)"
              v-clipboard:error="() => $toast.global.error('Copy failed')"
              type="button"
              class="btn"
              :class="{ copied, 'dam-btn-outline': !copied }"
              :disabled="copied"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>
      </template>
      <template v-else class="search-folder mb-0">
        <p>Create Share Link</p>
        <div class="share-wrapper">
          <div
            v-for="folder in folders"
            :key="folder.id"
            class="share-box d-flex align-items-center"
          >
            <FolderIcon style="filter: brightness(0.5)" />
            <div class="share-name flex-80 pl-2">
              <label v-tooltip="folder.folder_name || folder.category_name">
                {{
                  (folder.folder_name || folder.category_name)
                    | shrinkString(46, 12)
                }}
              </label>
            </div>
          </div>
          <SharePreviewItem v-for="file in files" :key="file.id" :file="file" />
        </div>
        <div v-if="isPrivate.length" class="notes">
          <p>
            <strong>Note : </strong>Some of the assets you have selected are
            private assets, which are available for internal use only.
          </p>
        </div>

        <div class="modal-footer justify-content-end p-0 pt-3">
          <button
            type="button"
            class="btn"
            :class="{ 'btn-disabled': !creating }"
            :disabled="creating"
            @click="createShareUrl"
          >
            {{ creating ? 'Creating...' : 'Create link' }}
          </button>
        </div>
      </template>
    </div>
  </Model>
</template>

<script>
import Model from '@/components/widgets/Model'

export default {
  components: { Model },
  extends: Model,
  props: {
    files: { type: Array, default: () => [] },
    folders: { type: Array, default: () => [] },
    type: { type: String, required: true, default: 'file' },
  },
  data() {
    return {
      copied: false,
      shareUrl: null,
      creating: false,
    }
  },
  computed: {
    // fileUrls() {
    //   return (
    //     process.client &&
    //     this.files.map(({ share_url, display_file }) => {
    //       if (!share_url) return display_file;
    //       let [type, status] = share_url
    //         .split("?")
    //         .pop()
    //         .split("&");
    //       type = type.replace("type=", "");
    //       return window.location.origin + "/assets/" + type + "?" + status;
    //     })
    //   );
    // },
    isPrivate() {
      let privateAssets = null
      privateAssets = this.files.filter((item) => {
        return item.is_public === 0
      })
      console.log(privateAssets)
      return privateAssets
    },
  },
  watch: {
    files() {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    folders() {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    copied(copied) {
      if (copied)
        this.copyBtnResetTimer = setTimeout(() => (this.copied = false), 1500)
    },
  },
  destroyed() {
    if (this.copyBtnResetTimer) clearTimeout(this.copyBtnResetTimer)
  },
  methods: {
    async createShareUrl() {
      this.creating = true
      await this.$axios
        .$post('/digital/generate-share-assets-url', {
          workspace_id: this.$getWorkspaceId(),
          assets: this.files.map(({ id }) => id),
          category: this.folders.map(({ id }) => id),
        })
        .then(({ data }) => {
          // eslint-disable-next-line prefer-const
          let [type, status] = data.share_url.split('?').pop().split('&')
          type = type.replace('type=', '')
          this.shareUrl =
            window.location.origin + '/shared-assets/' + type + '?' + status
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.creating = false
    },
  },
}
</script>
