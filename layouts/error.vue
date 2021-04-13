<template>
  <component :is="page" :error="error"></component>
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
