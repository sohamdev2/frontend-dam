<template>
  <button
    :type="type"
    class="cs-btn-orange btn-block btn-spiner"
    :class="{ 'btn-disable': disabled }"
  >
    <template v-if="loading">
      <i class="fa fa-circle-o-notch fa-spin"></i>
      <slot name="loading"> </slot>
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
