<template>
  <div style="min-height: 100vh; display: flex">
    <div style="margin: auto; padding: 1rem; max-width: 740px">
      <div style="text-align: center">
        <component :is="page" :error="error"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Page404 from '@/pages/404.vue'

export default {
  components: { Page404 },
  props: { error: { type: Object, default: () => ({}) } },
  computed: {
    page() {
      return 'Page404'
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log('Error: ', [this.error])
  },
}
</script>
