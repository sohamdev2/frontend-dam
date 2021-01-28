<template>
  <div class="dam-res" :class="`mode-${mode}`">
    <div
      class="resource-box"
      :class="{ selected, video: isVideo || isImage, image: isImage }"
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
      <div v-if="!shareMode && !hideSelect" class="custom-checkbox">
        <input :checked="selected" type="checkbox" class="form-check-input" />
        <label @click="$emit('click:selected', file)"></label>
      </div>
      <div
        class="preview-container"
        @focus="$refs.video.play()"
        @blur="$refs.video.pause()"
      >
        <div v-if="isVideo" class="preview-images">
          <img
            class="preview-images preview/"
            style="object-fit: contain !important"
            :style="{
              padding: `${
                videoThumbnailAdded || mode == 'column' ? 0 : 2
              }rem !important`,
            }"
            :src="videoThumbnail"
          />

          <video
            v-show="playingModel"
            ref="video"
            class="thevideo"
            :data-video="file.display_file"
            playsinline
            muted
            loop
          >
            <source :src="__url" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div v-else class="preview-images" :class="{ 'no-image': !isImage }">
          <div
            class="preview"
            :style="{ backgroundImage: `url('${previewImage}')` }"
          ></div>
        </div>
      </div>

      <nuxt-link
        :event="selected || shareMode ? '' : 'click'"
        :to="{
          name: 'brand_name-files-id',
          params: {
            id: file.id,
            brand_name: $getBrandName(),
            came_from_hash: hashParam,
            folder_name: $route.params.folder_name,
          },
        }"
        class="resource-title"
      >
        <span :title="file.display_file_name">
          <!-- data-toggle="tooltip"
          data-position="bottom" -->
          {{ file.display_file_name }}
        </span>
      </nuxt-link>
      <div class="format-type">
        <span>{{ file.file_type || 'raw' }}</span>
      </div>
      <div class="date">{{ $moment(file.date).format('Do MMM, YYYY') }}</div>
      <div class="size">{{ $toHumanlySize(file.file_size) }}</div>

      <div class="resource-info">
        <a
          v-if="!shareMode"
          class="share-it action-btn"
          @click="
            emitShare ? $emit('share', file) : $refs.shareDialog.toggleModel()
          "
        >
          <ShareIcon />
        </a>

        <template v-if="isVideo">
          <a
            class="expand"
            data-fancybox
            data-width="640"
            data-height="360"
            :data-href="__url"
            :href="__url"
            @click.stop="setPlaytime"
          >
          </a>
          <a class="play-btn" @click="paused = !paused">
            <img
              :src="
                require(paused
                  ? '@/assets/img/icon/play-icon.svg'
                  : '@/assets/img/icon/stop-btn.svg')
              "
              alt=""
            />
          </a>
        </template>
        <template v-else-if="isImage">
          <a
            class="expand"
            data-fancybox
            data-width="640"
            data-height="360"
            :data-href="__url"
            :href="__url"
          >
          </a>
        </template>
        <nuxt-link
          v-else-if="mode != 'column'"
          :to="{
            name: 'brand_name-files-id',
            params: {
              id: file.id,
              brand_name: $getBrandName(),
              came_from_hash: hashParam,
              folder_name: $route.params.folder_name,
            },
          }"
          class="btn bg-light-gray"
        >
          View
        </nuxt-link>
        <a class="action-btn download-link" @click="downloadFile">
          <DownloadIcon />
        </a>
      </div>
    </div>
    <client-only>
      <ShareFile
        v-if="!emitShare"
        ref="shareDialog"
        :files="[file]"
        type="folder"
      ></ShareFile>
    </client-only>
  </div>
</template>

<script>
import fileType from '~/mixins/fileType'

export default {
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
    this.$nextTick(async () => {
      window.$(this.$el).find('[data-toggle="tooltip"]').tooltip()

      if (this.isVideo) {
        await this.getThumbnail()
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
          })
      } else if (this.isImage)
        window
          .$(this.$el)
          .find('[data-fancybox]')
          .fancybox({
            img: {
              tpl: '<img src="{{src}}"  />',
            },
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
      return new Promise((resolve) => {
        const video = this.$refs.video
        const vue = this
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        vue.videoThumbnailAdded = false
        video.addEventListener(
          'loadeddata',
          function () {
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            video.pause()

            resolve()

            vue.videoThumbnail = canvas.toDataURL('image/jpeg')
            vue.videoThumbnailAdded = true
          },
          false
        )

        video.muted = true
        video.playsInline = true
        video.setAttribute('crossOrigin', 'anonymous')
        video.preload = 'metadata'
        video.playbackRate = 1.5

        video.play()
      })
    },
    downloadFile() {
      this.$store.dispatch('downloadIndicator/downloadFile', {
        id: this.file.id,
        url: this.__url,
        name: this.file.display_file_name,
        callCountApi: !this.shareMode,
      })
    },
  },
}
</script>

<style>
.dam-res .preview-images .preview {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
/* .dam-res.mode-row .resource-box.video .preview-images {
  margin: 2rem;
  transform: translateX(-1rem) translateY(-1rem);
} */
.dam-res.mode-row .preview-images:not(.no-image) .preview {
  background-size: cover;
}
.dam-res:not(.mode-column) .preview-images.no-image .preview {
  height: calc(100% - 1.5rem);
  width: calc(100% - 0.5rem);
  padding: 1rem;
  padding-top: 2rem;
  margin: auto;
  background-origin: content-box !important;
  background-size: contain;
}

.resource-box.image .preview-images {
  background: white !important;
}
</style>
