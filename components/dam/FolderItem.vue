<template>
  <li class="folder-list">
    <div class="rename-text">
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
      <div v-if="!selectionMode && !multiple" class="dropdown more-options">
        <button type="button" class="dropdown-toggle" data-toggle="dropdown">
          <img src="~/assets/img/menu-option.svg" alt="" />
        </button>
        <ul class="dropdown-menu">
          <li>
            <a
              class="dropdown-item"
              data-toggle="modal"
              data-target="#sharePopup"
              @click.capture.stop="selectFromPanel(folder, 'share')"
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
              @click.capture.stop="selectFromPanel(folder, 'download')"
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
    </div>

    <ShareFile ref="shareDialog" :folders="[folder]" type="folder" />
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
  methods: {
    // dropdown feature for left panel
    selectFromPanel(folder, type) {
      this.dropDown()
      if (type === 'share') {
        this.$nextTick(() => this.$refs.shareDialog.toggleModel())
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
