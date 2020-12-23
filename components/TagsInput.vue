<template>
  <div :class="{ 'no-remove': imutable || disabled }">
    <input
      data-role="tagsinput"
      :placeholder="value.length ? '' : placeholder"
      :disabled="disabled"
      hidden
    />
  </div>
</template>

<script>
const confirmKeys = [9, 13, 44, 188]

export default {
  props: {
    value: { type: Array, default: () => [] },
    imutable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: 'Click here to add tags' },
  },
  data() {
    return {
      doneInit: false,
    }
  },
  watch: {
    disabled(a) {
      window
        .$(this.$el)
        .find('.bootstrap-tagsinput > input')
        .attr('disabled', a)
    },
    value(value) {
      // if (this.doneInit && !this.imutable) {
      //   const $input = window.$(this.$el).find('[data-role="tagsinput"]');
      //   let tags = $input.tagsinput("items");
      //   let tagsToRemove = tags.filter(tag =>
      //     value.find(({ id }) => id != tag.id)
      //   );
      //   let tagsToAdd = value.filter(tag =>
      //     tags.find(({ id }) => id != tag.id)
      //   );
      // }
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const $input = window.$(this.$el).find('[data-role="tagsinput"]')
      const vue = this

      $input.tagsinput({
        freeInput: true,
        itemValue: 'id',
        itemText: 'tag_name',
      })

      this.value.forEach((v) =>
        $input.tagsinput('add', v, { preventEmit: true })
      )

      const $tagInput = window.$(vue.$el).find('.bootstrap-tagsinput > input')

      $tagInput.attr('disabled', this.disabled)
      $tagInput.on('keydown', (e) => {
        if (confirmKeys.includes(e.keyCode)) {
          e.preventDefault()

          const input = ($tagInput.val() || '').trim()
          if (!input) return

          const index = this.value.findIndex(
            ({ tag_name }) => tag_name.toUpperCase() === input.toUpperCase()
          )

          if (~index) {
            window
              .$(window.$(this.$el).find(`.tag.label.label-info`)[index])
              .hide()
              .fadeIn()

            $tagInput[0].value = ''
            return
          }

          $input.tagsinput('add', {
            tag_name: input,
            id: 'new-' + Math.floor(Math.random() * 1000),
          })

          $tagInput[0].value = ''
        }
      })

      const changed = () => {
        this.$nextTick(() => {
          const tags = $input.tagsinput('items')
          vue.$emit('input', tags)

          if (tags.length > 0) $tagInput.attr('placeholder', '')
          else $tagInput.attr('placeholder', vue.placeholder)
        })
      }

      $input
        .on('beforeItemRemove', (event) => {
          const { item, options } = event
          if (options && options.preventEmit) return

          const itemToRemove = this.value.find(
            ({ tag_name }) =>
              tag_name.toUpperCase() === item.tag_name.toUpperCase()
          )

          if (!itemToRemove) {
            event.cancel = true
            return
          }

          changed()

          this.$emit('click:removeTag', itemToRemove)
        })
        .on('itemAdded', ({ item, options }) => {
          if (options && options.preventEmit) return
          changed()

          this.$emit('click:addTag', item)
        })

      this.doneInit = true
    },
  },
}
</script>

<style>
.no-remove [data-role='remove'] {
  display: none !important;
}
</style>
