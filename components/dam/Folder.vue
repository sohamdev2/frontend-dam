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
        <nuxt-link
          :is="shareMode ? 'a' : 'nuxt-link'"
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
          class="img-link"
        >
          <span v-if="assetsCount">
            <img src="~/assets/img/folder-icon.svg" alt="Folder Icon" />
            <b>
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
              >
            </b>
          </span>
          <span v-else>
            <img src="~/assets/img/folder-icon2.svg" alt="Folder Icon" />
            <b>Empty Folder</b>
          </span>
        </nuxt-link>
        <div class="video-info">
          <div class="upper-info">
            <div class="d-flex align-items-center">
              <div
                class="dropdown more-options"
                :class="{ show: dropDownList }"
              >
                <button
                  type="button"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <svg
                    id="Layer_1"
                    class="menu-option-icon h-orange"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4482" transform="translate(-872 -801)">
                      <rect
                        id="Rectangle_3020"
                        x="872"
                        y="801"
                        class="fill-hide"
                        width="18"
                        height="18"
                      ></rect>
                      <g id="Group_4348" transform="translate(588.166 653.684)">
                        <circle
                          id="Ellipse_203"
                          class="fill-color"
                          cx="292.8"
                          cy="148.9"
                          r="1.5"
                        ></circle>
                        <circle
                          id="Ellipse_203-2"
                          class="fill-color"
                          cx="292.8"
                          cy="163.8"
                          r="1.5"
                        ></circle>
                        <circle
                          id="Ellipse_203-3"
                          class="fill-color"
                          cx="292.8"
                          cy="156.3"
                          r="1.5"
                        ></circle>
                      </g>
                    </g>
                  </svg>
                </button>
                <ul class="dropdown-menu" :class="{ show: dropDownList }">
                  <li>
                    <a
                      class="dropdown-item"
                      data-toggle="modal"
                      data-target="#sharePopup"
                      @click.capture.stop="selectFromDrop(folder, 'share')"
                      ><span class="dropdown-item-icon"
                        ><svg
                          id="Layer_1"
                          class="share-icon"
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
                          </g></svg></span
                      >Share</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      @click.capture.stop="selectFromDrop(folder, 'download')"
                      ><span class="dropdown-item-icon"
                        ><svg
                          id="Layer_1"
                          class="download-icon"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_4359"
                            transform="translate(-153.745 -317.549)"
                          >
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
                          </g></svg></span
                      >Download</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="categary-name tb-column flex27">
      <div class="top-column">
        <nuxt-link
          :is="shareMode ? 'a' : 'nuxt-link'"
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
          {{ folder.folder_name || folder.category_name }}
        </nuxt-link>
      </div>
    </div>
    <div class="assets tb-column flex18">
      <div class="top-column">
        <label
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
            >
          </template>
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
        <div class="categary-actions text-right">
          <template v-if="shareMode"> - </template>
          <template v-else>
            <a
              class="share-it action-btn"
              @click="$refs.shareDialog.toggleModel()"
            >
              <svg
                id="Layer_1"
                data-original-title="Share Folder"
                class="share-icon h-orange"
                data-toggle="tooltip"
                title=""
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
                aria-describedby="tooltip469646"
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
            <a @click="downloadFile">
              <svg
                id="Layer_1"
                data-original-title="Download Folder"
                class="download-icon h-orange"
                data-toggle="tooltip"
                title=""
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
  data() {
    return {
      dropDownList: false,
    }
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
  mounted() {
    this.loadJS()
  },
  updated() {
    this.loadJS()
  },
  methods: {
    loadJS() {
      window.$('[data-toggle="tooltip"]').tooltip()
    },
    // dropdown feature
    selectFromDrop(folder, type) {
      this.dropDown()
      if (type === 'share') {
        this.$nextTick(() => this.$refs.shareDialog.toggleModel())
      } else if (type === 'download') {
        this.downloadFile()
      }
      this.$emit('selectedDrop', folder, type, 'folder')
    },
    // display of dropdown menu
    dropDown() {
      this.dropDownList = !this.dropDownList
    },
    downloadFile() {
      let selectedFolder = []
      selectedFolder = [this.folder]
      this.$store.dispatch('downloadIndicator/downloadMultipleFiles', {
        folders: selectedFolder.map(({ id }) => id),
      })
    },
  },
}
</script>
