<template>
  <content-loader
    class="flex flex-col items-center rounded"
    width="100%"
    height="300px"
  >
    <content-loader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2s"
    />

    <content-loader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2.3s"
    />

    <content-loader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2.7s"
    />
  </content-loader>
</template>

<script>
import ContentLoader from '../ContentLoader'

export default {
  components: { ContentLoader }
}
</script>
