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
          ><svg
            id="Layer_1"
            class="home-icon orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 16.2 18"
            xml:space="preserve"
          >
            <g id="Group_4409" transform="translate(-871.194 -659.595)">
              <g id="Path_3470">
                <path
                  id="Path_3514"
                  class="fill-color"
                  d="M879.3,661.5l6.6,5.1v9.2c0,0.2-0.1,0.3-0.3,0.3H873c-0.2,0-0.3-0.1-0.3-0.3v-9.2L879.3,661.5M879.3,659.6l-8.1,6.3v9.9c0,1,0.8,1.8,1.8,1.8h12.6c1,0,1.8-0.8,1.8-1.8v-9.9L879.3,659.6z"
                ></path>
              </g>
              <g id="Path_3471">
                <path
                  id="Path_3515"
                  class="fill-color"
                  d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
                ></path>
              </g>
            </g></svg
        ></nuxt-link>
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
      <div class="dam-detail h-100 w-100">
        <!-- <div class="row h-100"> -->
        <div class="inner-detail-left h-100">
          <h2 class="title">
            {{ file.display_file_name | shrinkString(60, 15) }}
          </h2>
          <div class="common-box customscrollbar bg-gray p20">
            <div
              v-if="isPdf || isDoc || isTxt || isHtml"
              :class="{ 'doc-wapper': !previewIcon, 'no-preview': previewIcon }"
            >
              <div :class="{ 'doc-preview': !previewIcon, icons: previewIcon }">
                <template v-if="isPdf">
                  <img
                    v-if="previewLoaded"
                    ref="docFile"
                    class="img-fluid"
                    style="object-fit: contain"
                    :src="previewFile"
                    :alt="file.display_file_name"
                  />
                  <iframe
                    v-else
                    type="application/pdf"
                    :src="__url + '#toolbar=0?transparent=0'"
                    width="100%"
                    height="100%"
                    @load="checkPreview"
                  ></iframe>
                </template>
                <template v-else-if="isHtml">
                  <img
                    ref="docFile"
                    class="img-fluid"
                    style="object-fit: contain"
                    :src="previewImage"
                    :alt="file.display_file_name"
                    @error="imageErrorHandle"
                  />
                </template>
                <template v-else-if="isTxt">
                  <img
                    v-if="previewLoaded"
                    ref="docFile"
                    class="img-fluid"
                    style="object-fit: contain"
                    :src="previewFile"
                    :alt="file.display_file_name"
                  />
                  <iframe
                    v-else
                    type="application/txt"
                    :src="__url"
                    width="100%"
                    height="100%"
                    @load="checkPreview"
                  ></iframe>
                </template>
                <template v-else-if="isDoc">
                  <img
                    v-if="previewLoaded"
                    ref="docFile"
                    class="img-fluid"
                    style="object-fit: contain"
                    :src="previewFile"
                    :alt="file.display_file_name"
                  />
                  <iframe
                    v-else
                    :src="`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                      __url
                    )}`"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    @load="checkPreview"
                  >
                    This is an embedded
                    <a target="_blank" href="http://office.com">
                      Microsoft Office
                    </a>
                    document, powered by
                    <a target="_blank" href="http://office.com/webapps">
                      Office Online </a
                    >.
                  </iframe>
                </template>

                <p v-if="previewIcon">
                  {{ 'No preview available for this file.' }}
                </p>
              </div>
            </div>
            <div v-else-if="isAudio" class="audio-wapper">
              <div class="audio-preview">
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
                />
              </div>
            </div>
            <div
              v-else-if="isImage"
              :class="
                __compressed_preview || __image_thumb
                  ? 'asset-detail-img'
                  : 'no-preview'
              "
            >
              <div
                v-if="!(__compressed_preview || __image_thumb)"
                class="icons"
              >
                <img
                  ref="sourceImage"
                  :src="previewImage"
                  :alt="file.display_file_name"
                  @error="imageErrorHandle"
                />
                <p>
                  {{ 'No preview available for this file.' }}
                </p>
              </div>
              <img
                v-else
                ref="sourceImage"
                :src="previewImage"
                :alt="file.display_file_name"
                @error="imageErrorHandle"
              />
            </div>
            <div v-else-if="isVideo" class="asset-detail-img">
              <div v-if="isVideo" class="preview-video">
                <!-- :poster="videoThumbnail" -->
                <video
                  ref="video"
                  controlsList="nodownload"
                  controls
                  class="thevideo"
                >
                  <source :src="__url" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div
              v-else
              :class="{ 'no-preview': !hasZipCompressedImage }"
              :style="{
                textAlign: hasZipCompressedImage ? 'center' : '',
              }"
            >
              <div :class="{ icons: !hasZipCompressedImage }">
                <img
                  :src="
                    hasZipCompressedImage ? file.compress_file : previewImage
                  "
                  :alt="file.display_file_name"
                  @error="imageErrorHandle"
                />
                <p v-if="!hasZipCompressedImage">
                  {{
                    ui.videoError
                      ? 'We cannot play this video, yet...'
                      : 'No preview available for this file.'
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="ui.loading" class="inner-detail-right h-100">loading...</div>
        <div v-else class="inner-detail-right h-100">
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
                    <h4>
                      {{ file.display_file_name | shrinkString(60, 15) }}
                    </h4>
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
                        <span>ID</span><span>: {{ file.id }}</span>
                      </li>
                      <li v-if="parentFolder">
                        <span>Parent Folder</span>
                        <span
                          >:
                          <div class="breadcrumb-links">
                            <ul>
                              <li v-for="(crumb, i) in breadcrumbs" :key="i">
                                <component
                                  :is="crumb.url ? 'nuxt-link' : 'span'"
                                  :to="crumb.url"
                                >
                                  {{ crumb.name }}
                                </component>
                              </li>
                            </ul>
                          </div>
                        </span>
                      </li>
                      <!-- <li v-if="parentFolder">
                        <span class="flex30">Parent folder</span
                        ><span class="flex70"
                          ><nuxt-link :to="parentFolder.url" target="_blank">
                            : {{ parentFolder.name }}
                            <i
                              class="fa fa-external-link"
                              aria-hidden="true"
                            ></i> </nuxt-link
                        ></span>
                      </li> -->
                      <template v-if="metaData">
                        <li
                          v-for="(value, key) in filterMetaData(metaData)"
                          :key="key"
                        >
                          <span>{{ $camelCaseToNormalCase(key) }}</span
                          ><span
                            :inner-html.prop="
                              ':' + ' ' + $getFormattedMetaValue(value, key)
                            "
                          ></span>
                        </li>
                      </template>
                      <li>
                        <span
                          >Permission
                          <i
                            v-tooltip="{
                              html: true,
                              content: `<ul>
                                    <li>
                                      <strong>PUBLIC:</strong> This image can be used per the brand’s licensing guidelines and shared publicly as needed.
                                    </li>
                                    <li>
                                        <strong>PRIVATE:</strong> This image is for internal use only and may require credit per the brand’s licensing guidelines and may not be shared without specific permissions.
                                    </li>
                                        </ul>`,
                            }"
                            class="fa fa-info-circle"
                            aria-hidden="true"
                            data-toggle="tooltip"
                          ></i></span
                        ><span
                          >:
                          {{
                            file.is_public === 0 ? 'Private' : 'Public'
                          }}</span
                        >
                      </li>
                      <li v-if="file.is_editorial_use !== 0">
                        <span
                          >Licensing
                          <i
                            v-tooltip="{
                              html: true,
                              content: `<ul>
                                <li>This <strong>For Editorial Use Only</strong> image can be used editorially to accompany internal presentations, news articles, blog or social media posts (Facebook, Instagram, Twitter, etc.) where the purpose is solely to inform, educate or entertain and not to promote a product or service.
                                  </li>
                                  </ul>`,
                            }"
                            class="fa fa-info-circle"
                            aria-hidden="true"
                          ></i
                        ></span>
                        <span>: Editorial Use Only</span>
                      </li>
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
                        <span>{{ $camelCaseToNormalCase(key) }}</span
                        ><span
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
                    <svg
                      id="Layer_1"
                      class="download-icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_4359"
                        transform="translate(-153.745 -317.549)"
                      >
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
                    Download
                  </button>
                  <div
                    v-if="downloadableFormats.length"
                    class="dropdown convert-video"
                  >
                    <a
                      href="javascript:void(0);"
                      class="dropdown-toggle btn btn-gray btn-icon"
                      :class="{
                        disabledFileConvert: allButtonDisabled || converting,
                      }"
                      :disabled="allButtonDisabled || converting"
                      data-toggle="dropdown"
                    >
                      <svg
                        id="Layer_1"
                        class="convert-assets-icon"
                        :class="{ converting: converting }"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Convert">
                          <g id="sync" transform="translate(-2 -2.023)">
                            <path
                              id="Path_40227"
                              class="fill-color"
                              d="M16.1,14.6h1.8c-2,3.8-6.7,5.3-10.5,3.3c-2.6-1.3-4.2-4-4.2-6.9H2c0,5,4,9,9,9c3.2,0,6.2-1.7,7.8-4.5v1.8H20v-3.9h-3.9V14.6z"
                            ></path>
                            <path
                              id="Path_40228"
                              class="fill-color"
                              d="M5.9,7.4H4.1c2-3.8,6.7-5.3,10.5-3.3c2.6,1.3,4.2,4,4.2,6.9H20c0-5-4-9-9-9C7.8,2,4.8,3.7,3.2,6.5V4.7H2v3.9h3.9V7.4z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      {{ converting ? 'Converting...' : 'Convert' }}
                    </a>
                    <ul class="dropdown-menu">
                      <li
                        v-for="format in downloadableFormats"
                        :key="format"
                        @click="convertFile(format)"
                      >
                        <a href="javascript:void(0);" class="dropdown-item">{{
                          format
                        }}</a>
                      </li>
                    </ul>
                  </div>
                  <button
                    v-if="file.is_public === 1"
                    type="button"
                    class="btn btn-gray btn-icon"
                    :disabled="allButtonDisabled"
                    :class="{ 'btn-disable': allButtonDisabled }"
                    @click="$refs.shareDialog.toggleModel()"
                  >
                    <svg
                      id="Layer_1"
                      class="share-icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_4473" transform="translate(-871 -230)">
                        <rect
                          id="Rectangle_3012"
                          x="871"
                          y="230"
                          class="fill-hide"
                          width="18"
                          height="18"
                        ></rect>
                        <path
                          id="Icon_open-share"
                          class="fill-color"
                          d="M883.9,234.4l3.2,3.1l-3.2,3.4v-2.3h-3.8c-2.1,0-4.3,0.5-6.1,1.6c1.4-2,3.9-3.2,8.4-3.2h1.5L883.9,234.4 M883.1,231.8c-0.4,0-0.7,0.3-0.7,0.7c0,0,0,0,0,0v3c-8.8,0-11.2,4.3-11.4,10.6c0,0.1,0,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1c1.4-4,4.6-6,8.9-6h2.3v2.9c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.2l5.2-5.5c0.3-0.3,0.2-0.7,0-1c0,0,0,0,0,0l-5.2-4.9C883.4,231.9,883.3,231.8,883.1,231.8L883.1,231.8z"
                        ></path>
                      </g>
                    </svg>
                    Share
                  </button>
                  <!-- <button
            type="button"
            class="btn btn-gray btn-icon"
            :disabled="allButtonDisabled"
            :class="{ 'btn-disable': allButtonDisabled }"
          >
          <svg class="embed-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" xml:space="preserve"><g id="Group_4474" transform="translate(-871 -325)"><rect id="Rectangle_2993" x="871" y="325" class="fill-hide" width="18" height="18"/><g id="Group_4360" transform="translate(671.255 7.338)"><path id="Path_3430" class="fill-color" d="M204,330.9c-0.2,0-0.4-0.1-0.5-0.2l-3.5-3.5c-0.3-0.3-0.3-0.8,0-1.1l3.5-3.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-2.9,3l2.9,3c0.3,0.3,0.3,0.8,0,1.1C204.5,330.8,204.3,330.9,204,330.9L204,330.9z"/><path id="Path_3431" class="fill-color" d="M213.4,330.9c-0.4,0-0.8-0.3-0.8-0.8c0-0.2,0.1-0.4,0.2-0.5l2.9-3l-2.9-3c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0c0,0,0,0,0,0l3.5,3.5c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-3.5,3.5C213.8,330.8,213.7,330.9,213.4,330.9z"/><path id="Path_3432" class="fill-color" d="M207,331.4c-0.4,0-0.8-0.3-0.8-0.8c0-0.1,0-0.2,0.1-0.3l3.4-8.2c0.2-0.4,0.6-0.6,1-0.4c0.4,0.2,0.6,0.6,0.4,1l0,0l-3.4,8.2C207.6,331.3,207.4,331.4,207,331.4z"/></g></g></svg>
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
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import EXIF from 'exif-js'
import axios from 'axios'
import FileSaver from 'file-saver'
import Jimp from 'jimp'
import fileType from '~/mixins/fileType'

const categories = ['video', 'audio', 'image', 'application', 'archive']

const VIDEO_FORMATS = [
  'asf',
  'avi',
  'fla',
  'f4a',
  'f4b',
  'f4p',
  'flv',
  'f4v',
  // 'mmf',
  'mov',
  'mpeg',
  'mp4',
  'm4v',
  // 'ogg',
  'ogv',
  'rm',
  // 'viv',
  'vob',
  'wav',
  'webm',
]
const AUDIO_FORMATS = [
  'mp2',
  'mp3',
  'oga',
  'opus',
  'wv',
  'voc',
  'tta',
  'flac',
  'au',
  'aiff',
]
const IMAGE_FORMATS = [
  'tif',
  'tiff',
  'bmp', // exclude for svg file
  'jpg',
  // 'jp2',
  // 'gif',//requires libvips with support for ImageMagick
  'jpeg',
  'jfif', // exclude for svg file
  // 'pjpeg',
  // 'pjp',
  'png',
  // 'eps',
  // 'raw',
  // 'cr2',
  // 'orf',
  // 'sr2',
  // 'apng',
  // 'svg',
  'webp',
  // 'ico',
  // 'cur',
  'heif',
  'avif',
]
const UNSUPPORTED_FORMATS_FROM_SVG = ['bmp', 'jfif']
const IMAGE_MIMETYPES = {
  tif: 'image/tiff',
  tiff: 'image/tiff',
  bmp: 'image/bmp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  jfif: 'image/jpeg',
  pjpeg: 'image/pjpeg',
  png: 'image/png',
  eps: 'application/postscript',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  ico: 'image/vnd.microsoft.icon',
}

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

        // delete data.thumbnail_file
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
      previewIcon: false,
      previewFile: null,
      previewLoaded: false,
      converting: false,
    }
  },
  computed: {
    downloadableFormats() {
      const sortAscending = (a, b) => a.localeCompare(b)
      if (this.file.type === 'video')
        return [...VIDEO_FORMATS, 'gif'].sort(sortAscending)
      if (this.file.type === 'audio') return AUDIO_FORMATS.sort(sortAscending)
      if (this.file.type === 'image') {
        if (this.file.file_type === 'svg')
          return [
            'svg',
            ...IMAGE_FORMATS.filter(
              (e) => !UNSUPPORTED_FORMATS_FROM_SVG.includes(e)
            ),
          ].sort(sortAscending)
        return this.file.file_type === 'gif'
          ? ['gif', ...IMAGE_FORMATS].sort(sortAscending)
          : IMAGE_FORMATS.sort(sortAscending)
      }
      return []
    },
    hasZipCompressedImage() {
      return (
        this.file.file_type === 'zip' &&
        (this.file.compress_file || '').length > 0
      )
    },
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
        folder = { folder: this.$route.params.folder_name }
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
          .catch()
      // .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
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
    this.$setPageTitle(this.file.display_file_name + ' | ' + this.$brandName())
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
    } else if (this.file.file_type === 'avi') {
      this.ui.videoError = true
    }
  },
  methods: {
    updateDownloadCount(assetId, type) {
      this.$axios.$post('digital/download-count', {
        workspace_id: this.$getWorkspaceId(),
        asset_id: assetId,
        is_backend_download: true,
        download_by: 'desktop',
        type,
      })
    },
    convertOtherImage(format) {
      axios
        .post(
          '/convert',
          {
            url: this.file.display_file,
            format,
            fileType: 'image',
          },
          {
            responseType: 'blob',
          }
        )
        .then((r) => {
          const targetName =
            this.file.display_file_name.substring(
              0,
              this.file.display_file_name.lastIndexOf('.') + 1
            ) + format
          FileSaver.saveAs(r.data, targetName)
          this.updateDownloadCount(this.file.id, 'asset')
        })
        .catch(console.error)
        .finally(() => (this.converting = false))
    },
    convertFile(format) {
      if (this.converting) return
      if (
        format === this.file.file_type ||
        !['audio', 'video', 'image'].includes(this.file.type)
      ) {
        return this.downloadFile()
      }
      const targetName =
        this.file.display_file_name.substring(
          0,
          this.file.display_file_name.lastIndexOf('.') + 1
        ) + format
      this.converting = true
      if (['audio', 'video'].includes(this.file.type)) {
        axios
          .post(
            '/convert',
            {
              url: this.file.display_file,
              format,
              fileType: this.file.type,
            },
            {
              responseType: 'blob',
            }
          )
          .then((r) => {
            FileSaver.saveAs(r.data, targetName)
            this.updateDownloadCount(this.file.id, 'asset')
          })
          .catch(console.error)
          .finally(() => (this.converting = false))
      } else if (['jfif', 'bmp'].includes(format)) {
        Jimp.read(this.file.display_file)
          .then((image) => {
            const mime = IMAGE_MIMETYPES[format]
            if (!mime) {
              this.$toast.error('Could not retrieve mimeType')
              this.converting = false
              return
            }
            image.getBase64(mime, (e, d) => {
              if (e) {
                this.$toast.error('Could not convert image')
                this.converting = false
                return
              }
              FileSaver.saveAs(d, targetName)
              this.updateDownloadCount(this.file.id, 'asset')
            })
          })
          .catch(console.error)
          .finally(() => {
            this.converting = false
          })
      } else {
        this.convertOtherImage(format)
      }
    },
    imageErrorHandle(data) {
      if (this.isPdf || this.isTxt || this.isDoc || this.isHtml) {
        this.previewIcon = true
      }
      try {
        data.target.src = require(`~/assets/img/icon/file/${this.file.file_type.toLowerCase()}.svg`)
      } catch {
        data.target.src = require(`~/assets/img/icon/file/general.svg`)
      }
      setTimeout(() => {
        if (this.file.file_type.toLowerCase() === 'html') {
          this.$refs.docFile.style.maxHeight = '128px'
        } else if (this.$isImage(this.file.file_type)) {
          this.$refs.sourceImage.style.maxHeight = '128px'
        }
      }, 50)
    },
    errorHandle() {
      if (this.isPdf || this.isTxt || this.isDoc || this.isHtml) {
        this.previewIcon = true
      }
      try {
        this.previewFile = require(`~/assets/img/icon/file/${this.file.file_type.toLowerCase()}.svg`)
      } catch {
        this.previewFile = require(`~/assets/img/icon/file/general.svg`)
      }
      setTimeout(() => {
        this.$refs.docFile.style.maxHeight = '128px'
      }, 50)
    },
    checkPreview() {
      axios
        .get(this.file.display_file)
        .then(() => {
          return true
        })
        .catch(() => {
          if (this.file.file_preview_id) {
            if (this.file.file_preview_status === 'success') {
              this.previewFile = this.file.compress_file
              this.previewLoaded = true
            } else {
              this.previewLoaded = true
              this.errorHandle()
            }
          } else {
            this.previewLoaded = true
            this.errorHandle()
          }
        })
    },
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
      console.log(1)
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
<style scoped>
.convert-assets-icon.converting {
  animation: rotate 1s infinite both;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
.dropdown-toggle.disabledFileConvert {
  pointer-events: none;
  opacity: 0.4;
  cursor: no-drop;
}
</style>
