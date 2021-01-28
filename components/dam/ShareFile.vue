<template>
  <Model v-model="active" inner-class="share-popup">
    <div class="modal-body">
      <button
        type="button"
        class="close"
        style="top: 1rem; right: 1rem"
        @click="active = false"
      >
        <img
          aria-hidden="true"
          src="~/assets/img/icon/close-icon.svg"
          alt="close image"
        />
      </button>
      <div class="subfolder-list sidebar fix-height">
        <div class="add-folder">
          <h4>Share selected files</h4>
          <div v-if="shareUrl" class="search-folder mb-0">
            <template>
              <h4>Share Link</h4>
              <div class="mt-3 align-items-center" style="display: flex">
                <div style="flex: 1; padding-right: 1rem">
                  <input
                    type="text"
                    :value="shareUrl"
                    class="form-control m-0"
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
                    class="btn copy-button"
                    :class="{ copied, 'dam-btn-outline': !copied }"
                    :disabled="copied"
                  >
                    {{ copied ? 'Copied!' : 'Copy' }}
                  </button>
                </div>
              </div>
            </template>
          </div>
          <div v-else class="search-folder mb-0">
            <h4>Create Share Link</h4>
            <ul class="ml-4 mt-3 dam-share-file-list">
              <li v-for="folder in folders" :key="folder.id">
                <FolderIcon style="filter: brightness(0.5)" />
                {{ folder.folder_name || folder.category_name }}
              </li>
              <SharePreviewItem
                v-for="file in files"
                :key="file.id"
                :file="file"
              />
            </ul>
            <hr />
            <div class="d-flex justify-content-end">
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
          </div>
        </div>
      </div>
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
        .$post('/digital/get-share-url', {
          workspace_id: this.$getWorkspaceId(),
          assets: this.files.map(({ id }) => id),
          category: this.folders.map(({ id }) => id),
        })
        .then(({ data }) => {
          // eslint-disable-next-line prefer-const
          let [type, status] = data.share_url.split('?').pop().split('&')
          type = type.replace('type=', '')
          this.shareUrl =
            window.location.origin + '/assets/' + type + '?' + status
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.creating = false
    },
  },
}
</script>

<style>
.dam-share-file-list {
  max-height: 50vh;
  height: 100%;
  overflow: auto;
}
.dam-share-file-list li {
  display: flex;
  align-items: center;
}

.dam-share-file-list li > img,
.dam-share-file-list li > svg {
  height: 18px;
  width: 18px;
  margin-right: 0.5rem;
  object-fit: contain;
}
.copy-button {
  transition: 250ms ease-in-out;
  background-color: #0000 !important;
}
.copy-button.copied {
  background-color: #ed703d !important;
  color: white !important;
}
</style>
