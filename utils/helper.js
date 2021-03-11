// export const proxyurl = 'https://cors-anywhere.herokuapp.com/'

export function queue(concurrency = 1) {
  let running = 0
  const taskQueue = []

  const runTask = (task) => {
    running++
    task((_) => {
      running--
      if (taskQueue.length > 0) {
        runTask(taskQueue.shift())
      }
    })
  }

  const enqueueTask = (task) => taskQueue.push(task)

  return {
    push: (task) => (running < concurrency ? runTask(task) : enqueueTask(task)),
  }
}

export function mapSyncModel(data = 'model', prop = 'value') {
  return {
    [prop](propValue) {
      this[data] = propValue
    },
    [data](dataValue) {
      if (prop === 'value') this.$emit('input', dataValue)
      else this.$emit(`update:${prop}`, dataValue)
    },
  }
}

export function debounce(func, wait) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

export function makeMutations(...arr) {
  return arr.reduce((obj, key) => {
    obj[key] = (state, value) => assignValue(state, key, value)

    return obj
  }, {})
}

function assignValue(src, key, value) {
  const paths = key.split('.')

  if (!src) return

  if (paths.length === 1) src[paths[0]] = value
  else assignValue(src[paths[0]], paths.slice(1).join('.'), value)
}
