<template>
  <li :class="{ selected }">
    <!-- v-on="{
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
      }" -->
    <div
      class="preview-img tb-column flex10"
      :class="{ video: isVideo, image: isImage }"
      v-on="{
        ...(isVideo
          ? {
              mouseenter: playVideo,
              mouseleave: pauseVideo,
            }
          : {}),
      }"
    >
      <label v-if="!shareMode && !hideSelect" class="check-label">
        <input :checked="selected" type="checkbox" />
        <label
          class="check-span"
          @click="$emit('click:selected', file)"
        ></label>
      </label>
      <template @focus="$refs.video.play()" @blur="$refs.video.pause()">
        <div
          v-if="isVideo"
          class="categary-image"
          :class="{ 'no-image': !videoThumbnail }"
        >
          <nuxt-link
            :is="shareMode ? 'a' : 'nuxt-link'"
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
            <div :class="{ icons: videoThumbnail == previewImage }">
              <img :src="videoThumbnail" />
            </div>
            <video
              ref="video"
              class="thevideo"
              :data-video="file.display_file"
              playsinline
              muted
              loop
            >
              <source :src="file.display_file" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div class="video-info">
              <div class="upper-info">
                <span :inner-html.prop="file.file_type || '&dash;'"></span>
                <a
                  v-if="!shareMode"
                  @click="
                    emitShare
                      ? $emit('share', file)
                      : $refs.shareDialog.toggleModel()
                  "
                >
                  <img src="~/assets/img/share.svg" alt="" class="white-icon" />
                </a>
              </div>
              <div class="down-info">
                <template v-if="isVideo">
                  <video
                    :id="`file-video-${file.id}`"
                    width="640"
                    height="320"
                    controlsList="nodownload"
                    controls
                    :data-id="`file-${file.id}`"
                    style="display: none"
                  >
                    <source :src="__url" type="video/mp4" />
                    Your browser doesn't support HTML5 video tag.
                  </video>
                </template>

                <template v-if="isVideo">
                  <a @click="paused = !paused">
                    <img
                      style="width: 20px"
                      :src="
                        require(paused
                          ? '~/assets/img/play-icon.svg'
                          : '~/assets/img/pause-icon.svg')
                      "
                      alt=""
                    />
                  </a>
                  <a
                    ref="expandButton"
                    :href="`#file-video-${file.id}`"
                    data-fancybox
                    ><img src="~/assets/img/expand-icon.svg" alt="" />
                  </a>
                </template>
                <component
                  :is="shareMode ? 'a' : 'nuxt-link'"
                  v-else-if="mode != 'column'"
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
                  class="btn btn-gray-invert view-btn"
                >
                  View
                </component>
              </div>
            </div>
          </nuxt-link>
        </div>

        <div v-else class="categary-image" :class="{ 'no-image': !isImage }">
          <nuxt-link
            :is="shareMode ? 'a' : 'nuxt-link'"
            class="img-link"
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
            <div :class="{ icons: !isImage }">
              <img
                v-show="!imageLoading"
                :src="previewImage"
                @load="imageLoading = false"
              />
            </div>
          </nuxt-link>
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
          <div class="video-info">
            <div class="upper-info">
              <span :inner-html.prop="file.file_type || '&dash;'"></span>
              <a
                v-if="!shareMode"
                @click="
                  emitShare
                    ? $emit('share', file)
                    : $refs.shareDialog.toggleModel()
                "
              >
                <img src="~/assets/img/share.svg" alt="" class="white-icon" />
              </a>
            </div>
            <div class="down-info">
              <a
                ref="expandButton"
                style="display: none"
                data-fancybox="image-preview"
                data-width="auto"
                data-height="auto"
                :data-href="__compressed_preview || __url"
                :href="__compressed_preview || __url"
              >
              </a>

              <a v-if="isImage" @click.stop="$refs.expandButton.click()"
                ><img src="~/assets/img/expand-icon.svg" alt="" />
              </a>
              <component
                :is="shareMode ? 'a' : 'nuxt-link'"
                v-else-if="mode != 'column'"
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
                class="btn btn-gray-invert view-btn"
              >
                View
              </component>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="categary-name tb-column flex27">
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
    <div class="assets tb-column flex18">
      <div class="top-column">
        <label :inner-html.prop="file.file_type || '&dash;'"></label>
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
          <a
            v-if="!shareMode"
            class="share-it action-btn"
            @click="
              emitShare ? $emit('share', file) : $refs.shareDialog.toggleModel()
            "
          >
            <img src="~/assets/img/share.svg" alt="" />
          </a>
          <a @click="downloadFile">
            <img src="~/assets/img/download.svg" alt="" />
          </a>
        </div>
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
  </li>
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
    workspaceId() {
      return this.$getWorkspaceId()
    },
  },
  watch: {
    paused(paused) {
      const video = this.$refs.video
      if (!video) return
      if (paused) this.pauseVideo()
      else if (!this.isPlaying()) this.playVideo()
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
    pauseVideo() {
      if (this.videoError || !this.isPlaying) return
      const video = this.$refs.video

      this.$suppressError(() => {
        this.playtime = video.currentTime
        video.pause()
      })
    },
    playVideo() {
      if (this.paused || this.videoError) return

      const video = this.$refs.video
      this.$suppressError(() => {
        video.play()?.catch(() => {
          this.videoError = true
        })
      })
    },
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
