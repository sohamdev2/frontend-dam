export default {
  computed: {
    __file_ext() {
      return this.file?.file_type
    },
    __url() {
      return this.file?.display_file
    },
    __thumb() {
      return this.file?.preview_image
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
      const ext = this.__file_ext

      if (!ext) return

      let thumbnail = null

      if (this.isPdf)
        thumbnail = require('@/assets/img/icon/file/pdf-icon-red.svg')
      else if (this.isAudio)
        thumbnail = require('@/assets/img/icon/file/audio.svg')
      else if (!this.isImage)
        thumbnail =
          this.__preview_image || require('@/assets/img/icon/file/general.svg')

      return thumbnail || this.__url
    },
  },
}
