import { mutator, queue } from '~/utils/helper'

const thumbnailCache = new Map()
const thumbnailQueue = queue(5)

const _state = () => ({
  brandName: '',
})

export { _state as state }

export const mutations = {
  brandName: mutator('brandName'),
}

export const actions = {
  nuxtServerInit({ dispatch }) {
    if (this.$auth.loggedIn) {
      dispatch('appData/fetchDashboardData')
      dispatch('appData/fetchFolders')
    }
  },
  getThumbnail(_, url) {
    if (!process.client) return

    if (thumbnailCache.has(url))
      return new Promise((resolve) => resolve(thumbnailCache.get(url)))

    return new Promise((resolve, reject) => {
      thumbnailQueue.push((done) => {
        const video = document.createElement('video')
        video.src = url
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        video.addEventListener(
          'loadeddata',
          function () {
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            video.pause()
            const dataURL = canvas.toDataURL('image/jpeg')
            thumbnailCache.set(url, dataURL)

            resolve(dataURL)
            done()
          },
          false
        )
        video.addEventListener('error', reject)

        video.muted = true
        video.playsInline = true
        video.setAttribute('crossOrigin', 'anonymous')
        video.preload = 'metadata'
        video.playbackRate = 1.5

        video.play()
      })
    })
  },
}
