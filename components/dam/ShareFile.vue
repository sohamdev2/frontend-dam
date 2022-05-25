<template>
  <Model v-model="active">
    <div class="modal-header">
      <h5 v-if="!shareUrl" class="modal-title">
        Share selected {{ resourceType }}
      </h5>
      <h5 v-if="shareUrl" class="modal-title">Create Share Link</h5>
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
        <!--        <p>Share Link</p>-->
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
              class="btn btn-big"
              :class="{ copied, 'dam-btn-outline': !copied }"
              :disabled="copied"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>
      </template>
      <template v-else class="search-folder mb-0">
        <!--        <p>Create Share Link</p>-->
        <div class="share-wrapper">
          <div
            v-for="folder in folders"
            :key="folder.id"
            class="share-box d-flex align-items-center"
          >
            <FolderIcon />
            <div class="share-name flex-80 pl-2">
              <label v-tooltip="folder.folder_name || folder.category_name">
                {{
                  (folder.folder_name || folder.category_name)
                    | shrinkString(46, 12)
                }}
              </label>
            </div>
            <svg
              v-if="folder.is_public === 1"
              id="_x31__x2C_5"
              v-tooltip="
                `Folder contains some private assets and will not be shared`
              "
              class="locked-icon h-orange"
              title=""
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <path
                class="fill-color"
                d="M400,512H112c-26.5,0-48-21.5-48-48V240c0-26.5,21.5-48,48-48h288c26.5,0,48,21.5,48,48v224C448,490.5,426.5,512,400,512zM112,224c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16h288c8.8,0,16-7.2,16-16V240c0-8.8-7.2-16-16-16H112z"
              ></path>
              <path
                class="fill-color"
                d="M368,224c-8.8,0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96,43.1-96,96v80c0,8.8-7.2,16-16,16s-16-7.2-16-16v-80C128,57.4,185.4,0,256,0s128,57.4,128,128v80C384,216.8,376.8,224,368,224z"
              ></path>
              <path
                class="fill-color"
                d="M256,362.7c-23.5,0-42.7-19.1-42.7-42.7c0-23.5,19.1-42.7,42.7-42.7s42.7,19.1,42.7,42.7C298.7,343.5,279.5,362.7,256,362.7z M256,309.3c-5.9,0-10.7,4.8-10.7,10.7s4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7S261.9,309.3,256,309.3z"
              ></path>
              <path
                class="fill-color"
                d="M256,426.7c-8.8,0-16-7.2-16-16V352c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v58.7C272,419.5,264.8,426.7,256,426.7z"
              ></path>
            </svg>
          </div>
          <SharePreviewItem
            v-for="file in files"
            :key="file.id"
            :file="file"
            :collection="collection"
          />
        </div>
        <div
          v-if="isPrivate.length && !shareMessage && !collection"
          class="notes"
        >
          <p>
            <strong>Note : </strong
            ><span
              v-if="
                isPrivate.length > 1 &&
                files.length > 1 &&
                isPrivate.length === files.length
              "
              >All the assets that you have selected are private assets, which
              are available for internal use only.</span
            >
            <span
              v-else-if="
                isPrivate.length > 1 ||
                (isPrivate.length === 1 && files.length > 1)
              "
              >Some of the assets that you have selected are private assets,
              which are available for internal use only.</span
            >
            <span v-else-if="isPrivate.length === 1 && files.length === 1"
              >Selected asset is a private asset, which is available for
              internal use only.
            </span>
          </p>
        </div>
        <div
          v-if="isFolderPrivate.length && !shareMessage && !collection"
          class="notes"
        >
          <p>
            <strong>Note : </strong>
            <span
              v-if="
                isFolderPrivate.length > 1 &&
                folders.length > 1 &&
                isFolderPrivate.length === folders.length
              "
              >All the selected folder contains private assets, which are
              available for internal use only.</span
            >
            <span
              v-else-if="
                isFolderPrivate.length > 1 ||
                (isFolderPrivate.length === 1 && folders.length > 1)
              "
              >Some of the folders that you have selected contains private
              assets, which are available for internal use only.</span
            >
            <span
              v-else-if="isFolderPrivate.length === 1 && folders.length === 1"
              >Selected folder contains private assets, which are available for
              internal use only.</span
            >
          </p>
        </div>
        <div v-if="shareMessage" class="notes">
          <p>
            <strong>Note : </strong>Selection contains private assets, which are
            available for internal use only.
          </p>
        </div>
        <div v-if="collection && isPrivate.length" class="notes">
          <p>
            <strong>Note : </strong>Collection contains private assets, which
            are available for internal use only.
          </p>
        </div>
      </template>
    </div>
    <div v-if="!shareUrl" class="modal-footer">
      <button
        :key="creating"
        type="button"
        class="btn"
        :class="{ 'btn-disabled': !creating }"
        :disabled="creating"
        @click="
          collection || collectionAssets
            ? createCollectionUrl()
            : createShareUrl()
        "
      >
        {{ creating ? 'Creating...' : 'Create link' }}
      </button>
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
    collection: { type: Boolean, default: false },
    collectionAssets: { type: Boolean, default: false },
    collectionAssetsId: { type: Number, default: null },
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
    resourceType() {
      return this.files?.length && this.folders?.length
        ? 'assets'
        : this.files?.length
        ? this.files.length === 1
          ? 'file'
          : 'files'
        : this.folders.length === 1
        ? 'folder'
        : 'folders'
    },
    shareMessage() {
      return this.isFolderPrivate.length >= 1 && this.isPrivate.length >= 1
    },
    isFolderPrivate() {
      let privateAssets = null
      privateAssets = this.folders.filter((item) => {
        return item.is_public === 1
      })
      return privateAssets
    },
    isPrivate() {
      let privateAssets = null
      privateAssets = this.files.filter((item) => {
        return item.is_public === 0
      })
      return privateAssets
    },
    totalFilesFoldersCount() {
      return this.files.length + this.folders.length
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
    async createCollectionUrl() {
      this.creating = true
      await this.$axios
        .$post(`/digital/collection/generate-share-url`, {
          workspace_id: this.$getWorkspaceId(),
          id: this.collectionAssets
            ? this.collectionAssetsId
            : this.files[0].id,
          assets: this.collectionAssets ? this.files.map(({ id }) => id) : [],
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
