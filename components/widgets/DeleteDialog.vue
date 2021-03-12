<template>
  <div id="delete" class="modal fade d-dialog">
    <div
      class="modal-dialog modal-dialog-centered text-center"
      style="max-width: 480px"
    >
      <div class="modal-content">
        <div class="subtitle">
          <h3 class="mt-3">
            <slot name="header"> Are you sure? </slot>
          </h3>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <p><slot>This action is irreversible.</slot></p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <button
                  class="btn bg-light-gray"
                  type="button"
                  @click="triggerModel('hide')"
                >
                  No
                </button>
                <button
                  class="btn"
                  type="button"
                  @click="
                    triggerModel('hide')
                    $emit('click:confirm-button')
                  "
                >
                  Yes
                </button>
              </div>
            </div>
          </form>
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

<style>
.d-dialog .modal-content p {
  word-break: break-word;
}
</style>
