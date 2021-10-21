<template>
  <li>
    <div class="preview-img">
      <div class="categary-image">
        <a :href="tile.url" target="_blank" class="img-link">
          <div class="icons">
            <img :src="tile.image" alt="Folder Icon" />
          </div>
        </a>
      </div>
    </div>
    <div class="categary-name">
      <div class="top-column">
        <a :href="tile.url">{{ tile.title }}</a>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    tile: { type: Object, default: () => ({}) },
  },
}
</script>
