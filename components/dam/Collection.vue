<template>
  <li>
    <div class="categary-name tb-column flex34">
      <div class="categary-image">
        <img :src="file.preview_image" alt="" />
      </div>
      <div class="top-column">
        <label
          style="cursor: pointer"
          @click.capture.stop="collectionDetails"
          >{{ file.name }}</label
        >
      </div>
    </div>
    <div
      class="collection-description tb-column flex26"
      @click.capture.stop="collectionDesc"
    >
      <div class="top-column">
        <label
          data-toggle="modal"
          data-target="#collection-description-modal"
          :style="{ cursor: file.description === null ? 'default' : 'pointer' }"
          >{{ file.description !== null ? file.description : '-' }}</label
        >
      </div>
    </div>
    <div class="assets tb-column flex12">
      <div class="top-column">
        <label> {{ $moment(file.updated_at).format('Do MMM, YYYY') }}</label>
      </div>
    </div>
    <div class="update-date tb-column flex12">
      <div class="top-column">
        <label>{{ $auth.user.name }}</label>
      </div>
    </div>
    <div class="size tb-column flex8">
      <div class="top-column">
        <label>{{ file.assets_count }}</label>
      </div>
    </div>
    <div class="categary-action tb-column flex8">
      <div class="top-column">
        <div class="categary-actions text-center">
          <a
            data-toggle="modal"
            data-target="#sharePopup"
            :class="{ isEmpty: file.assets_count === 0 }"
            @click.capture.stop="shareCollection"
          >
            <svg
              id="Layer_1"
              v-tooltip="{
                html: false,
                content: isEmpty,
              }"
              class="share-icon h-orange"
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
          </a>
        </div>
      </div>
    </div>
    <client-only>
      <ShareFile ref="shareDialog" :files="[file]" collection type="folder" />
      <DescriptionDialog ref="descDialog" :collection="file" />
    </client-only>
  </li>
</template>

<script>
export default {
  props: {
    file: { type: Object, default: () => ({}) },
  },
  computed: {
    isEmpty() {
      return this.file.assets_count > 0
        ? 'Share Collection'
        : 'Collection is empty'
    },
  },
  methods: {
    collectionDesc() {
      if (this.file.description !== null) {
        this.$refs.descDialog.toggleModel()
      }
    },
    collectionDetails() {
      this.$router.push({
        name: 'brand_name-collection-id',
        params: {
          brand_name: this.$getBrandName(),
          id: this.file.id,
        },
      })
    },
    shareCollection() {
      if (this.file.assets_count > 0) {
        this.$refs.shareDialog.toggleModel()
      }
    },
  },
}
</script>

<style scoped>
.isEmpty {
  opacity: 0.4;
}
</style>
