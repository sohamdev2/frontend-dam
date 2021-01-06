<template>
  <component :is="page" :error="error"></component>
</template>

<script>
import Page401 from '@/pages/401.vue'
import Page404 from '@/pages/404.vue'

export default {
  components: { Page401, Page404 },
  props: { error: { type: Object, default: () => ({}) } },
  layout: 'app-min-no-search',
  computed: {
    page() {
      if (this.error.status === 401) return 'Page401'
      else return 'Page404'
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log('Error: ', [this.error])
  },
}
</script>
