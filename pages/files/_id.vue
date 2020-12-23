<template>
  <div class="row page-detail">
    <div
      class="col-lg-6 col-xl-7 detail-left"
      style="display: flex; flex-direction: column"
    >
      <div>
        <a class="back-link" @click="$router.go(-1)">
          Go Back
          <!-- {{ file.display_file_name }} -->
        </a>
        <h2>{{ file.display_file_name }}</h2>
      </div>
      <div
        class="detail-box"
        style="display: flex; flex-direction: column; flex: 1; overflow: hidden"
      >
        <div
          class="detail-img"
          style="display: flex; align-items: center; flex: 1; overflow: hidden"
        >
          <iframe
            v-if="isPdf"
            type="application/pdf"
            :src="file.display_file + '#toolbar=0'"
            width="100%"
            height="100%"
          ></iframe>
          <video
            v-else-if="isVideo"
            ref="video"
            style="width: 100%; height: auto"
            :poster="videoThumbnail"
            controlsList="nodownload"
            controls
          >
            <source :src="file.display_file" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img
            v-else
            class="img-fluid"
            style="object-fit: contain"
            :src="previewImage"
            :alt="file.display_file_name"
          />
        </div>
        <div class="detail-controls">
          <button
            type="button"
            class="btn btn-icon btn-icon-reverse"
            :disabled="allButtonDisabled"
            :class="{ 'btn-disable': allButtonDisabled }"
            @click="downloadFile"
          >
            Download
            <img src="@/assets/img/icon/btn-download.svg" alt="download" />
          </button>
          <button
            type="button"
            class="btn btn-icon btn-icon-reverse"
            :disabled="allButtonDisabled"
            :class="{ 'btn-disable': allButtonDisabled }"
            @click="$refs.shareDialog.toggleModel()"
          >
            Share
            <img src="@/assets/img/icon/select-share.svg" alt="share" />
          </button>
          <button
            type="button"
            class="btn btn-icon btn-icon-reverse"
            :disabled="allButtonDisabled"
            :class="{ 'btn-disable': allButtonDisabled }"
          >
            Embed
            <img src="@/assets/img/icon/embed-Icon.svg" alt="embed" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="ui.loading" class="col-lg-6 col-xl-5">loading...</div>
    <div v-else class="col-lg-6 col-xl-5">
      <div class="detail-right">
        <ul class="nav nav-tabs list-unstyled">
          <li class="nav-item" @click="ui.tab = 'overview'">
            <a class="nav-link" :class="{ active: ui.tab === 'overview' }">
              Overview
            </a>
          </li>
          <li class="nav-item" @click="ui.tab = 'metadata'">
            <a class="nav-link" :class="{ active: ui.tab === 'metadata' }">
              Metadata
            </a>
          </li>
          <li class="nav-item" @click="ui.tab = 'tags'">
            <a class="nav-link" :class="{ active: ui.tab === 'tags' }">
              Tags
            </a>
          </li>
        </ul>
        <div id="accordion" class="tab-content">
          <div class="tab-pane" :class="{ active: ui.tab === 'overview' }">
            <div
              class="mob-tab-title collapsed"
              data-toggle="collapse"
              data-target="#tab1-in"
              aria-expanded="true"
            >
              Overview
            </div>
            <div id="tab1-in" class="collapse show" data-parent="#accordion">
              <div class="tab-body overview-tab">
                <p>{{ file.description }}</p>
                <table>
                  <tr>
                    <td>ID</td>
                    <td>
                      <span> : </span>
                      <strong>{{ file.id }}</strong>
                    </td>
                  </tr>
                  <template v-if="metaData">
                    <tr v-for="(value, key) in metaData" :key="key">
                      <td>{{ key }}</td>
                      <td>
                        <span> : </span>
                        <strong v-html="getFormattedMetaValue(value, key)">
                        </strong>
                      </td>
                    </tr>
                  </template>
                </table>
              </div>
            </div>
          </div>
          <div class="tab-pane" :class="{ active: ui.tab === 'metadata' }">
            <div class="tab-body metadata-tab">
              <table>
                <tbody>
                  <tr
                    v-for="(value, key) in {
                      ...metaData,
                      ...exif,
                    }"
                    :key="key"
                  >
                    <td>{{ key }}</td>
                    <td>
                      <span> : </span>
                      <strong v-html="getFormattedMetaValue(value, key)">
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="tab-pane" :class="{ active: ui.tab === 'tags' }">
            <div
              class="mob-tab-title collapsed"
              data-toggle="collapse"
              data-target="#tab4-in"
              aria-expanded="false"
            >
              Tags
            </div>
            <div id="tab4-in" class="collapse" data-parent="#accordion">
              <div class="tab-body">
                <div class="bulk-tags">
                  <div class="bulk-box">
                    <h3>Tags</h3>
                    <span v-if="ui.loading">Loading...</span>
                    <TagsInput v-else v-model="tags" disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShareFile ref="shareDialog" :files="[file]" type="folder"></ShareFile>
    <DownloadingIndicator />
  </div>
</template>

<script>
import EXIF from 'exif-js'
import Axios from 'axios'
import { proxyurl } from '~/utils/helper'

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (result, key) {
      result[key] = obj[key]
      return result
    }, {})
}

export default {
  layout: 'app-min',
  async asyncData({ params, redirect, $axios, $getWorkspaceId, error }) {
    if (!params.id || Number.isNaN(Number(params.id)))
      redirect('/' + params.workspace_id + '/asset-manager')

    let metaData, tags, file
    await $axios
      .$post('digital/view-detail', {
        digital_assets_id: params.id,
        workspace_id: $getWorkspaceId(),
      })
      .then(({ data }) => {
        if (!data)
          return error({
            status: 404,
            message: 'Requested file was not found',
          })

        metaData = data.file_meta_data || {}

        if (metaData) {
          ;['COMPUTED', 'FileName', 'SectionsFound'].forEach(
            (key) => delete metaData[key]
          )

          metaData = sortObject(metaData)
        }

        tags = data.tags
        file = data
      })
      .catch((e) => error(e))

    return { metaData, tags, file }
  },
  data() {
    return {
      ui: {
        tab: 'overview',
        loading: false,
        deleting: false,
        archiving: false,
      },
      videoThumbnail: null,
      exif: null,
    }
  },
  computed: {
    allButtonDisabled() {
      return this.ui.loading || this.ui.deleting || this.ui.archiving
    },
    isPdf() {
      return this.$isPdf(this.file.file_type)
    },
    isImage() {
      return this.$isImage(this.file.file_type)
    },
    isVideo() {
      return this.$isVideo(this.file.file_type)
    },
    previewImage() {
      const ext = this.file.file_type
      if (!ext) return
      let thumbnail = null

      if (ext === 'pdf')
        thumbnail = require('@/assets/img/icon/file/pdf-icon-red.svg')
      else if (!this.isImage)
        thumbnail =
          this.file.preview_image ||
          require('@/assets/img/icon/file/general.svg')

      return thumbnail || this.file.display_file
    },
    fileId() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.$setPageTitle(this.file.display_file_name || 'Digital Asset Manager')
    this.getExif()
    if (this.isVideo) this.$nextTick(() => this.getThumbnail())
  },
  methods: {
    removeTagFromFile(tag) {
      this.$axios
        .$post('digital-assets/delete-tag', {
          workspace_id: this.$getWorkspaceId(),
          tag_id: tag.id,
        })
        .catch(this.onError)
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
        .catch(this.onError)
    },
    async archiveFile() {
      if (this.ui.archiving) return

      this.ui.archiving = true
      await this.$axios
        .$post('digital-assets/archive_assets', {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.file.id,
        })
        .then(({ message }) => {
          this.file.is_archive = !this.file.is_archive
          this.$toast.global.success(message)
          // this.$router.go(-1);
        })
        .catch(this.onError)

      this.ui.archiving = false
    },
    async deleteFile() {
      if (this.ui.deleting) return

      this.ui.deleting = true
      await this.$axios
        .$post('digital-assets/delete-file', {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.file.id,
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
          this.$router.go(-1)
        })
        .catch(this.onError)

      this.ui.deleting = false
    },
    getExif() {
      const vue = this

      if (this.file.file_size > 52428800 /* 5MB */) {
        vue.metaData = sortObject({
          ...vue.metaData,
          FileName: this.file.display_file_name,
          FileSize: this.file.file_size,
        })
        return
      }

      new Axios({
        method: 'get',
        url: proxyurl + this.file.display_file,
        responseType: 'blob',
      })
        .then(({ data }) => {
          EXIF.getData(data, function () {
            vue.exif = EXIF.getAllTags(this)
            ;['undefined', 'thumbnail', 'MakerNote', 'UserComment'].forEach(
              (key) => delete vue.exif[key]
            )
          })

          const file = new File([data], vue.file.display_file_name, {})

          vue.metaData = sortObject({
            ...vue.metaData,
            FileName: file.name,
            FileSize: file.size,
          })
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.info('exif-fetch-error:', e))
    },
    downloadFile() {
      this.$store.dispatch('downloadIndicator/downloadFile', {
        id: this.file.id,
        url: this.file.display_file,
        name: this.file.display_file_name,
      })
    },
    onError(e) {
      this.$toast.global.error(this.$getErrorMessage(e))
    },
    getThumbnail() {
      return new Promise((resolve) => {
        const video = document.createElement('video')
        const vue = this
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        video.addEventListener(
          'loadeddata',
          function () {
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            video.pause()

            resolve()

            vue.videoThumbnail = canvas.toDataURL('image/jpeg')
          },
          false
        )

        video.muted = true
        video.playsInline = true
        video.setAttribute('crossOrigin', 'anonymous')
        video.setAttribute('src', this.file.display_file)
        video.preload = 'metadata'
        video.play()
      })
    },
    getFormattedMetaValue(value, key) {
      switch (key) {
        case 'FileSize':
          return this.$toHumanlySize(value)
        case 'FileDateTime':
          return this.$moment(value * 1000).format('Do MMM, YYYY')
        case 'Orientation':
        case 'orientation':
          if (value === 1 || value === 2) return 'landscape'
          else if (value === 6 || value === 8 || value === 5 || value === 7)
            return 'portrait '
          else if (value === 1 || value === 2) return 'upside-down landscape'
          else return value
        case 'DateTime':
        case 'DateTimeOriginal':
        case 'DateTimeDigitized':
          return this.$moment(value, 'YYYY:MM:DD hh:mm:ss').format(
            'Do MMM, YYYY <i>HH:mm:ss</i>'
          )
        case 'MakerNote':
        case 'UserComment':
          return '&dash;'
      }

      return value || '&dash;'
    },
  },
}
</script>

<style>
.overview-tab table td strong,
.overview-tab table td span,
.metadata-tab table td span,
.metadata-tab table td strong {
  display: inline-block !important;
}
</style>
