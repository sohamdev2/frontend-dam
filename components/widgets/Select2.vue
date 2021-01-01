<template>
  <select :class="classObj">
    <slot></slot>
  </select>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: 'Select2',
  props: {
    options: [Array, Object, String, Boolean],
    value: [Number, String],
    placeholder: String,
    customEvent: Boolean,
    containerCssClass: String,
    dropdownCssClass: String,
    disabled: { type: Boolean, default: false },
    classObj: { type: Object, default: null },
    attrs: { type: Object, default: () => ({}) },
  },
  /* updated() {
        let initSelect2 = window.$(this.$el)
          .select2({
            data: this.options,
            placeholder: this.placeholder,
            containerCssClass : this.containerCssClass,
            dropdownCssClass: this.dropdownCssClass
          }).val(this.value).trigger("change");

        initSelect2.on('select2:select',(e) => {
          let data = e.params.data;
          if(this.customEvent){
            this.$emit("changeSelect2", data);
          }
          this.$emit("input", data.id);
        });
        initSelect2.prop('disabled',this.disabled);
      }, */
  watch: {
    value(value) {
      window.$(this.$el).val(value).trigger('change')
    },
    options(options) {
      window
        .$(this.$el)
        .empty()
        .select2({
          data: options,
          placeholder: this.placeholder,
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
    window.$(this.$el).off().select2('destroy')
  },
  methods: {
    init() {
      window
        .$(this.$el)
        .select2({
          data: this.options,
          placeholder: this.placeholder,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
          ...this.attrs,
        })
        .val(this.value)
        .trigger('change')
        .on('select2:select', (e) => {
          const data = e.params.data
          if (this.customEvent) {
            this.$emit('changeSelect2', data)
          }
          this.$emit('input', data.id)
        })
        .prop('disabled', this.disabled)
    },
  },
}
</script>
