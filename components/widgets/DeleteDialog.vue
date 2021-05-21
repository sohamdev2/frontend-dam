<template>
  <div id="delete" class="modal fade">
    <div
      class="
        modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header"> </slot>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true"
              ><img src="~/assets/img/close.svg" alt=""
            /></span>
          </button>
        </div>

        <div class="modal-body text-center">
          <p><slot>This action is irreversible.</slot></p>
          <div class="btn-group">
            <a class="btn btn-gray" @click="triggerModel('hide')">No</a>
            <a
              class="btn"
              @click="
                triggerModel('hide')
                $emit('click:confirm-button')
              "
              >Yes</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    triggerModel(mode) {
      window.$(this.$el).modal(mode)
    },
  },
}
</script>
