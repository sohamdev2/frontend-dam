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
    __image_thumb() {
      return this.file && this.file.thumbnail_file
    },
    __compressed_preview() {
      return this.file && this.file.compress_file
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
    isTxt() {
      return this.$isTxt(this.__file_ext)
    },
    isDoc() {
      return this.$isDoc(this.__file_ext)
    },
    isAudio() {
      return this.$isAudio(this.__file_ext)
    },
    isHtml() {
      return this.$isHtml(this.__file_ext)
    },
    previewImage() {
      if (this.$route.name.search('files') > 0) {
        return this.getDetailIcon()
      } else {
        return this.getPreviewIcon()
      }
    },
  },
  methods: {
    getPreviewIcon(
      ext = this.__file_ext,
      thumb = this.__thumb,
      imageThumb = this.__image_thumb,
      compressedImage = this.__compressed_preview,
      url = this.__url
    ) {
      if (!ext) return GENERAL_ICON

      if (this.$isPdf(ext)) {
        return imageThumb || compressedImage || thumb
      } else if (this.$isAudio(ext))
        return require('@/assets/img/icon/file/audio.svg')
      else if (this.$isImage(ext)) return imageThumb || compressedImage || thumb
      else if (this.isDoc) {
        return imageThumb || compressedImage || thumb
      } else if (this.isHtml) return imageThumb || compressedImage || thumb
      else
        try {
          return require(`@/assets/img/icon/file/${ext}.svg`)
        } catch {
          return thumb || GENERAL_ICON
        }
    },
    getDetailIcon(
      ext = this.__file_ext,
      thumb = this.__thumb,
      imageThumb = this.__image_thumb,
      compressedImage = this.__compressed_preview,
      url = this.__url
    ) {
      if (!ext) return GENERAL_ICON

      if (this.$isPdf(ext)) {
        return compressedImage || imageThumb || thumb
      } else if (this.$isAudio(ext))
        return require('@/assets/img/icon/file/audio.svg')
      else if (this.$isImage(ext)) {
        if (this.file.file_type === 'gif') {
          return url
        } else {
          return compressedImage || imageThumb || thumb
        }
      } else if (this.isDoc) {
        return compressedImage || imageThumb || thumb
      } else if (this.isHtml) return compressedImage || imageThumb || thumb
      else
        try {
          return require(`@/assets/img/icon/file/${ext}.svg`)
        } catch {
          return thumb || GENERAL_ICON
        }
    },
  },
}
