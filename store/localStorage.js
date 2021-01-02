import { mutator } from '~/utils/helper'

const _state = () => ({
  brandName: '',
})

export { _state as state }

export const mutations = {
  brandName: mutator('brandName'),
}

export const actions = {}
