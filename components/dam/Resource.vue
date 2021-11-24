<template>
  <li
    :class="{
      selected,
      video: isVideo,
      image: isImage,
      'assets-private': file.is_public === 0,
    }"
    v-on="{
      ...(isVideo
        ? {
            mouseenter: playVideo,
            mouseleave: pauseVideo,
          }
        : {}),
    }"
  >
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
            <div :class="{ icons: videoThumbnail == previewImage }">
              <img :src="videoThumbnail" />
            </div>
            <video
              ref="video"
              class="thevideo"
              :src="file.display_file + '#t=0,5'"
              playsinline
              muted
              preload="metadata"
            >
              <!-- <source :src="file.display_file" type="video/mp4" /> -->
              Your browser does not support the video tag.
            </video>
          </nuxt-link>
          <client-only>
            <div
              style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
              "
            >
              <ContentLoader
                v-if="(isImage && imageLoading) || videoThumbnailFetching"
                style="position: absolute; top: 0; right: 0; left: 0; bottom: 0"
                :speed="1"
                :width="100"
                :height="100"
                :animate="true"
                class="normalLoader"
              >
                <rect x="0" y="0" rx="2" ry="2" width="100" height="100" />
              </ContentLoader>
            </div>
          </client-only>

          <div class="video-info">
            <div class="upper-info">
              <span :inner-html.prop="file.file_type || '&dash;'"></span>
              <!-- <a
                v-if="!shareMode"
                @click="
                  emitShare
                    ? $emit('share', file)
                    : $refs.shareDialog.toggleModel()
                "
              >
                <img src="~/assets/img/share.svg" alt="" class="white-icon" />
              </a> -->
              <div class="d-flex align-items-center">
                <div
                  class="dropdown more-options"
                  :class="{ show: dropDownList }"
                >
                  <button
                    type="button"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    @click.capture.stop="dropDown()"
                  >
                    <svg
                      id="Layer_1"
                      class="menu-option-icon h-orange"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_4482" transform="translate(-872 -801)">
                        <rect
                          id="Rectangle_3020"
                          x="872"
                          y="801"
                          class="fill-hide"
                          width="18"
                          height="18"
                        ></rect>
                        <g
                          id="Group_4348"
                          transform="translate(588.166 653.684)"
                        >
                          <circle
                            id="Ellipse_203"
                            class="fill-color"
                            cx="292.8"
                            cy="148.9"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-2"
                            class="fill-color"
                            cx="292.8"
                            cy="163.8"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-3"
                            class="fill-color"
                            cx="292.8"
                            cy="156.3"
                            r="1.5"
                          ></circle>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <ul class="dropdown-menu" :class="{ show: dropDownList }">
                    <li v-if="!shareMode && file.is_public === 1">
                      <a
                        class="dropdown-item"
                        data-toggle="modal"
                        data-target="#sharePopup"
                        @click.capture.stop="selectFromDrop(file, 'share')"
                        ><span class="dropdown-item-icon"
                          ><svg
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
                            </g></svg></span
                        >Share</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        @click.capture.stop="selectFromDrop(file, 'download')"
                        ><span class="dropdown-item-icon"
                          ><svg
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
                            </g></svg></span
                        >Download</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
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
                  <svg
                    v-if="paused"
                    id="Layer_1"
                    class="play-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 20 20"
                    xml:space="preserve"
                  >
                    <path
                      id="Icon_material-play-circle-outline"
                      class="fill-color"
                      d="M8,14.5l6-4.5L8,5.5V14.5z M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0z M10,18c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8C18,14.4,14.4,18,10,18z"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    id="Layer_1"
                    class="pause-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 20 20"
                    xml:space="preserve"
                  >
                    <path
                      id="Icon_material-play-circle-outline"
                      class="fill-color"
                      d="M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0z M10,18c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S14.4,18,10,18z M13,13H7V7h6V13z"
                    />
                  </svg>
                </a>
                <a
                  ref="expandButton"
                  :href="`#file-video-${file.id}`"
                  data-fancybox
                  ><svg
                    id="Layer_1"
                    class="expand-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 16 16"
                    xml:space="preserve"
                  >
                    <path
                      id="Icon_awesome-expand"
                      class="fill-color"
                      d="M0,5.3V0.9C0,0.4,0.4,0,0.9,0c0,0,0,0,0,0h4.4c0.2,0,0.4,0.2,0.4,0.4v1.4c0,0.2-0.2,0.4-0.4,0.4h-3v3c0,0.2-0.2,0.4-0.4,0.4H0.4C0.2,5.7,0,5.5,0,5.3z M10.3,0.4v1.4c0,0.2,0.2,0.4,0.4,0.4h3v3c0,0.2,0.2,0.4,0.4,0.4h1.4c0.2,0,0.4-0.2,0.4-0.4V0.9C16,0.4,15.6,0,15.1,0c0,0,0,0,0,0h-4.4C10.5,0,10.3,0.2,10.3,0.4z M15.6,10.3h-1.4c-0.2,0-0.4,0.2-0.4,0.4v3h-3c-0.2,0-0.4,0.2-0.4,0.4v1.4c0,0.2,0.2,0.4,0.4,0.4h4.4c0.5,0,0.9-0.4,0.9-0.9c0,0,0,0,0,0v-4.4C16,10.5,15.8,10.3,15.6,10.3L15.6,10.3z M5.7,15.6v-1.4c0-0.2-0.2-0.4-0.4-0.4h-3v-3c0-0.2-0.2-0.4-0.4-0.4H0.4c-0.2,0-0.4,0.2-0.4,0.4v4.4C0,15.6,0.4,16,0.9,16c0,0,0,0,0,0h4.4C5.5,16,5.7,15.8,5.7,15.6z"
                    ></path>
                  </svg>
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
            <div v-if="isDoc" :class="{ icons: !isDoc }">
              <img
                v-show="!imageLoading"
                :src="previewImage"
                @load="imageLoading = false"
                @error="errorHandle"
              />
            </div>
            <div v-else-if="isTxt" :class="{ icons: !isTxt || filePreview }">
              <img
                v-show="!imageLoading"
                :src="previewImage"
                @load="imageLoading = false"
                @error="errorHandle"
              />
            </div>
            <div v-else-if="isHtml" :class="{ icons: !isHtml || filePreview }">
              <img
                v-show="!imageLoading"
                :src="previewImage"
                @load="imageLoading = false"
                @error="errorHandle"
              />
            </div>
            <div
              v-else
              :class="{
                icons: !hasZipCompressedImage && (!isImage || filePreview),
              }"
            >
              <img
                v-show="!imageLoading"
                :src="file.compress_file || previewImage"
                @load="imageLoading = false"
                @error="errorHandle"
              />
            </div>
          </nuxt-link>
          <client-only>
            <div
              style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
              "
            >
              <ContentLoader
                v-if="(isImage && imageLoading) || videoThumbnailFetching"
                style="position: absolute; top: 0; right: 0; left: 0; bottom: 0"
                :speed="1"
                :width="100"
                :height="100"
                :animate="true"
                class="normalLoader"
              >
                <rect x="0" y="0" rx="2" ry="2" width="100" height="100" />
              </ContentLoader>
            </div>
          </client-only>
          <div class="video-info">
            <div class="upper-info">
              <span :inner-html.prop="file.file_type || '&dash;'"></span>
              <!-- <a
                v-if="!shareMode"
                @click="
                  emitShare
                    ? $emit('share', file)
                    : $refs.shareDialog.toggleModel()
                "
              >
                <img src="~/assets/img/share.svg" alt="" class="white-icon" />
              </a> -->
              <div class="d-flex align-items-center">
                <div
                  class="dropdown more-options"
                  :class="{ show: dropDownList }"
                >
                  <button
                    type="button"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                    @click.capture.stop="dropDown()"
                  >
                    <svg
                      id="Layer_1"
                      class="menu-option-icon h-orange"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_4482" transform="translate(-872 -801)">
                        <rect
                          id="Rectangle_3020"
                          x="872"
                          y="801"
                          class="fill-hide"
                          width="18"
                          height="18"
                        ></rect>
                        <g
                          id="Group_4348"
                          transform="translate(588.166 653.684)"
                        >
                          <circle
                            id="Ellipse_203"
                            class="fill-color"
                            cx="292.8"
                            cy="148.9"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-2"
                            class="fill-color"
                            cx="292.8"
                            cy="163.8"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-3"
                            class="fill-color"
                            cx="292.8"
                            cy="156.3"
                            r="1.5"
                          ></circle>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <ul class="dropdown-menu" :class="{ show: dropDownList }">
                    <li v-if="!shareMode && file.is_public === 1">
                      <a
                        class="dropdown-item"
                        data-toggle="modal"
                        data-target="#sharePopup"
                        @click.capture.stop="selectFromDrop(file, 'share')"
                        ><span class="dropdown-item-icon"
                          ><svg
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
                            </g></svg></span
                        >Share</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        @click.capture.stop="selectFromDrop(file, 'download')"
                        ><span class="dropdown-item-icon"
                          ><svg
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
                            </g></svg></span
                        >Download</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
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
                ><svg
                  id="Layer_1"
                  class="expand-icon white"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 16 16"
                  xml:space="preserve"
                >
                  <path
                    id="Icon_awesome-expand"
                    class="fill-color"
                    d="M0,5.3V0.9C0,0.4,0.4,0,0.9,0c0,0,0,0,0,0h4.4c0.2,0,0.4,0.2,0.4,0.4v1.4c0,0.2-0.2,0.4-0.4,0.4h-3v3c0,0.2-0.2,0.4-0.4,0.4H0.4C0.2,5.7,0,5.5,0,5.3z M10.3,0.4v1.4c0,0.2,0.2,0.4,0.4,0.4h3v3c0,0.2,0.2,0.4,0.4,0.4h1.4c0.2,0,0.4-0.2,0.4-0.4V0.9C16,0.4,15.6,0,15.1,0c0,0,0,0,0,0h-4.4C10.5,0,10.3,0.2,10.3,0.4z M15.6,10.3h-1.4c-0.2,0-0.4,0.2-0.4,0.4v3h-3c-0.2,0-0.4,0.2-0.4,0.4v1.4c0,0.2,0.2,0.4,0.4,0.4h4.4c0.5,0,0.9-0.4,0.9-0.9c0,0,0,0,0,0v-4.4C16,10.5,15.8,10.3,15.6,10.3L15.6,10.3z M5.7,15.6v-1.4c0-0.2-0.2-0.4-0.4-0.4h-3v-3c0-0.2-0.2-0.4-0.4-0.4H0.4c-0.2,0-0.4,0.2-0.4,0.4v4.4C0,15.6,0.4,16,0.9,16c0,0,0,0,0,0h4.4C5.5,16,5.7,15.8,5.7,15.6z"
                  ></path>
                </svg>
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
        <svg
          v-if="(mode === 'row' || 'tile') && file.is_public === 0"
          id="_x31__x2C_5"
          class="locked-icon h-orange"
          data-toggle="tooltip"
          title=""
          data-original-title="For internal use only"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xml:space="preserve"
        >
          <path
            class="fill-color"
            d="M400,512H112c-26.5,0-48-21.5-48-48V240c0-26.5,21.5-48,48-48h288c26.5,0,48,21.5,48,48v224C448,490.5,426.5,512,400,512zM112,224c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16h288c8.8,0,16-7.2,16-16V240c0-8.8-7.2-16-16-16H112z"
          />
          <path
            class="fill-color"
            d="M368,224c-8.8,0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96,43.1-96,96v80c0,8.8-7.2,16-16,16s-16-7.2-16-16v-80C128,57.4,185.4,0,256,0s128,57.4,128,128v80C384,216.8,376.8,224,368,224z"
          />
          <path
            class="fill-color"
            d="M256,362.7c-23.5,0-42.7-19.1-42.7-42.7c0-23.5,19.1-42.7,42.7-42.7s42.7,19.1,42.7,42.7C298.7,343.5,279.5,362.7,256,362.7z M256,309.3c-5.9,0-10.7,4.8-10.7,10.7s4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7S261.9,309.3,256,309.3z"
          />
          <path
            class="fill-color"
            d="M256,426.7c-8.8,0-16-7.2-16-16V352c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v58.7C272,419.5,264.8,426.7,256,426.7z"
          />
        </svg>
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
            href="javascript:void(0);"
            data-toggle="tooltip"
            title=""
            data-original-title="For internal use only"
          >
            <svg
              v-if="(mode === 'column' || 'list') && file.is_public === 0"
              id="_x31__x2C_5"
              class="locked-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <path
                class="fill-color"
                d="M400,512H112c-26.5,0-48-21.5-48-48V240c0-26.5,21.5-48,48-48h288c26.5,0,48,21.5,48,48v224C448,490.5,426.5,512,400,512zM112,224c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16h288c8.8,0,16-7.2,16-16V240c0-8.8-7.2-16-16-16H112z"
              />
              <path
                class="fill-color"
                d="M368,224c-8.8,0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96,43.1-96,96v80c0,8.8-7.2,16-16,16s-16-7.2-16-16v-80C128,57.4,185.4,0,256,0s128,57.4,128,128v80C384,216.8,376.8,224,368,224z"
              />
              <path
                class="fill-color"
                d="M256,362.7c-23.5,0-42.7-19.1-42.7-42.7c0-23.5,19.1-42.7,42.7-42.7s42.7,19.1,42.7,42.7C298.7,343.5,279.5,362.7,256,362.7z M256,309.3c-5.9,0-10.7,4.8-10.7,10.7s4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7S261.9,309.3,256,309.3z"
              />
              <path
                class="fill-color"
                d="M256,426.7c-8.8,0-16-7.2-16-16V352c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v58.7C272,419.5,264.8,426.7,256,426.7z"
              />
            </svg>
          </a>
          <a
            v-if="!shareMode && file.is_public === 1"
            class="share-it action-btn"
            @click="
              emitShare ? $emit('share', file) : $refs.shareDialog.toggleModel()
            "
          >
            <svg
              id="Layer_1"
              data-original-title="Share File"
              class="share-icon h-orange"
              data-toggle="tooltip"
              title=""
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
              aria-describedby="tooltip469646"
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
          </a>
          <a @click="downloadFile">
            <svg
              id="Layer_1"
              data-original-title="Download File"
              class="download-icon h-orange"
              data-toggle="tooltip"
              title=""
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
      dropDownList: false,
    }
  },
  computed: {
    hasZipCompressedImage() {
      return (
        this.file.file_type === 'zip' &&
        (this.file.compress_file || '').length > 0
      )
    },
    filePreview() {
      let x = null
      if (this.file.file_preview_id) {
        if (
          this.file.file_preview_status === 'pending' ||
          this.file.file_preview_status === 'started'
        ) {
          x = true
        } else {
          x = false
        }
      } else if (this.isImage) {
        x = false
      } else if (this.isTxt || this.isPdf || this.isDoc) {
        x = true
      }
      return x
    },
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
      if (paused) video.pause()
      else video.play()
    },
  },

  mounted() {
    this.$bus.$on('closeDropDown', () => {
      if (this.dropDownList === true) {
        this.dropDownList = false
      }
    })
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
    errorHandle(data) {
      try {
        data.target.src = require(`~/assets/img/icon/file/${this.file.file_type.toLowerCase()}.svg`)
      } catch {
        data.target.src = require(`@/assets/img/icon/file/general.svg`)
      }
      data.target.parentElement.classList.add('icons')
    },
    loadJS() {
      window.$('[data-toggle="tooltip"]').tooltip()
    },
    // dropdown feature
    selectFromDrop(file, type) {
      this.dropDown()
      if (type === 'share') {
        if (this.emitShare) {
          this.$emit('share', file)
        } else {
          this.$nextTick(() => this.$refs.shareDialog.toggleModel())
        }
      } else if (type === 'download') {
        this.downloadFile()
      }
      this.$emit('selectedDrop', file, type, 'file')
    },
    // display of dropdown menu
    dropDown() {
      this.dropDownList = !this.dropDownList
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

    pauseVideo() {
      if (!this.paused && this.isPlaying) {
        const video = this.$refs.video

        this.$suppressError(() => {
          this.playingModel = false
          // this.playtime = video.currentTime
          video.pause()
        })
      }
    },
    playVideo() {
      if (!this.paused) {
        const video = this.$refs.video
        video.ontimeupdate = function () {
          if (video.currentTime >= 5) {
            const tmp_src = video.src

            video.src = ''
            video.src = tmp_src
            video.currentTime = 0
            video.play()
          }
        }
        this.$suppressError(() => {
          this.playingModel = true
          video.play()
          // video.play()?.catch(() => {
          //   this.videoError = true
          // })
        })
      }
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
