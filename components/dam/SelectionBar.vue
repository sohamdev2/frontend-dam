<template>
  <div>
    <transition name="slide-up">
      <div v-if="!!count" class="select-bar" style="display: flex">
        <div v-if="deleting" class="select-left"></div>
        <div v-else class="select-left">
          <div class="select-all">
            <span>Select</span>
            <div class="custom-radio" @click="$emit('click:select-all')">
              <input
                type="radio"
                name="selectAll"
                spellcheck="false"
                :checked="selectedAll"
              />
              <label>All</label>
            </div>
            <div class="custom-radio" @click="$emit('click:select-none')">
              <input type="radio" name="selectAll" spellcheck="false" />
              <label>None</label>
            </div>
          </div>
          <span class="select-counter">{{ count }} selected</span>
        </div>
        <div class="select-center"></div>
        <div class="select-right">
          <ul>
            <li>
              <a @click="$refs.shareDialog.toggleModel()">
                Share
                <img src="@/assets/img/icon/select-share.svg" alt="share" />
              </a>
            </li>
            <li>
              <a @click="downloadSelectedFile">
                Download
                <img
                  src="@/assets/img/icon/select-download.svg"
                  alt="download"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <ShareFile
      ref="shareDialog"
      :files="[...selectedFiles]"
      :folders="[...selectedFolders]"
      type="folder"
    ></ShareFile>
  </div>
</template>

<script>
export default {
  props: {
    selectedFiles: { type: Array, default: () => [] },
    selectedFolders: { type: Array, default: () => [] },
    selectedAll: { type: Boolean, default: false },
  },
  computed: {
    count() {
      return this.selectedFiles.length + this.selectedFolders.length
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
    downloadSelectedFile() {
      if (this.selectedFiles.length === 1 && !this.selectedFolders.length) {
        const [file] = this.selectedFiles
        this.$store.dispatch('downloadIndicator/downloadFile', {
          id: file.id,
          url: file.display_file,
          name: file.display_file_name,
        })
      } else {
        this.$store.dispatch('downloadIndicator/downloadMultipleFiles', {
          files: this.selectedFiles.map(({ id }) => id),
          folders: this.selectedFolders.map(({ id }) => id),
        })
      }
    },
  },
}
</script>
