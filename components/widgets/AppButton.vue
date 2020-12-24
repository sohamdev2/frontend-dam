<template>
  <button
    :type="type"
    class="btn btn-block cs-btn"
    :class="{ 'btn-disable': disabled }"
  >
    <template v-if="loading">
      <slot name="loading"> </slot>
      <i class="fa fa-circle-o-notch fa-spin"></i>
    </template>
    <slot v-else>Submit</slot>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'button' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
}
</script>
