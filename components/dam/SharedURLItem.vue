<template>
  <tr>
    <td class="name url-name">
      <component
        :is="revoked ? 'span' : 'a'"
        :href="
          (revoked ? '' : url.share_url) | normalizedUrl(url.generated_source)
        "
        :style="{ 'user-select': revoked ? 'none' : '' }"
        target="__blank"
      >
        <component :is="revoked ? 's' : 'span'">
          {{ url.share_url | normalizedUrl(url.generated_source) }}
        </component>
      </component>
      <div
        v-if="revoked"
        v-tooltip="'URL has been revoked by admin'"
        class="adjusted"
      >
        Revoked
      </div>
    </td>
    <td class="project">
      <span v-tooltip="$moment(url.date).format('LL LT')">
        {{ $moment(url.date).format('Do, MMM YYYY') }}
      </span>
    </td>
    <td class="work-type">
      <span>
        {{ url.userName }}
      </span>
    </td>
    <td class="description">
      <span>
        {{ url.generated_source | normalizedSource }}
      </span>
    </td>
    <td class="description text-center">
      <a
        class="visible-hidden delete-btn"
        @click="$refs.deleteDialog.triggerModel()"
      >
        <img src="~/assets/img/icon/icon-bin.svg" alt="" />
      </a>
    </td>
    <client-only>
      <DeleteDialog
        ref="deleteDialog"
        header-text="Delete Share URL"
        @click:confirm-button="deleteUrl()"
      >
        Are you sure you want to delete <strong>shared URL</strong>?
      </DeleteDialog>
    </client-only>
  </tr>
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
