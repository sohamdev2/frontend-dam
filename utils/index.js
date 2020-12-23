/* eslint-disable no-prototype-builtins */
/**
 * Gives a comparator function which is to be given to Array.sort() function
 *
 * @param {String} field Sort list using the value of this field
 * @param {Boolean} reverse Whether to revese the sorted list
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

    if (typeof a === 'number' && typeof b === 'number') return reverse * (b - a)

    return reverse * ((a > b) - (b > a))
  }
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
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
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

export const imageExtensions = ['jpg', 'png', 'jpeg', 'svg', 'gif']
export const videoExtensions = ['mp4', 'mkv', 'webm', 'mov', 'mpeg-4']
export const pdfExtensions = ['pdf']

export function isPdf(ext) {
  return !!ext && pdfExtensions.includes(ext.toLowerCase())
}

export function isImage(ext) {
  return !!ext && imageExtensions.includes(ext.toLowerCase())
}

export function isVideo(ext) {
  return !!ext && videoExtensions.includes(ext.toLowerCase())
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

export function log() {
  console.log(...arguments)
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
