<template>
  <li>
    <div
      class="categary-name tb-column flex52"
      :class="{ selected, video: isVideo, image: isImage }"
      v-on="{
        ...(isVideo
          ? {
              mouseenter: () =>
                !paused &&
                $suppressError(() => {
                  playingModel = true
                  $refs.video.play()
                }),
              mouseleave: () =>
                !paused &&
                isPlaying &&
                $suppressError(() => {
                  playingModel = false
                  $refs.video.pause()
                }),
            }
          : {}),
      }"
    >
      <div class="media">
        <div class="media-left">
          <div v-if="isVideo" class="categary-image">
            <div :class="{ icons: !videoThumbnail }">
              <img :src="videoThumbnail" />
            </div>
            <!-- <video
              v-show="playingModel"
              ref="video"
              class="thevideo"
              :data-video="file.display_file"
              style="
                width: 100%;
                height: auto;
                object-fit: contain;
                margin: auto;
              "
              playsinline
              muted
              loop
            >
              <source :src="file.display_file" type="video/mp4" />
              Your browser does not support the video tag.
            </video> -->
          </div>
          <div v-else class="categary-image">
            <img
              v-show="!imageLoading"
              :src="previewImage"
              @load="imageLoading = false"
            />
          </div>
        </div>
        <div class="media-body">
          <div class="top-column">
            <nuxt-link
              :is="shareMode ? 'a' : 'nuxt-link'"
              v-tooltip="file.display_file_name"
              :event="selected || shareMode ? '' : 'click'"
              :to="
                shareMode
                  ? ''
                  : {
                      name: 'brand_name-files-id',
                      params: {
                        id: file.id,
                        brand_name: $getBrandName(),
                        came_from_hash: hashParam,
                        folder_name: $route.params.folder_name,
                      },
                    }
              "
            >
              {{ file.display_file_name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="assets tb-column flex15">
      <div class="top-column">
        <span :inner-html.prop="file.file_type || '&dash;'"></span>
      </div>
    </div>
    <div class="update-date tb-column flex15">
      <div class="top-column">
        <label>{{ $moment(file.updated_at).format('Do MMM, YYYY') }}</label>
      </div>
    </div>
    <div class="size tb-column flex10">
      <div class="top-column">
        <label>{{ $toHumanlySize(file.file_size) }}</label>
      </div>
    </div>
    <div class="categary-action tb-column flex8">
      <div class="top-column">
        <div class="categary-actions text-center">
          <a class="action-btn download-link" @click="downloadFile">
            <img src="~/assets/img/download.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
// import { ContentLoader } from 'vue-content-loader'
import fileType from '~/mixins/fileType'

export default {
  // components: { ContentLoader },
  mixins: [fileType],
  props: {
    file: { type: Object, default: () => ({}) },
    selected: { type: Boolean, default: false },
    shareMode: { type: Boolean, default: false },
    hideSelect: { type: Boolean, default: false },
    emitShare: { type: Boolean, default: false },
    mode: { type: String, default: 'row' },
  },
  data() {
    return {
      playingModel: false,
      paused: false,
      videoThumbnail: this.file.preview_image,
      videoThumbnailAdded: false,
      imageLoading: false,
      videoThumbnailFetching: false,
    }
  },
  computed: {
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    isPlaying() {
      if (!this.isVideo) return false

      const video = this.$refs.video
      if (!video) return false

      return (
        (video.currentTime > 0 &&
          !video.paused &&
          !video.ended &&
          video.readyState > 2) ||
        this.playingModel
      )
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
  },
  watch: {
    paused(paused) {
      const video = this.$refs.video
      if (!video) return
      if (paused) video.pause()
      else if (!this.isPlaying) video.play()
    },
  },

  mounted() {
    this.$nextTick(() => {
      // window.$(this.$el).find('[data-toggle="tooltip"]').tooltip()
      this.imageLoading = this.isImage

      if (this.isVideo) {
        this.getThumbnail()

        window
          .$(this.$el)
          .find('[data-fancybox]')
          .fancybox({
            video: {
              tpl:
                `<video class="fancybox-video" data-id="file-${this.file.id}" controlsList="nodownload" controls poster="${this.videoThumbnail}">` +
                '<source src="{{src}}"  />' +
                'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
                '</video>',
              autoStart: true,
            },
            buttons: ['close'],
          })
      } else if (this.isImage)
        window
          .$(this.$el)
          .find('[data-fancybox]')
          .fancybox({
            img: {
              tpl: '<img src="{{src}}"  />',
            },
            buttons: ['close'],
          })
    })
  },
  methods: {
    setPlaytime() {
      setTimeout(() => {
        try {
          window.$(
            `[data-id="file-${this.file.id}"]`
          )[0].currentTime = this.$refs.video.currentTime
        } catch {
          //
        }
      }, 250)
    },
    getThumbnail() {
      if (this.file.thumbnail_file)
        return (this.videoThumbnail = this.file.thumbnail_file)

      this.videoThumbnailAdded = false
      this.videoThumbnailFetching = true

      return this.$store
        .dispatch('getThumbnail', {
          id: this.file.id,
          url: this.file.display_file,
        })
        .then((dataURI) => {
          this.videoThumbnail = dataURI || this.previewImage
          this.videoThumbnailAdded = true
        })
        .catch(() => (this.videoThumbnail = this.previewImage))
        .finally(() => (this.videoThumbnailFetching = false))
    },
    downloadFile() {
      this.$store.dispatch('downloadIndicator/downloadFile', {
        id: this.file.id,
        url: this.__url,
        name: this.file.display_file_name,
        callCountApi: !this.shareMode,
        useModernDownload: true,
      })
    },
  },
}
</script>
