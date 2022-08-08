<template>
  <div class="body-content damsupport">
    <address-book edit />
  </div>
</template>

<script>
export default {
  layout: 'app-min-no-search',
  middleware: ['check-auth', 'can-access', 'can-access-cart-store'],
}
</script>

<style></style>
