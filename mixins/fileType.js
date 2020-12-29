const GENERAL_ICON = require('@/assets/img/icon/file/general.svg')

export default {
  computed: {
    __file_ext() {
      return this.file && this.file.file_type
    },
    __url() {
      return this.file && this.file.display_file
    },
    __thumb() {
      return this.file && this.file.preview_image
    },
    //
    isPdf() {
      return this.$isPdf(this.__file_ext)
    },
    isImage() {
      return this.$isImage(this.__file_ext)
    },
    isVideo() {
      return this.$isVideo(this.__file_ext)
    },
    isDoc() {
      return this.$isDoc(this.__file_ext)
    },
    isAudio() {
      return this.$isAudio(this.__file_ext)
    },
    previewImage() {
      return this.getPreviewIcon()
    },
  },
  methods: {
    getPreviewIcon(
      ext = this.__file_ext,
      thumb = this.__thumb,
      url = this.__url
    ) {
      if (!ext) return GENERAL_ICON

      if (this.$isPdf(ext))
        return require('@/assets/img/icon/file/pdf-icon-red.svg')
      else if (this.$isAudio(ext))
        return require('@/assets/img/icon/file/audio.svg')
      else if (this.$isImage(ext)) return url
      else
        try {
          return require(`@/assets/img/icon/file/${ext}.svg`)
        } catch {
          return thumb || GENERAL_ICON
        }
    },
  },
}
