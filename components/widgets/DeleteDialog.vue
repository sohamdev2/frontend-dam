<template>
  <div id="delete" class="modal fade">
    <div
      class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
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
              ><svg
                id="Layer_1"
                class="close-icon h-red"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4358" transform="translate(-69.745 -317.549)">
                  <path
                    id="Path_3424"
                    class="fill-color"
                    d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                  />
                  <path
                    id="Path_3425"
                    class="fill-color"
                    d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                  />
                </g></svg
            ></span>
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
