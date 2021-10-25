<template>
  <li>
    <div class="preview-img">
      <div class="categary-image">
        <a :href="tile.url" target="_blank" class="img-link">
          <img v-if="!isSvg" :src="tile.image" alt="Folder Icon" />
          <div v-else class="icons">
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
const extension = ['.svg', '.png']
export default {
  props: {
    tile: { type: Object, default: () => ({}) },
  },
  computed: {
    isSvg() {
      let x = false
      extension.map((item) => {
        if (this.tile.image_name.includes(item)) {
          x = true
        }
        return item
      })
      return x
    },
  },
}
</script>
