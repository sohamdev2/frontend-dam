export const proxyurl = 'https://cors-anywhere.herokuapp.com/'

export function mutator(name) {
  return (state, arg) => (state[name] = arg)
}
