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
          <span>
            <img src="~/assets/img/folder-icon.svg" alt="Folder Icon" />
            <b v-if="assetsCount">
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
            <b v-else>Empty Folder</b>
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
                  <img src="~/assets/img/menu-option.svg" alt="" />
                </button>
                <ul class="dropdown-menu" :class="{ show: dropDownList }">
                  <li>
                    <a
                      class="dropdown-item"
                      data-toggle="modal"
                      data-target="#sharePopup"
                      @click.capture.stop="selectFromDrop(folder, 'share')"
                      ><span class="dropdown-item-icon"
                        ><img
                          src="~/assets/img/share.svg"
                          alt=""
                          class="img-responsive" /></span
                      >Share</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      @click.capture.stop="selectFromDrop(folder, 'download')"
                      ><span class="dropdown-item-icon"
                        ><img
                          src="~/assets/img/download.svg"
                          alt=""
                          class="img-responsive" /></span
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
        <div class="categary-actions">
          <template v-if="shareMode"> - </template>
          <template v-else>
            <a
              class="share-it action-btn"
              @click="$refs.shareDialog.toggleModel()"
            >
              <img src="~/assets/img/share.svg" alt="" />
            </a>
            <a @click="downloadFile">
              <img src="~/assets/img/download.svg" alt="" />
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
  methods: {
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
