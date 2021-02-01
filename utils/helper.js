export const proxyurl = 'https://cors-anywhere.herokuapp.com/'

export function mutator(name, after) {
  return function (state, arg) {
    state[name] = arg
    if (after && typeof after === 'function') after(state)
  }
}

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
