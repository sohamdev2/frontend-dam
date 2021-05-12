const MARCOM_URL = process.env.MARCOM_URL

let currentSource = ''
if (process.client) currentSource = window.location.origin

export default {
  filters: {
    normalizedSource: (source) => (source === 'admin' ? 'Backend' : 'Frontend'),
    normalizedUrl(url, source = 'admin') {
      if (!url) return ''

      // eslint-disable-next-line prefer-const
      let [type, status] = url.split('?').pop().split('&')
      type = type.replace('type=', '')

      return `${
        source === 'admin' ? MARCOM_URL : currentSource
      }/shared-assets/${type}?${status}`
    },
  },
}
