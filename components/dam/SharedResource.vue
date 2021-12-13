<template>
  <li>
    <div
      class="preview-img tb-column flex10"
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
      </div>
    </div>
    <div class="categary-name tb-column flex27">
      <div class="media">
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
                        folder: $route.params.folder_name,
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
    <div class="assets tb-column flex18">
      <div class="top-column">
        <span :inner-html.prop="file.file_type || '&dash;'"></span>
      </div>
    </div>
    <div class="update-date tb-column flex18">
      <div class="top-column">
        <label>{{ $moment(file.updated_at).format('Do MMM, YYYY') }}</label>
      </div>
    </div>
    <div class="size tb-column flex12">
      <div class="top-column">
        <label>{{ $toHumanlySize(file.file_size) }}</label>
      </div>
    </div>
    <div class="categary-action tb-column flex15">
      <div class="top-column">
        <div class="categary-actions text-right">
          <a class="action-btn download-link" @click="downloadFile">
            <svg
              id="Layer_1"
              class="download-icon h-orange"
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
    shareId: { type: Number, default: 0 },
    shareWorkspaceId: { type: String, required: true },
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
    this.loadJS()
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
  updated() {
    this.loadJS()
  },
  methods: {
    loadJS() {
      window.$('[data-toggle="tooltip"]').tooltip()
    },
    setPlaytime() {
      setTimeout(() => {
        try {
          window.$(`[data-id="file-${this.file.id}"]`)[0].currentTime =
            this.$refs.video.currentTime
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
      if (this.$route.name.includes('shared-assets')) {
        this.$axios
          .$post(`share-link-download`, {
            workspace_id: this.shareWorkspaceId,
            id: this.shareId,
          })
          .catch(this.$errorToast)
      }
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
