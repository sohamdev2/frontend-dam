/* eslint-disable no-prototype-builtins */

export function isSame(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

/**
 * Gives a comparator function which is to be given to Array.sort() function
 *
 * @param {String} field Sort list using the value of this field
 * @param {Boolean} reverse Whether to reverse the sorted list
 * @param {(x) => Any} primer Function to access nested field
 * @returns {(a, b) => Number} comparator function to given to Array.sort() function
 */
export function sortBy(field, reverse, primer, ignoreCase = false) {
  const key = primer ? (x) => primer(x[field]) : (x) => x[field]

  reverse = !reverse ? 1 : -1

  return function (a, b) {
    a = key(a)
    b = key(b)

    if (a === null) return reverse * 1
    else if (b === null) return reverse * -1

    if (ignoreCase) {
      a = a && a.toUpperCase()
      b = b && b.toUpperCase()
    }

    // if (typeof a === "number" && typeof b === "number")
    //   return reverse * (a - b);

    return reverse * ((a > b) - (b > a))
  }
}

export const shrinkString = (originStr, maxChars, trailingCharCount) => {
  let shrinkedStr = originStr
  const shrinkedLength = maxChars - trailingCharCount - 3

  if (maxChars + trailingCharCount + 3 > shrinkedStr.length) return shrinkedStr

  if (originStr.length > shrinkedLength) {
    const front = originStr.substr(0, shrinkedLength)
    const mid = '...'
    const end = originStr.substr(-trailingCharCount)
    shrinkedStr = front.trim() + mid + end.trim()
  }

  return shrinkedStr
}

export function deepSearch(object, key, predicate) {
  if (object.hasOwnProperty(key) && predicate(key, object[key]) === true)
    return object

  for (let i = 0; i < Object.keys(object).length; i++) {
    const value = object[Object.keys(object)[i]]
    if (typeof value === 'object' && value != null) {
      const o = deepSearch(object[Object.keys(object)[i]], key, predicate)
      if (o != null) return o
    }
  }
  return null
}

export function getMarkedText(text, search, tag = 'mark') {
  if (!search) return text

  try {
    return text.replace(new RegExp(`(${search})`, 'ig'), `<${tag}>$1</${tag}>`)
  } catch {
    return text
  }
}

export function toHumanlySize(size) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  size = Number(size)
  let index = 0
  while (size > 900) {
    size /= 1024
    index += 1
  }

  return (
    Number(Math.round(size * 100) / 100).toLocaleString() + ' ' + sizes[index]
  )
}

export function getValidationMessage({ message, response }) {
  let _message = ''

  if (response) {
    const {
      data: { error },
      message,
    } = response

    if (error) [_message] = Object.values(error || {})

    _message = _message || message
  }

  return _message || message
}

export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// eslint-disable-next-line camelcase
export function downloadAsset(attachment_type, assets_id) {
  const downloadURL = `/get_assets?${this.$toQueryString({
    attachment_type,
    assets_id,
  })}`

  const link = document.createElement('a')
  link.href = window.location.origin + downloadURL
  document.body.appendChild(link)
  link.click()
}

const filterMetaInfo = [
  'undefined',
  'thumbnail',
  'COMMENT',
  'MakerNote',
  'UserComment',
  'UndefinedTag:0x9999',
  'UndefinedTag:0x8889',
  'UndefinedTag:0x9010',
  'ComponentsConfiguration',
  'COMPUTED',
  'FileName',
  'SectionsFound',
  'FileDateTime',
  'SceneType',
  'SceneCaptureType',
  'THUMBNAIL',
]

export function deleteMetaKeys(array) {
  filterMetaInfo.forEach((key) => delete array[key])
}

const isUpperCase = (char) => char >= 'A' && char <= 'Z'
const isLowerCase = (char) => char >= 'a' && char <= 'z'

/**
 * Convert `SnakeCaseWords` to `Normal Case Words"
 * eg SnakeCaseWords => Snake Case Words
 * eg SnakeCaseWords => Snake Case Words
 *
 * @param {String} key
 * @author Pranav Raut
 */
export function camelCaseToNormalCase(key) {
  const words = [key[0]]
  let index = 0

  key
    .slice(1)
    .split('')
    .forEach((char, i) => {
      if (isUpperCase(char) && isLowerCase(key[i + 2])) {
        words.push(char)
        index += 1
      } else words[index] += char + ''
    })

  return words.join(' ')
}

export function getFormattedMetaValue(value, key, tooltip) {
  switch (key) {
    case 'FileName':
      return tooltip ? value : shrinkString(value, 50, 12)
    case 'FileSize':
      return this.$toHumanlySize(value)
    case 'FileDateTime':
      return this.$moment(value * 1000).format('Do MMM, YYYY')
    case 'Orientation':
    case 'orientation':
      if (value === 1 || value === 2) return 'landscape'
      else if (value === 6 || value === 8 || value === 5 || value === 7)
        return 'portrait '
      else if (value === 1 || value === 2) return 'upside-down landscape'
      else return value
    case 'ImageWidth':
    case 'ImageHeight':
    case 'ExifImageLength':
    case 'ExifImageHeight':
    case 'ExifImageWidth':
      return `${value}px`
    case 'GPSDateStamp':
      return this.$moment(value, 'YYYY:MM:DD').format('Do MMM, YYYY')
    case 'DateUploaded':
    case 'LastModified':
      return this.$moment(value, 'D MMM YYYY').format('Do MMM, YYYY')
    case 'DateTime':
    case 'DateTimeOriginal':
    case 'DateTimeDigitized':
      return this.$moment(value, 'YYYY:MM:DD hh:mm:ss').format(
        'Do MMM, YYYY hh:mm A'
      )
    case 'MakerNote':
    case 'UserComment':
      return tooltip ? '' : '&dash;'
  }

  return value || (tooltip ? '' : '&dash;')
}

export const imageExtensions = ['jpg', 'png', 'jpeg', 'svg', 'gif']
export const videoExtensions = [
  'mp4',
  'mkv',
  'webm',
  'mov',
  'mpeg-4',
  'mov',
  // 'avi',
  '3gp',
]
export const pdfExtensions = ['pdf']
export const docExtensions = [
  'doc',
  'docx',
  'ppt',
  'pptx',
  'xlsx',
  'xls',
  'dotx',
]
export const audioExtensions = ['mp3', 'wav', 'wma', 'aac']
export const txtExtensions = ['txt']

export function isPdf(ext) {
  return !!ext && pdfExtensions.includes(ext.toLowerCase())
}

export function isImage(ext) {
  return !!ext && imageExtensions.includes(ext.toLowerCase())
}

export function isVideo(ext) {
  return !!ext && videoExtensions.includes(ext.toLowerCase())
}

export function isTxt(ext) {
  return !!ext && txtExtensions.includes(ext.toLowerCase())
}

export function isDoc(ext) {
  return !!ext && docExtensions.includes(ext.toLowerCase())
}

export function isAudio(ext) {
  return !!ext && audioExtensions.includes(ext.toLowerCase())
}

export function toQueryString(obj) {
  const params = []

  if (!obj || typeof obj !== 'object') return ''

  Object.entries(obj).forEach(([key, value]) =>
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  )

  return params.join('&')
}

export function getFileExt(fileName) {
  fileName = fileName.toLowerCase()
  return fileName.split('.').pop()
}

export function suppressError(fun) {
  try {
    fun()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.info('suppressError:', e)
  }
}

export const sortToUpperCase = (x) => String(x).toLocaleUpperCase()
export function sortOrNull(x) {
  return (x && sortToUpperCase(x)) || null
}
export const sortToTime = (x, reverse) =>
  (x && x !== '0000-00-00 00:00:00' && new Date(x).getTime()) ||
  (reverse ? -Infinity : Infinity)

export const sortToTypedNumber = (x) => Number(x)

export function log(...args) {
  // eslint-disable-next-line no-console
  console.log(...args)
}

export function stringToRegex(input) {
  // eslint-disable-next-line
  input = input && input.trim().replace(/([\[\]\\\^\$\.\|\?\*\+\(\)])/g, '\\$1')

  return input && new RegExp(input, 'ig')
}

export function localeNumber(value) {
  return Number(value).toLocaleString()
}

export function shuffle(array) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
