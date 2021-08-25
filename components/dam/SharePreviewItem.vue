<template>
  <div class="share-box d-flex align-items-center">
    <div
      class="profile-bg flex-20"
      :style="{
        backgroundImage: collection
          ? `url('${file.preview_image}')`
          : `url('${previewImage}')`,
      }"
    ></div>
    <div class="share-name flex-80 pl-2">
      <label v-tooltip="file.display_file_name || file.name">{{
        file.display_file_name || file.name | shrinkString(46, 12)
      }}</label>
    </div>
    <svg
      v-if="file.is_public === 0"
      id="_x31__x2C_5"
      class="locked-icon h-orange"
      data-toggle="tooltip"
      title=""
      data-original-title="For internal use only and will not be shared."
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
      ></path>
      <path
        class="fill-color"
        d="M368,224c-8.8,0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96,43.1-96,96v80c0,8.8-7.2,16-16,16s-16-7.2-16-16v-80C128,57.4,185.4,0,256,0s128,57.4,128,128v80C384,216.8,376.8,224,368,224z"
      ></path>
      <path
        class="fill-color"
        d="M256,362.7c-23.5,0-42.7-19.1-42.7-42.7c0-23.5,19.1-42.7,42.7-42.7s42.7,19.1,42.7,42.7C298.7,343.5,279.5,362.7,256,362.7z M256,309.3c-5.9,0-10.7,4.8-10.7,10.7s4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7S261.9,309.3,256,309.3z"
      ></path>
      <path
        class="fill-color"
        d="M256,426.7c-8.8,0-16-7.2-16-16V352c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v58.7C272,419.5,264.8,426.7,256,426.7z"
      ></path>
    </svg>
  </div>
</template>

<script>
import fileType from '~/mixins/fileType'

export default {
  mixins: [fileType],
  props: {
    file: { type: Object, required: true },
    collection: { type: Boolean, default: false },
  },
}
</script>
