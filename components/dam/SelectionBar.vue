<template>
  <div>
    <transition name="slide-up">
      <div v-if="!!count" class="select-bar">
        <div class="select-left">
          <div class="select-all">
            <span>Select All</span>
            <label class="check-label">
              <input
                type="checkbox"
                name=""
                :checked="selectedAll"
                @click="
                  $event.target.checked
                    ? $emit('click:select-all')
                    : $emit('click:select-none')
                "
              />
              <span class="check-span"></span>
            </label>
            <a href="javascript:;" @click="$emit('click:select-none')"
              >Remove selection</a
            >
          </div>
          <span class="select-counter"
            ><span>{{ count }}</span> selected</span
          >
        </div>

        <div class="select-center"></div>
        <div class="select-right">
          <ul>
            <li>
              <a href="javascript:void(0);" @click="showShare">
                Share
                <svg
                  id="Layer_1"
                  class="share-icon white"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4473" transform="translate(-871 -230)">
                    <rect
                      id="Rectangle_3012"
                      x="871"
                      y="230"
                      class="fill-hide"
                      width="18"
                      height="18"
                    ></rect>
                    <path
                      id="Icon_open-share"
                      class="fill-color"
                      d="M883.9,234.4l3.2,3.1l-3.2,3.4v-2.3h-3.8c-2.1,0-4.3,0.5-6.1,1.6c1.4-2,3.9-3.2,8.4-3.2h1.5L883.9,234.4 M883.1,231.8c-0.4,0-0.7,0.3-0.7,0.7c0,0,0,0,0,0v3c-8.8,0-11.2,4.3-11.4,10.6c0,0.1,0,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1c1.4-4,4.6-6,8.9-6h2.3v2.9c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.2l5.2-5.5c0.3-0.3,0.2-0.7,0-1c0,0,0,0,0,0l-5.2-4.9C883.4,231.9,883.3,231.8,883.1,231.8L883.1,231.8z"
                    ></path>
                  </g>
                </svg>
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" @click="downloadSelectedFile">
                Download
                <svg
                  id="Layer_1"
                  class="download-icon white"
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
            </li>
          </ul>
        </div>
        <a
          href="javascript:void(0);"
          class="select-bar-close"
          @click="$emit('click:select-none')"
        >
          <svg focusable="false" viewBox="0 0 32 32">
            <path
              d="M18.1,16L27,7.1c0.6-0.6,0.6-1.5,0-2.1s-1.5-0.6-2.1,0L16,13.9l-8.9-9C6.5,4.3,5.6,4.3,5,4.9S4.4,6.4,5,7l8.9,8.9L5,24.8c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l8.9-8.9l8.9,8.9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L18.1,16z"
            ></path>
          </svg>
        </a>
      </div>
    </transition>
    <client-only>
      <ShareFile
        v-if="currentRoute == 'brand_name-collection-id'"
        ref="shareDialog"
        :files="[...selectedFiles]"
        :folders="[...shareAble]"
        collection-assets
        :collection-assets-id="$route.params.id"
        type="folder"
      />
      <ShareFile
        v-if="currentRoute != 'brand_name-collection-id'"
        ref="shareDialog"
        :files="[...selectedFiles]"
        :folders="[...shareAble]"
        type="folder"
      />
    </client-only>
  </div>
</template>

<script>
import ShareFile from '~/components/dam/ShareFile'
export default {
  components: {
    ShareFile,
  },
  props: {
    selectedFiles: { type: Array, default: () => [] },
    selectedFolders: { type: Array, default: () => [] },
    selectedAll: { type: Boolean, default: false },
  },
  data() {
    return {
      shareAble: [],
    }
  },
  computed: {
    count() {
      return this.selectedFiles.length + this.selectedFolders.length
    },
    currentRoute() {
      return this.$route.name
    },
  },
  watch: {
    count(a) {
      if (a) window.$('body').addClass('selectBaractive')
      else window.$('body').removeClass('selectBaractive')
    },
  },
  destroyed() {
    window.$('body').removeClass('selectBaractive')
  },
  methods: {
    showShare() {
      if (this.selectedFolders.length) {
        const folderIds = this.selectedFolders.map(({ id }) => id)

        this.$axios
          .$post(`digital/check-private-assets`, {
            workspace_id: this.$getWorkspaceId(),
            category_ids: folderIds,
          })
          .then(({ data }) => {
            this.shareAble = [...this.selectedFolders]

            for (const key in data) {
              for (const folder of this.shareAble) {
                if (folder.id === parseInt(key)) {
                  folder.is_public = data[key]
                }
              }
            }
            this.$nextTick(() => {
              this.$refs.shareDialog.toggleModel()
            })
          })
      } else {
        this.shareAble = [...this.selectedFolders]
        this.$nextTick(() => this.$refs.shareDialog.toggleModel())
      }
    },
    downloadSelectedFile() {
      let collectionsId = null
      if (this.$route.name === 'brand_name-collection-id') {
        collectionsId = this.$route.params.id
      }
      if (this.selectedFiles.length === 1 && !this.selectedFolders.length) {
        const [file] = this.selectedFiles
        this.$store.dispatch('downloadIndicator/downloadFile', {
          id: file.id,
          url: file.display_file,
          name: file.display_file_name,
          collection_id: collectionsId,
        })
      } else {
        this.$store.dispatch('downloadIndicator/downloadMultipleFiles', {
          files: this.selectedFiles.map(({ id }) => id),
          folders: this.selectedFolders.map(({ id }) => id),
          collection_id: collectionsId,
        })
      }
    },
  },
}
</script>
