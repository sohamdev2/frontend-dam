<template>
  <div class="uploaded-wrapper">
    <div class="uploaded-box">
      <div class="custom-checkbox">
        <input
          type="checkbox"
          class="form-check-input"
          :checked="selected"
          :disabled="disableAllButton"
          hidden
        />
        <label
          @click="!disableAllButton && $emit('click:toggleSelection', file)"
        ></label>
      </div>
      <div class="uploaded-img">
        <div
          class="preview"
          :style="{ backgroundImage: `url('${previewImage}')` }"
        ></div>
      </div>
      <div class="uploaded-detail">
        <div class="editable-box">
          <span class="edit-label">
            {{ fileName }}
          </span>
          <input
            v-model="fileName"
            class="edit-area"
            type="text"
            spellcheck="false"
            style="width: 499px"
            @change="changeFileName"
            @keyup.enter="changeFileName"
          />
        </div>
        <span>
          <strong class="filetype">[{{ file.file_type }}]</strong>
          {{ $toHumanlySize(file.file_size) }}
        </span>
      </div>
      <div v-if="!selected" class="uploaded-action">
        <button
          type="button"
          class="btn bg-light-gray"
          :class="{ 'btn-disable': disableAllButton }"
          :disabled="disableAllButton"
          @click="$refs.moveDialog.toggleModel()"
        >
          Move
        </button>
        <a v-if="isFileBeingDeleted" disabled>
          <SpinLoading />
        </a>
        <a
          v-else
          :disabled="disableAllButton"
          @click="!disableAllButton && $refs.deleteDialog.triggerModel()"
        >
          <img src="@/assets/img/icon/bin-icon.svg" alt="bin icon" />
        </a>
      </div>
      <div v-else-if="multiDeleting" class="uploaded-action">
        <a disabled>
          <SpinLoading />
        </a>
      </div>
    </div>
    <!-- hitali -->
    <!-- <TagsInput
      v-model="tags"
      class="tagsinput"
      :disabled="isFileBeingDeleted"
      @click:addTag="addTagToFile"
      @click:removeTag="removeTagFromFile"
    /> -->

    <DeleteDialog ref="deleteDialog" @click:confirm-button="deleteFile">
      Are you sure you want to delete
      <strong>{{ file.display_file_name }}</strong>
    </DeleteDialog>
    <MoveFolderDialog ref="moveDialog" :files-to-move="[file]" />
  </div>
</template>

<script>
export default {
  props: {
    file: { type: Object, required: true },
    multiDeleting: { type: Boolean, default: false },
    multiMoving: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
  },
  data() {
    return {
      fileName: this.file.display_file_name.replace(
        `.${this.file.file_type}`,
        ''
      ),
      oldName: this.file.display_file_name.replace(
        `.${this.file.file_type}`,
        ''
      ),
      tags: this.file.tags || [],

      // ui
      deleteDialog: false,
      deleting: false,
    }
  },
  computed: {
    isFileBeingDeleted() {
      return this.deleting || (this.multiDeleting && this.selected)
    },
    disableAllButton() {
      return this.multiMoving || this.multiDeleting || this.deleting
    },
    previewImage() {
      const ext = this.file.file_type
      if (!ext) return
      let thumbnail = null

      if (ext === 'pdf')
        thumbnail = require('@/assets/img/icon/file/pdf-icon-red.svg')
      else if (!this.$isImage(ext))
        thumbnail =
          this.file.preview_image ||
          require('@/assets/img/icon/file/general.svg')

      return thumbnail || this.file.display_file
    },
  },
  watch: {
    file: {
      deep: true,
      handler() {
        this.tags = this.file.tags || []
      },
    },
  },
  methods: {
    changeFileName() {
      const fileName = this.fileName

      if (fileName === this.oldName) return

      if (this.changing) {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }

        this.timer = setTimeout(() => this.changeFileName(), 200)
        return
      }

      this.$axios
        .$post('/digital-assets/update-with-field', {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.file.id,
          field_name: 'display_file_name',
          field_value: this.fileName,
        })
        .then(() => (this.oldName = fileName))
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.fileName = this.oldName
        })
        .finally(() => (this.changing = false))
    },
    deleteFile() {
      if (this.disableAllButton) return

      this.deleting = true
      this.$axios
        .$post('digital-assets/delete-file', {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.file.id,
        })
        .then(() =>
          this.$store.dispatch('dam/removeRecentlyUploadedFiles', [
            this.file.id,
          ])
        )
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => (this.deleting = false))
    },
    removeTagFromFile(tag) {
      this.$axios
        .$post('digital-assets/delete-tag', {
          workspace_id: this.$getWorkspaceId(),
          tag_id: tag.id,
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
    addTagToFile(tag) {
      this.$axios
        .$post('digital-assets/add-tag-to-file', {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.file.id,
          tag_name: tag.tag_name,
        })
        .then(({ data }) => {
          this.tags = this.tags.filter(({ id }) => tag.id !== id)
          this.tags.push(data)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
  },
}
</script>

<style>
.uploaded-img > .preview {
  height: 68px !important;
  width: 68px !important;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.editable-box {
  margin-left: -5px;
}
</style>
