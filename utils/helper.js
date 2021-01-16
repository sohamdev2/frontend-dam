export const proxyurl = 'https://cors-anywhere.herokuapp.com/'

export function mutator(name, after) {
  return function (state, arg) {
    state[name] = arg
    if (after && typeof after === 'function') after(state)
  }
}
