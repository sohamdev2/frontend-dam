<template>
  <div class="share-wrapper">
    <div class="share-box d-flex align-items-center">
      <div
        class="profile-bg flex-20"
        :style="{ backgroundImage: `url('${previewImage}')` }"
      ></div>
      <div class="share-name flex-80 pl-2">
        <label v-tooltip="file.display_file_name">{{
          file.display_file_name | shrinkString(46, 12)
        }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import fileType from '~/mixins/fileType'

export default {
  mixins: [fileType],
  props: { file: { type: Object, required: true } },
}
</script>
