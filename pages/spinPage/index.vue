<template>
  <test-page></test-page>
</template>

<script>
import testPage from '~/components/testpage/testPage.vue'
export default {
  components: { testPage },
  name: 'SpinPage',
  layout: 'another',
}
</script>
