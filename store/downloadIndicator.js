import axios from 'axios'
import { toQueryString } from '~/utils'
import { mutator, proxyurl } from '~/utils/helper'

const _state = () => ({
  pinned: false,
  expanded: true,
  count: 0,
  files: {},
})

export { _state as state }

export const mutations = {
  expanded: mutator('expanded'),
  pinned: mutator('pinned'),
  setDownloadingItem(state, { item, id }) {
    if (!state.files[id]) state.files[id] = Object.assign({}, item)
    else Object.assign(state.files[id], item)

    state.count = Object.keys(state.files).length

    state = Object.assign({}, state)
  },
  removeDownloadingItem(state, id) {
    delete state.files[id]
    state.count = Object.keys(state.files).length
  },
}

export const actions = {
  async downloadMultipleFiles({ dispatch, commit }, { files, folders }) {
    const id = Math.floor(Math.random() * 1e6).toString(16)

    const item = {
      id,
      url: id,
      name: 'Zipping selected files/folders',
      progess: 0,
      loaded: 0,
      total: 0,
      downloading: false,
    }

    commit('setDownloadingItem', { id, item })
    commit('pinned', true)
    commit('expanded', true)

    let zipUrl =
      (process.env.BACKAND_URL || 'https://marcom2-api.whitelabeliq.net') +
      '/upload/dam_assets_zip/'
    let name
    let orgUrl

    try {
      const {
        data: { url },
      } = await this.$axios.$post('digital/download-multiple-files', {
        workspace_id: this.$getWorkspaceId(),
        digital_assets_id: files,
        category_id: folders,
      })
      orgUrl = url
      name = url.split(/(\/|\\)/gm).pop()
      zipUrl += name
    } catch (e) {
      this.$toast.global.error(this.$getErrorMessage(e))
      commit('removeDownloadingItem', id)
      return
    }

    return dispatch('downloadFile', {
      id,
      name,
      url: zipUrl,
      callCountApi: false,
      extras: { orgUrl },
    }).then(() =>
      this.$axios.$post('digital/delete-file', {
        workspace_id: this.$getWorkspaceId(),
        url: orgUrl,
      })
    )
  },
  async downloadFile(
    { commit, state },
    { id, url, name, callCountApi = true, extras = {} }
  ) {
    const files = state.files

    if (files[id] && files[id].downloading) return

    const item = {
      url,
      name,
      progess: 0,
      loaded: 0,
      total: 0,
      downloading: true,
      ...extras,
    }

    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    item.source = source

    commit('setDownloadingItem', { id, item })

    if (callCountApi)
      try {
        await this.$axios.$get(
          'digital/download-count?' +
            toQueryString({
              workspace_id: this.$getWorkspaceId(),
              digital_assets_id: id,
            })
        )
      } catch (e) {
        this.$toast.global.error(this.$getErrorMessage(e))
        commit('removeDownloadingItem', id)
        return
      }

    return axios
      .get(proxyurl + url, {
        cancelToken: source.token,
        responseType: 'blob',
        onDownloadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          item.progess = percentCompleted
          item.loaded = progressEvent.loaded
          item.total = progressEvent.total

          commit('setDownloadingItem', { id, item })
        },
      })
      .then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()

        commit('removeDownloadingItem', id)

        return item
      })
      .catch((e) => {
        item.downloading = false
        item.errorMessage = this.$getErrorMessage(e)

        commit('removeDownloadingItem', id)

        // commit("setDownloadingItem", { id, item });
        this.$toast.global.error(item.errorMessage)
      })
  },
}