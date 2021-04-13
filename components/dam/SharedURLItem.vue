<template>
  <li>
    <div class="share-url tb-column flex50">
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
            <component :is="revoked ? 's' : 'span'">
              {{ url.share_url | normalizedUrl(url.generated_source) }}
            </component>
          </component>
          <span
            v-if="revoked"
            v-tooltip="'URL has been revoked by admin'"
            class="btn ml-3 revoked-label"
            >Revoked</span
          ></label
        >
      </div>
    </div>
    <div class="generated-date tb-column flex15 m-sm-hide">
      <div class="top-column">
        <label v-tooltip="$moment(url.updated_at).format('LL LT')">{{
          $moment(url.updated_at).format('Do, MMM YYYY')
        }}</label>
      </div>
    </div>
    <div class="generated-by tb-column flex15">
      <div class="top-column">
        <label>{{ url.userName }}</label>
      </div>
    </div>
    <div class="generated-source tb-column flex15">
      <div class="top-column">
        <label>{{ url.generated_source | normalizedSource }}</label>
      </div>
    </div>
    <div class="share-actions tb-column flex5 text-center">
      <ul class="action justify-content-center">
        <li>
          <a @click="$refs.deleteDialog.triggerModel()"
            ><img src="~/assets/img/delete.svg" alt=""
          /></a>
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
  methods: {
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
  },
}
</script>
