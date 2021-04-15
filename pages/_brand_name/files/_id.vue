<!-- eslint-disable vue/no-v-html  -->
<template>
  <div class="h-100">
    <div
      class="section-title dam-detail-title d-flex flex-column flex-lg-row align-items-center"
    >
      <div
        class="sec-title-left d-flex justify-content-between justify-content-lg-start"
      >
        <nuxt-link
          v-if="breadcrumbs"
          class="home-icon"
          :to="`/${$getBrandName()}`"
          ><img src="~/assets/img/address.svg" alt=""
        /></nuxt-link>
        <div v-if="breadcrumbs" class="breadcrumb-links">
          <ul>
            <li>&nbsp;</li>
            <li v-for="(crumb, i) in breadcrumbs" :key="i">
              <component :is="crumb.url ? 'nuxt-link' : 'span'" :to="crumb.url">
                {{ crumb.name }}
              </component>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="dam-detail">
      <div class="row h-100">
        <div class="col-lg-6 inner-detail-left col-xl-7 h-100">
          <h2 class="title">
            {{ file.display_file_name | shrinkString(60, 15) }}
          </h2>
          <div class="common-box customscrollbar p0">
            <div
              v-if="isPdf || isVideo || isDoc || isAudio || isImage"
              class="asset-detail-img"
            >
              <iframe
                v-if="isPdf"
                type="application/pdf"
                :src="__url + '#toolbar=0'"
                width="100%"
                height="100%"
              ></iframe>
              <div v-else-if="isVideo" class="preview-video">
                <video
                  ref="video"
                  :poster="videoThumbnail"
                  controlsList="nodownload"
                  controls
                  class="thevideo"
                >
                  <source :src="__url" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <iframe
                v-else-if="isDoc"
                :src="`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                  __url
                )}`"
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
              <av-waveform
                v-else-if="isAudio"
                :audio-src="__url"
                :canv-width="1200"
                :canv-height="200"
                :playtime-font-size="18"
                :played-line-width="2"
                :playtime-clickable="false"
                :noplayed-line-width="1"
                played-line-color="#ed703d"
                noplayed-line-color="#1a1d2556"
              />
              <img
                v-else-if="isImage"
                :src="previewImage"
                :alt="file.display_file_name"
              />
              <!-- <div v-else class="m-auto">
                <img
                  class="img-fluid"
                  style="max-height: 128px; object-fit: contain"
                  :src="previewImage"
                  :alt="file.display_file_name"
                />
                <p class="mt-3">No preview available for this file.</p>
              </div> -->
            </div>
            <div v-else class="no-preview">
              <div class="icons">
                <img :src="previewImage" :alt="file.display_file_name" />
                <p>No preview available for this file.</p>
              </div>
              <!-- <div class="pdf-preview">
                        <iframe src="img/test.pdf" type="application/pdf" width="100%" height="100%"></iframe>
                     </div> -->
            </div>
          </div>
        </div>
        <div
          v-if="ui.loading"
          class="col-lg-6 inner-detail-right col-xl-5 h-100"
        >
          loading...
        </div>
        <div v-else class="col-lg-6 inner-detail-right col-xl-5 h-100">
          <div class="common-box detail-tabs p0">
            <div class="tabs-view h-100">
              <ul class="nav nav-left" role="tablist">
                <li class="nav-item" @click="ui.tab = 'overview'">
                  <a class="nav-link" :class="{ active: ui.tab === 'overview' }"
                    >Overview</a
                  >
                </li>
                <li class="nav-item" @click="ui.tab = 'metadata'">
                  <a class="nav-link" :class="{ active: ui.tab === 'metadata' }"
                    >Metadata</a
                  >
                </li>
                <li class="nav-item" @click="ui.tab = 'tags'">
                  <a class="nav-link" :class="{ active: ui.tab === 'tags' }"
                    >Tags</a
                  >
                </li>
              </ul>
              <div class="tabbing-inner">
                <div class="tab-content customscrollbar">
                  <SpinLoading
                    v-if="ui.tab == 'metadata' && ui.exifLoading"
                    style="position: absolute; top: 1rem; right: 1rem"
                  />
                  <div
                    id="overview"
                    class="tab-pane"
                    :class="{ active: ui.tab === 'overview' }"
                  >
                    <h4>{{ file.display_file_name | shrinkString(60, 15) }}</h4>
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
                    <ul class="overview-table">
                      <li>
                        <span class="flex30">ID</span
                        ><span class="flex70">: {{ file.id }}</span>
                      </li>
                      <li v-if="parentFolder">
                        <span class="flex30">Parent folder</span
                        ><span class="flex70"
                          ><nuxt-link :to="parentFolder.url" target="_blank">
                            : {{ parentFolder.name }}
                            <i
                              class="fa fa-external-link"
                              aria-hidden="true"
                            ></i> </nuxt-link
                        ></span>
                      </li>
                      <template v-if="metaData">
                        <li
                          v-for="(value, key) in filterMetaData(metaData)"
                          :key="key"
                        >
                          <span class="flex30">{{
                            $camelCaseToNormalCase(key)
                          }}</span
                          ><span
                            class="flex70"
                            :inner-html.prop="
                              ':' + ' ' + $getFormattedMetaValue(value, key)
                            "
                          ></span>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <div
                    id="metadata"
                    class="tab-pane"
                    :class="{ active: ui.tab === 'metadata' }"
                  >
                    <ul class="overview-table">
                      <li
                        v-for="(value, key) in {
                          ...metaData,
                          ...exif,
                        }"
                        :key="key"
                      >
                        <span class="flex45">{{
                          $camelCaseToNormalCase(key)
                        }}</span
                        ><span
                          class="flex55"
                          :inner-html.prop="
                            ':' + ' ' + $getFormattedMetaValue(value, key)
                          "
                        ></span>
                      </li>
                    </ul>
                  </div>
                  <div
                    id="tags"
                    class="tab-pane"
                    :class="{ active: ui.tab === 'tags' }"
                  >
                    <div class="tag-add-box">
                      <span v-if="ui.loading">Loading...</span>

                      <span
                        v-for="tag in tags"
                        v-else
                        :key="tag.id"
                        class="added-tag"
                        >{{ tag.tag_name }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="detail-right-actions">
                  <button
                    type="button"
                    class="btn btn-gray btn-icon"
                    :disabled="allButtonDisabled"
                    :class="{ 'btn-disable': allButtonDisabled }"
                    @click="downloadFile"
                  >
                    <img src="@/assets/img/download.svg" alt="download" />
                    Download
                  </button>
                  <button
                    type="button"
                    class="btn btn-gray btn-icon"
                    :disabled="allButtonDisabled"
                    :class="{ 'btn-disable': allButtonDisabled }"
                    @click="$refs.shareDialog.toggleModel()"
                  >
                    <img src="@/assets/img/share.svg" alt="share" />
                    Share
                  </button>
                  <!-- <button
            type="button"
            class="btn btn-gray btn-icon"
            :disabled="allButtonDisabled"
            :class="{ 'btn-disable': allButtonDisabled }"
          >
          <img src="@/assets/img/embeded.svg" alt="embed" />
            Embed
            
          </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <client-only>
          <ShareFile
            ref="shareDialog"
            :files="[file]"
            type="folder"
          ></ShareFile>
        </client-only>
        <DownloadingIndicator />
      </div>
    </div>
  </div>
</template>

<script>
import EXIF from 'exif-js'
import axios from 'axios'
import fileType from '~/mixins/fileType'

const categories = ['video', 'audio', 'image', 'application', 'archive']

const categoriesObject = [
  { text: 'Home', id: '' },
  { text: 'Audio', id: 'audio' },
  { text: 'Documents', id: 'application' },
  { text: 'Images', id: 'image' },
  { text: 'Videos', id: 'video' },
  { text: 'Archived', id: 'archive' },
]

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
const recursivePush = (item, array, workspaceId) => {
  if (!item) return

  array.push({
    name: item.folder_name,
    url: {
      name: 'brand_name-folders',
      // params: { brand_name: $getBrandName() },
      hash: `#${item.id}`,
    },
  })

  recursivePush(item.parent, array, workspaceId)
}

export default {
  layout: 'app-min',
  middleware: ['check-auth', 'check-url'],
  mixins: [fileType],
  async asyncData({ params, $axios, $getWorkspaceId, $deleteMetaKeys, error }) {
    if (!params.id || Number.isNaN(Number(params.id)))
      return error({
        status: 404,
        message: 'Requested file was not found',
      })

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
          $deleteMetaKeys(metaData)

          metaData = sortObject(metaData)
        }

        delete data.thumbnail_file
        if ((data.file_type || '').toLowerCase() === 'gif')
          delete data.compress_file

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
      ui: {
        tab: 'overview',
        loading: false,
        deleting: false,
        archiving: false,
        exifLoading: false,
      },
      videoThumbnail: null,
      exif: null,
    }
  },
  computed: {
    hashParam() {
      return this.$route.params.came_from_hash
    },
    folderList() {
      return this.$store.state.appData?.folderList || []
    },
    isFolder() {
      return (
        !!this.hashParam && !this.inCategory && !isNaN(Number(this.hashParam))
      )
    },
    inCategory() {
      return categories.includes(this.hashParam)
    },
    category() {
      return categoriesObject.find(({ id }) => this.hashParam === id)
    },
    allButtonDisabled() {
      return this.ui.loading || this.ui.deleting || this.ui.archiving
    },
    fileId() {
      return this.$route.params.id
    },
    parentFolder() {
      const workspaceId = this.$getWorkspaceId()

      const breadcrumbs = []
      recursivePush(this.file.breadcrumb, breadcrumbs, workspaceId)

      return breadcrumbs[0]
      // return breadcrumbs[breadcrumbs.length - 1]
    },
    breadcrumbs() {
      const breadcrumbs = [
        {
          name: this.$shrinkString(this.file.display_file_name, 60, 15),
          og: this.file.display_file_name,
        },
      ]

      // if (this.$route.params.is_coming_from_home) return breadcrumbs

      const workspaceId = this.$getWorkspaceId()

      // if (this.inCategory)
      //   breadcrumbs.push({
      //     name: 'All ' + this.category.text?.toLowerCase(),
      //     url: {
      //       name: 'workspace_id-dam-folders',
      //       params: { workspace_id: workspaceId },
      //       hash: `#${this.hashParam}`,
      //     },
      //   })
      // else {

      recursivePush(this.file.breadcrumb, breadcrumbs, workspaceId)

      // }

      return breadcrumbs.reverse()
    },
  },

  asyncComputed: {
    async breadcrumb() {
      if (this.inCategory)
        return {
          name: 'All ' + this.category.text?.toLowerCase(),
          url: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: `#${this.hashParam}`,
          },
        }

      if (!this.isFolder)
        return {
          name: 'Home',
          url: {
            name: 'brand_name',
            params: {
              brand_name: this.$getBrandName(),
            },
          },
        }

      let folder = this.$deepSearch(
        this.folderList,
        'category_id',
        (_, id) => Number(this.hashParam) === Number(id)
      )

      if (!folder && this.$route.params.folder_name)
        folder = { folder_name: this.$route.params.folder_name }
      else
        await this.$axios
          .$post('digital/view-category', {
            workspace_id: this.$getWorkspaceId(),
            category_id: this.hashParam,
          })
          .then(({ data }) => {
            folder = data
            // this.$store.commit("dam/setFolderItem", data);
          })
          .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
      // .finally(() => (this.loading = false));

      if (folder)
        return {
          name: folder.folder_name || folder.category_name,
          url: {
            name: 'brand_name-folders',
            params: { brand_name: this.$getBrandName() },
            hash: `#${this.hashParam}`,
          },
        }
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
        'Dimensions',
      ]

      return Object.keys(metaData)
        .filter((key) => allowed.includes(key) && metaData[key])
        .reduce((obj, key) => {
          obj[key] = metaData[key]
          return obj
        }, {})
    },
    async getExif() {
      const vue = this
      vue.metaData = sortObject({
        ...vue.metaData,
        FileName: vue.file.display_file_name,
        FileSize: vue.file.file_size,
      })

      if (vue.file.file_size > 52428800 /* 5MB */) return
      vue.ui.exifLoading = true

      await axios
        .get(vue.__url, { responseType: 'blob' })
        .then(({ data }) => {
          vue.ui.exifLoading = false
          EXIF.getData(data, function () {
            const a = Object.assign({}, EXIF.getAllTags(vue))
            vue.$deleteMetaKeys(a)
            vue.exif = a
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

      vue.ui.exifLoading = false
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
  },
}
</script>
