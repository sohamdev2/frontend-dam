<!-- eslint-disable vue/no-v-html  -->
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
            :src="__url + '#toolbar=0'"
            width="100%"
            height="100%"
          ></iframe>
          <video
            v-else-if="isVideo"
            ref="video"
            style="height: 100%; width: auto; margin: auto"
            :poster="videoThumbnail"
            controlsList="nodownload"
            controls
          >
            <source :src="__url" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <iframe
            v-else-if="isDoc"
            :src="`https://view.officeapps.live.com/op/embed.aspx?src=${__url}`"
            width="100%"
            height="100%"
            frameborder="0"
          >
            This is an embedded
            <a target="_blank" href="http://office.com">Microsoft Office</a>
            document, powered by
            <a target="_blank" href="http://office.com/webapps">
              Office Online </a
            >.
          </iframe>
          <div v-else-if="isAudio">
            <av-waveform
              :audio-src="__url"
              :canv-width="1200"
              :canv-height="200"
              :playtime-font-size="18"
              :played-line-width="2"
              :playtime-clickable="false"
              :noplayed-line-width="1"
              played-line-color="#ed703d"
              noplayed-line-color="#1a1d2556"
            ></av-waveform>
          </div>
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
                <template v-if="file.category && file.category.length">
                  <h5>Included in Folders</h5>
                  <ul class="px-4 pt-3">
                    <li v-for="folder in file.category" :key="folder.id">
                      <nuxt-link
                        :to="{
                          name: 'brand_name-folders',
                          params: { brand_name: $getBrandName() },
                          hash: `#${folder.id}`,
                        }"
                      >
                        {{ folder.category_name }}
                      </nuxt-link>
                    </li>
                  </ul>
                  <hr />
                </template>
                <table>
                  <tr>
                    <td>ID</td>
                    <td>
                      <span> : </span>
                      <strong>{{ file.id }}</strong>
                    </td>
                  </tr>
                  <template v-if="metaData">
                    <tr
                      v-for="(value, key) in filterMetaData(metaData)"
                      :key="key"
                    >
                      <td>{{ $camelCaseToNormalCase(key) }}</td>
                      <td>
                        <span> : </span>
                        <strong v-html="$getFormattedMetaValue(value, key)">
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
                    <td>{{ $camelCaseToNormalCase(key) }}</td>
                    <td>
                      <span> : </span>
                      <strong v-html="$getFormattedMetaValue(value, key)">
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
                    <TagsInput
                      v-else
                      v-model="tags"
                      placeholder="No Tags Provided"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <ShareFile ref="shareDialog" :files="[file]" type="folder"></ShareFile>
    </client-only>
    <DownloadingIndicator />
  </div>
</template>

<script>
import EXIF from 'exif-js'
import Axios from 'axios'
import fileType from '~/mixins/fileType'
import { proxyurl } from '~/utils/helper'

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (result, key) {
      result[key] = obj[key]
      return result
    }, {})
}

function resizeCanvas() {
  const $canvas = window.$('.detail-img canvas')
  const $container = window.$('.detail-img')

  $canvas.outerWidth($container.width())
}

export default {
  layout: 'app-min',
  mixins: [fileType],
  async asyncData({ params, redirect, $axios, $getWorkspaceId, error }) {
    if (!params.id || Number.isNaN(Number(params.id)))
      redirect('/' + params.workspace_id + '/asset-manager')

    const throw404 = () =>
      error({
        status: 404,
        message: 'Requested file was not found',
      })

    let metaData, tags, file
    await $axios
      .$post('digital/view-detail', {
        digital_assets_id: params.id,
        workspace_id: $getWorkspaceId(),
      })
      .then(({ data, code }) => {
        if (!data) return throw404()

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
      .catch(({ response, message }) => {
        if (response) throw404()
        else error(message)
      })

    return { metaData, tags, file }
  },
  data() {
    return {
      proxyurl,
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
    fileId() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.$setPageTitle(this.file.display_file_name || 'Digital Asset Manager')
    this.getExif()
    if (this.isVideo) this.$nextTick(() => this.getThumbnail())
    else if (this.isAudio) {
      this.$nextTick(() => {
        window.$(document).ready(function () {
          window.$('.detail-img audio').attr('controlsList', 'nodownload')

          resizeCanvas()
          window.$(window).on('resize', function () {
            resizeCanvas()
          })
        })
      })
    }
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
    filterMetaData(metaData) {
      const allowed = [
        'Credit',
        'DateUploaded',
        'FileName',
        'FileSize',
        'LastModified',
      ]

      return Object.keys(metaData)
        .filter((key) => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = metaData[key]
          return obj
        }, {})
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
        url: proxyurl + this.__url,
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
        url: this.__url,
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
        video.setAttribute('src', this.__url)
        video.preload = 'metadata'
        video.play()
      })
    },
  },
}
</script>

<style>
.detail-img audio {
  width: 100%;
}
.cui-statusbar .cui-ctl,
.cui-statusbar .cui-ctl-medium {
  display: none !important;
}
</style>
