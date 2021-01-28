<template>
  <li>
    <img :src="previewImage" height="18" />
    {{ file.display_file_name }}
  </li>
</template>

<script>
import fileType from '~/mixins/fileType'

export default {
  mixins: [fileType],
  props: { file: { type: Object, required: true } },
}
</script>

<style></style>
