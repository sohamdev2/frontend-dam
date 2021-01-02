<template>
  <ShowWhenReady></ShowWhenReady>
</template>

<script>
export default {
  middleware: ['redirect-if-logged-in'],
}
</script>
