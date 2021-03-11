<template>
  <div class="dam-res" :class="`mode-${mode}`">
    <div
      class="resource-box"
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
      <div v-if="!shareMode && !hideSelect" class="custom-checkbox">
        <input :checked="selected" type="checkbox" class="form-check-input" />
        <label @click="$emit('click:selected', file)"></label>
      </div>
      <div
        class="preview-container"
        @focus="$refs.video.play()"
        @blur="$refs.video.pause()"
      >
        <div
          v-if="isVideo"
          class="preview-images"
          :style="mode == 'column' ? { background: 'transparent' } : {}"
          :class="{ 'no-image': !videoThumbnail }"
        >
          <img
            class="preview-images preview"
            style="object-fit: contain !important"
            :src="videoThumbnail"
          />
          <video
            v-show="playingModel"
            ref="video"
            class="thevideo"
            :data-video="file.display_file"
            style="width: 100%; height: auto; object-fit: contain; margin: auto"
            playsinline
            muted
            loop
          >
            <source :src="file.display_file" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div v-else class="preview-images" :class="{ 'no-image': !isImage }">
          <div class="preview">
            <img
              v-show="!imageLoading"
              class="dam-image-preview m-auto"
              :src="previewImage"
              @load="imageLoading = false"
            />
          </div>
          <client-only>
            <ContentLoader
              v-if="(isImage && imageLoading) || videoThumbnailFetching"
              style="position: absolute; top: 0; right: 0; left: 0; bottom: 0"
              :speed="1"
              :width="200"
              :height="200"
              :animate="true"
            >
              <rect x="0" y="0" rx="2" ry="2" width="200" height="200" />
            </ContentLoader>
          </client-only>
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
          {{ file.display_file_name }}
        </span>
      </nuxt-link>
      <div class="format-type">
        <span v-html="file.file_type || '&dash;'"></span>
      </div>
      <div class="date">
        {{ $moment(file.updated_at).format('Do MMM, YYYY') }}
      </div>
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
      />
    </client-only>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import fileType from '~/mixins/fileType'

export default {
  components: { ContentLoader },
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
      window.$(this.$el).find('[data-toggle="tooltip"]').tooltip()
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
      })
    },
  },
}
</script>

<style>
.row-resource .resource-box.image .expand {
  right: 15px;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4NCiAgPHBhdGggaWQ9Ikljb25fYXdlc29tZS1leHBhbmQiIGRhdGEtbmFtZT0iSWNvbiBhd2Vzb21lLWV4cGFuZCIgZD0iTTAsNy41MzZWMy4xMDdBLjg1NS44NTUsMCwwLDEsLjg1NywyLjI1SDUuMjg2YS40My40MywwLDAsMSwuNDI5LjQyOVY0LjEwN2EuNDMuNDMsMCwwLDEtLjQyOS40MjloLTN2M2EuNDMuNDMsMCwwLDEtLjQyOS40MjlILjQyOUEuNDMuNDMsMCwwLDEsMCw3LjUzNlpNMTAuMjg2LDIuNjc5VjQuMTA3YS40My40MywwLDAsMCwuNDI5LjQyOWgzdjNhLjQzLjQzLDAsMCwwLC40MjkuNDI5aDEuNDI5QS40My40MywwLDAsMCwxNiw3LjUzNlYzLjEwN2EuODU1Ljg1NSwwLDAsMC0uODU3LS44NTdIMTAuNzE0QS40My40MywwLDAsMCwxMC4yODYsMi42NzlabTUuMjg2LDkuODU3SDE0LjE0M2EuNDMuNDMsMCwwLDAtLjQyOS40Mjl2M2gtM2EuNDMuNDMsMCwwLDAtLjQyOS40Mjl2MS40MjlhLjQzLjQzLDAsMCwwLC40MjkuNDI5aDQuNDI5QS44NTUuODU1LDAsMCwwLDE2LDE3LjM5M1YxMi45NjRBLjQzLjQzLDAsMCwwLDE1LjU3MSwxMi41MzZaTTUuNzE0LDE3LjgyMVYxNi4zOTNhLjQzLjQzLDAsMCwwLS40MjktLjQyOWgtM3YtM2EuNDMuNDMsMCwwLDAtLjQyOS0uNDI5SC40MjlBLjQzLjQzLDAsMCwwLDAsMTIuOTY0djQuNDI5YS44NTUuODU1LDAsMCwwLC44NTcuODU3SDUuMjg2QS40My40MywwLDAsMCw1LjcxNCwxNy44MjFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0yLjI1KSIgZmlsbD0iI2ZmZiIvPg0KPC9zdmc+DQo=)
    no-repeat center;
  width: 16px;
  height: 16px;
}
.row-resource .resource-box.image:hover .expand,
.row-resource .resource-box.image:hover {
  opacity: 1;
}
.row-resource .resource-box.image .expand,
.row-resource .resource-box.image .play-btn {
  position: absolute;
  bottom: 78px;
  z-index: 10;
  opacity: 0;
  transition: all 0.3s;
  display: inline-block;
  line-height: 0;
}
.dam-image-preview {
  width: auto;
  height: 100%;
  object-fit: cover;
}

.dam-res .preview-images .preview {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background-size: contain;
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
}
/* .dam-res.mode-row .resource-box.video .preview-images {
  margin: 2rem;
  transform: translateX(-1rem) translateY(-1rem);
} */
.dam-res.mode-row .preview-images:not(.no-image) img {
  object-fit: contain;
}
.dam-res:not(.mode-column) .preview-images.no-image img {
  max-width: 100%;
  max-height: 100px;
  margin: auto;
  object-fit: contain !important;
}

.resource-box.image .preview-images {
  background: white !important;
}
</style>
