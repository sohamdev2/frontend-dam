<template>
  <div class="body-content damsupport">
    <address-book />
  </div>
</template>

<script>
export default {
  layout: 'app-min-no-search',
  middleware: ['check-auth', 'can-access'],
}
</script>

<style></style>
