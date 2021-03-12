<template>
  <li style="position: relative">
    <img :src="previewImage" height="18" :alt="file.display_file_name" />
    <span class="file-name">
      <span
        v-tooltip="file.display_file_name"
        :title="file.display_file_name"
        >{{ file.display_file_name | shrinkString(46, 12) }}</span
      >
    </span>
  </li>
</template>

<script>
import fileType from '~/mixins/fileType'

export default {
  mixins: [fileType],
  props: { file: { type: Object, required: true } },
}
</script>
