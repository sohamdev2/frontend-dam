<template>
  <li ref="autoScroll" :class="{ expanded: hasSubFolder, open: folderOpen }">
    <div
      class="liOptions"
      :class="{
        active: folder.id === parseInt($route.hash.substring(1)),
      }"
    >
      <component
        :is="props.is"
        v-bind="props"
        :class="{
          active: folder.id == selection,
          disabled: !multiple && _disabled,
          'has-child': hasSubFolder,
        }"
        v-on="listeners"
      >
        {{ folder.folder_name || folder.category_name }}
      </component>
      <div
        v-if="!selectionMode && !multiple"
        class="dropdown more-options"
        :class="{ show: dropDownList }"
      >
        <button
          type="button"
          class="dropdown-toggle"
          data-toggle="dropdown"
          @click.stop="dropDown()"
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
              @click.capture.stop="selectFromPanel(folder, 'share')"
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
              @click.capture.stop="selectFromPanel(folder, 'download')"
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
                  </g></svg></span
              >Download</a
            >
          </li>
        </ul>
      </div>
    </div>
    <span
      v-if="hasSubFolder"
      class="menu-expand"
      @click.capture.stop="leftMenuUpdate(folder.id)"
    >
      <!--      <i class="fa fa-angle-right" aria-hidden="true"></i>-->
    </span>
    <transition-group
      v-show="folderOpen"
      name="slide-up"
      tag="ul"
      class="sub-menu"
      :class="{ submenu: folderOpen }"
    >
      <FolderItem
        v-for="_folder in childFolders"
        :key="_folder.id"
        :folder="_folder"
        :parents="parents.slice(1)"
      />
    </transition-group>
    <!-- <template v-if="hasSubFolder">
      <i
        v-if="hasSubFolder"
        class="menu-expand"
        @click="expanded = !expanded"
      ></i>
      <transition-group class="sub-menu" name="slide-up" tag="ul">
        <div v-if="loading" key="loader" class="text-center">
          <SpinLoading />
        </div>
        <FolderItem
          v-for="(subFolder, i) in sortedFolders"
          :key="subFolder.id"
          :style="{ transitionDelay: `${(i % 12) * 50}ms` }"
          :folder="subFolder"
        />
      </transition-group>
    </template> -->
    <!-- </div> -->

    <ShareFile ref="shareDialog" :folders="[shareAble]" type="folder" />
  </li>
</template>

<script>
import ShareFile from '~/components/dam/ShareFile'

export default {
  name: 'FolderItem',
  components: {
    ShareFile,
  },
  props: {
    folder: { type: Object, required: true },
    selectionMode: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    selection: { type: [String, Number], default: null },
    routeFolder: { type: [String, Number], default: null },
    disabled: { type: Boolean, default: null },
    multipleSelection: { type: Array, default: () => [] },
    parents: { type: Array, default: () => [] },
  },
  data() {
    return {
      dropDownList: false,
      shareAble: [],
      childFolders: [],
      folderOpen: false,
    }
  },
  computed: {
    _disabled() {
      return !this.multiple && this.disabled
    },
    hasSubFolder() {
      return this.folder.sub_category_count
    },
    checked() {
      return !!this.multipleSelection.find((el) => el === this.folder.id)
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
    props() {
      const props = {
        is: this.selectionMode || this.multiple ? 'a' : 'nuxt-link',
      }

      if (!this.selectionMode && !this.multiple)
        props.to = {
          name: 'brand_name-folders',
          params: { brand_name: this.$getBrandName() },
          hash: `#${this.folder.id}`,
        }

      return props
    },
    listeners() {
      const listeners = { ...this.$listeners }

      if (this.selectionMode)
        listeners.click = function (ev) {
          if (this.hasSubFolder) this.$emit('click', ev)
          if (this.disabled) return

          this.$emit(
            'update:selection',
            this.hasSubFolder
              ? this.folder.id
              : this.folder.id === this.selection
              ? null
              : this.folder.id // toggle selection
          )
          this.$emit('click', ev)
        }.bind(this)
      else if (this.multiple) {
        listeners.click = function (ev) {
          if (!this.hasSubFolder) this.$refs.checkbox.click()

          this.$emit('click', ev)
        }.bind(this)
      }

      return listeners
    },
  },
  watch: {
    parents: {
      deep: true,
      immediate: true,
      handler() {
        if (this.parents.includes(this.folder.id)) {
          this.leftMenuUpdate(this.folder.id)
        }
      },
    },
  },
  mounted() {
    this.$bus.$on('closeDropDown', () => {
      if (this.dropDownList === true) {
        this.dropDownList = false
      }
    })
    this.$nextTick(() => {
      if (this.folder.id === parseInt(this.$route.hash.substring(1))) {
        this.$refs.autoScroll.scrollIntoView()
      }
    })
  },
  methods: {
    leftMenuUpdate(folderId) {
      if (!this.childFolders.length) {
        this.$axios
          .$post('digital/view-category', {
            workspace_id: this.$getWorkspaceId(),
            category_id: folderId,
          })
          .then(({ data }) => {
            // makeFolders(data.sub_category_data, data)
            if (data.sub_category_data.length) {
              this.childFolders = data.sub_category_data
              this.folderOpen = true
            }
          })
      }
      if (this.folderOpen) {
        this.folderOpen = false
      } else if (this.childFolders.length) {
        this.folderOpen = true
      }
    },
    // dropdown feature for left panel
    selectFromPanel(folder, type) {
      this.dropDown()
      if (type === 'share') {
        const folderId = this.folder.id
        this.$axios
          .$post(`digital/check-private-assets`, {
            workspace_id: this.$getWorkspaceId(),
            category_ids: [folderId],
          })
          .then(({ data }) => {
            this.shareAble = this.folder
            for (const key in data) {
              if (this.shareAble.id === parseInt(key)) {
                this.shareAble.is_public = data[key]
              }
            }
            this.$nextTick(() => {
              this.$refs.shareDialog.toggleModel()
            })
          })
      } else if (type === 'download') {
        this.downloadFile()
      }
    },
    // display of dropdown menu
    dropDown() {
      this.dropDownList = !this.dropDownList
    },
    // download single folder
    downloadFile() {
      this.$store.dispatch('downloadIndicator/downloadMultipleFiles', {
        folders: [this.folder.id],
      })
    },
  },
}
</script>

<style scoped>
.dropdown-menu.show {
  will-change: transform;
  position: absolute;
  transform: translate3d(-94px, 35px, 0px);
  top: 0px;
  left: 0px;
}
.submenu {
  display: block !important;
}
</style>
