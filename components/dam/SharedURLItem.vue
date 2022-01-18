<template>
  <li>
    <div class="tb-column flex3">
      <div class="top-column">
        <label class="check-label">
          <input
            type="checkbox"
            :checked="selected"
            @change="$emit('selection-change', !selected)"
          />
          <span class="check-span"></span>
        </label>
      </div>
    </div>
    <div class="share-url tb-column flex61">
      <div class="top-column">
        <label>
          <component
            :is="revoked ? 'span' : 'a'"
            :href="
              (revoked ? '' : url.share_url)
                | normalizedUrl(url.generated_source)
            "
            :style="{ 'user-select': revoked ? 'none' : '' }"
            target="__blank"
          >
            <component :is="revoked ? 's' : ''">
              {{ url.share_url | normalizedUrl(url.generated_source) }}
            </component>
            {{
              revoked ? '' : url.share_url | normalizedUrl(url.generated_source)
            }}
          </component>
          <span
            v-if="revoked"
            v-tooltip="'URL has been revoked by admin'"
            class="ml-3 revoked-label"
            >Revoked</span
          ></label
        >
      </div>
    </div>
    <div class="generated-date tb-column flex10">
      <div class="top-column">
        <label v-tooltip="$moment(url.updated_at).format('LL LT')">{{
          $moment(url.updated_at).format('Do, MMM YYYY')
        }}</label>
      </div>
    </div>
    <div class="generated-by tb-column flex10">
      <div class="top-column">
        <label>{{ url.userName }}</label>
      </div>
    </div>
    <div class="generated-source tb-column flex10">
      <div class="top-column">
        <label>{{ url.generated_source | normalizedSource }}</label>
      </div>
    </div>
    <div class="share-actions tb-column flex6">
      <ul class="action justify-content-center">
        <li v-if="!revoked">
          <a href="javascript:void(0);" @click="copyShareAssetsLink()">
            <svg
              id="Layer_1"
              v-tooltip="'Copy Shared URL'"
              class="share-link-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 12 12"
              xml:space="preserve"
            >
              <g id="Icon_ionic-ios-link" transform="translate(-3.375 -3.375)">
                <path
                  id="Path_3757"
                  class="fill-color"
                  d="M10.1,11.9L10.1,11.9c-0.1,0-0.2,0.1-0.3,0.1l-1.9,1.9c-0.8,0.8-2.2,0.8-3,0s-0.8-2.2,0-3l0,0l2-2C7,8.8,7.1,8.7,7.2,8.6c0.1-0.1,0.3-0.2,0.4-0.2c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.2,0,0.3,0c0,0,0.1,0,0.1,0c0.5,0,1,0.2,1.4,0.6c0.2,0.2,0.4,0.5,0.5,0.8c0.1,0.2,0.3,0.4,0.6,0.3h0h0c0.2-0.1,0.4-0.3,0.3-0.6c-0.1-0.5-0.4-0.9-0.7-1.2c-0.5-0.4-1-0.7-1.7-0.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.3,0-0.5,0.1c0,0-0.1,0-0.1,0C7.4,7.5,7.2,7.6,7,7.7C6.7,7.8,6.5,8,6.2,8.2l-2,2c-0.6,0.6-0.9,1.3-0.9,2.2c0,1.7,1.4,3,3,3c0.8,0,1.6-0.3,2.1-0.9l1.9-1.9c0.2-0.2,0.2-0.5,0-0.6C10.3,11.9,10.2,11.8,10.1,11.9z"
                ></path>
                <path
                  id="Path_3758"
                  class="fill-color"
                  d="M14.5,4.3c-1.2-1.2-3.1-1.2-4.3,0L8.4,6.1c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.3,0,0.4-0.1l1.8-1.8c0.8-0.8,2.2-0.8,3,0.1c0.8,0.8,0.8,2.1,0,2.9l-2,2c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.2c-0.1,0.1-0.3,0.1-0.4,0.1c-0.1,0-0.2,0-0.3,0c0,0-0.1,0-0.1,0c-0.8,0-1.5-0.6-1.8-1.3C8.3,8.9,8.1,8.8,7.9,8.9C7.6,8.9,7.5,9.2,7.5,9.4c0,0,0,0,0,0c0.1,0.4,0.4,0.8,0.7,1.1l0,0l0,0c0.5,0.5,1.1,0.8,1.8,0.9c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.4-0.1,0.6-0.2c0.3-0.1,0.6-0.3,0.8-0.6l2-2C15.7,7.4,15.7,5.5,14.5,4.3L14.5,4.3z"
                ></path>
              </g>
            </svg>
          </a>
        </li>
        <li>
          <a @click="deletingModel ? null : $refs.deleteDialog.triggerModel()">
            <SpinLoading v-if="deletingModel" />
            <svg
              v-else
              id="Layer_1"
              data-original-title="Delete URL"
              class="delete-icon h-orange"
              data-toggle="tooltip"
              title=""
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 15.3 18"
              xml:space="preserve"
            >
              <g id="Group_4351" transform="translate(-443.472 -147.331)">
                <path
                  id="Path_3410"
                  class="fill-color"
                  d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                ></path>
                <path
                  id="Path_3411"
                  class="fill-color"
                  d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                ></path>
              </g></svg
          ></a>
        </li>
      </ul>
    </div>
    <client-only>
      <DeleteDialog
        ref="deleteDialog"
        header-text="Delete Share URL"
        @click:confirm-button="deleteUrl()"
      >
        <template slot="header">Delete Share URL</template>
        Are you sure you want to delete the <strong>shared URL</strong>?
      </DeleteDialog>
    </client-only>
  </li>
</template>

<script>
import damShareUrl from '~/mixins/damShareUrl'
import { mapSyncModel } from '~/utils/helper'

export default {
  mixins: [damShareUrl],
  props: {
    url: { type: Object, required: true },
    deleting: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
  },
  data() {
    return {
      deletingModel: this.deleting,
    }
  },
  computed: {
    revoked() {
      return this.url.is_active.toString() === '0'
    },
  },
  watch: {
    ...mapSyncModel('deletingModel', 'deleting'),
  },
  mounted() {
    this.loadJS()
  },
  updated() {
    this.loadJS()
  },
  methods: {
    loadJS() {
      window.$('[data-toggle="tooltip"]').tooltip()
    },
    async deleteUrl() {
      if (this.deletingModel) return

      this.deletingModel = true
      await this.$axios
        .$post(`digital/delete-share-assets-url`, {
          workspace_id: this.$getWorkspaceId(),
          share_url_id: this.url.id,
        })
        .then(() => this.$emit('deleted', this.url.id))
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.deletingModel = false
    },
    copyShareAssetsLink() {
      let currentSource = ''
      if (process.client) currentSource = window.location.origin

      // eslint-disable-next-line prefer-const
      let [type, status] = this.url.share_url.split('?').pop().split('&')
      type = type.replace('type=', '')

      const url = `${currentSource}/shared-assets/${type}?${status}`
      const el = document.createElement('textarea')
      el.innerHTML = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.$toast.success('Shared Link Copied')
    },
  },
}
</script>
