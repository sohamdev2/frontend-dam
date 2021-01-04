<template>
  <select multiple>
    <slot></slot>
  </select>
</template>

<script>
function custom_template(obj) {
  const image = obj.display_profile_image
  const text = obj.text

  if (image)
    return window.$('<span><img src="' + image + '"></span><p>' + text + '</p>')
  return window.$(`<p style="padding-left: 0.25rem">${text}</p>`)
}

export default {
  name: 'Select2Multiple',
  props: {
    options: [Array, Object, String, Boolean],
    value: [Number, String, Array],
    placeholder: String,
    customEvent: Boolean,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(value) {
      window.$(this.$el).val(value).trigger('change')
    },
    options(options) {
      window
        .$(this.$el)
        .empty()
        .select2({
          multiple: true,
          data: this.options,
          placeholder: this.placeholder,
          // allowClear: true,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
          templateSelection: custom_template,
          templateResult: custom_template,
        })
        .val(this.value)
        .trigger('change')
    },
    disabled(newVal) {
      window.$(this.$el).prop('disabled', newVal)
    },
  },
  mounted() {
    this.init()
  },
  updated() {
    this.init()
  },
  destroyed() {
    setTimeout(() => window.$(this.$el).off().select2('destroy'), 50)
  },
  methods: {
    init() {
      const $select = window
        .$(this.$el)
        .select2({
          multiple: true,
          data: this.options,
          placeholder: this.placeholder,
          // allowClear: true,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
        })
        .val(this.value)
        .trigger('change')

      $select.on('select2:select select2:unselect', (e) =>
        this.$emit('input', $select.val())
      )
      $select.prop('disabled', this.disabled)
    },
  },
}
</script>

<style scoped></style>
