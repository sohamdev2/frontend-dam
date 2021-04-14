<template>
  <div
    id="exampleModalCenter2"
    class="modal fade"
    :class="{ 'show in': show }"
    role="dialog"
    :data-unique-id="id"
  >
    <!-- <div
      class="modal-backdrop fade"
      :class="{ 'in show': show }"
      style="display: none; z-index: 0"
      :data-unique-id="id"
      @click="active = false"
    ></div> -->
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
      role="document"
    >
      <div class="modal-content bg-gray">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import ValueModel from '@/mixins/ValueModel'

export default {
  mixins: [ValueModel],

  data() {
    return {
      show: false,
      id: Math.random().toString(12).replace('0.', 'new_file_model_'),
    }
  },
  watch: {
    active(active) {
      if (active) document.addEventListener('keyup', this.keyEvent)
      else document.removeEventListener('keyup', this.keyEvent)
      this.triggerModel()
    },
  },
  destroyed() {
    if (this.active) document.removeEventListener('keyup', this.keyEvent)
  },
  methods: {
    keyEvent(ev) {
      if (ev.key === 'Escape') this.active = false
    },
    toggleModel() {
      this.active = !this.active
    },
    triggerModel() {
      const display = this.active ? 'block' : 'none'

      if (this.active) {
        window
          .$(`#exampleModalCenter2[data-unique-id=${this.id}]`)
          .css('display', display)
        window
          .$(`.modal-backdrop[data-unique-id=${this.id}]`)
          .css('display', display)
        setTimeout(() => (this.show = true), 50)
      } else {
        this.show = false

        setTimeout(() => {
          window
            .$(`#exampleModalCenter2[data-unique-id=${this.id}]`)
            .css('display', display)
          window
            .$(`.modal-backdrop[data-unique-id=${this.id}]`)
            .css('display', display)
        }, 150)
      }
    },
  },
}
</script>
