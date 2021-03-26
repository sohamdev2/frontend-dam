import axios from 'axios'
import { makeMutations } from '~/utils/helper'

const _state = () => ({
  pinned: false,
  expanded: true,
  count: 0,
  files: {},
})

export { _state as state }

export const mutations = {
  ...makeMutations('expanded', 'pinned'),
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
  async downloadMultipleFiles(
    { dispatch, commit, state: { files: stateFiles } },
    { files, folders, shareMode = false }
  ) {
    const id = btoa(JSON.stringify({ files, folders }))

    if (stateFiles[id] && stateFiles[id].downloading) return

    // const baseUrl =
    //   this.$config.backendUrl ||
    //   process.env.BACKEND_URL ||
    //   process.env.BACKAND_URL ||
    //   'http://marcom3-dev.whitelabeliq.net'

    const item = {
      id,
      url: id,
      name: 'Zipping selected files/folders',
      progress: 0,
      loaded: 0,
      total: 0,
      downloading: false,
    }

    commit('setDownloadingItem', { id, item })
    commit('pinned', true)
    commit('expanded', true)

    let zipUrl = ''
    let name
    let orgUrl

    try {
      const {
        data: { url, file_name },
      } = await this.$axios.$post('digital/download-multiple-files', {
        workspace_id: this.$getWorkspaceId(),
        digital_assets_id: files,
        category_id: folders,
      })
      orgUrl = file_name
      zipUrl = url
      name = file_name
    } catch (e) {
      this.$showErrorToast(e)
      commit('removeDownloadingItem', id)
      return
    }

    return dispatch('downloadFile', {
      id,
      name,
      url: zipUrl,
      callCountApi: false,
      multiple: true,
      extras: { orgUrl },
    }).then(() =>
      this.$axios.$post('digital/delete-file', {
        workspace_id: this.$getWorkspaceId(),
        file_name: orgUrl,
      })
    )
  },
  downloadFile(
    { commit, state: { files: stateFiles } },
    {
      id,
      url,
      name,
      callCountApi = true,
      useModernDownload = false,
      extras = {},
      multiple,
    }
  ) {
    if (stateFiles[id] && stateFiles[id].downloading) return

    // if (callCountApi)
    //   try {
    //     await this.$axios.$get(
    //       'digital-assets/dashboard/download-count?' +
    //         toQueryString({
    //           workspace_id: this.$getWorkspaceId(),
    //           digital_assets_id: id,
    //         })
    //     )
    //   } catch (e) {
    //     this.$showErrorToast(e)
    //     commit('removeDownloadingItem', id)
    //     return
    //   }

    if (!multiple && !useModernDownload)
      return this.$downloadAsset('Digital Assets', id)

    const item = {
      url,
      name,
      progress: 0,
      loaded: 0,
      total: 0,
      downloading: true,
      ...extras,
    }

    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    item.source = source

    commit('setDownloadingItem', { id, item })

    return axios
      .get(url, {
        cancelToken: source.token,
        responseType: 'blob',
        headers: {
          ...(multiple
            ? {}
            : {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Expires: '0',
              }),
        },
        onDownloadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          item.progress = percentCompleted
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
        this.$showErrorToast(item.errorMessage)
      })
  },
}
