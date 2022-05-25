<template>
  <UploadVideo />
</template>

<script>
export default {
  name: 'UploadPage',
  layout: 'another',
  meta: {
    requiredAuth: true,
  },
  middleware: 'auth',
}
</script>
