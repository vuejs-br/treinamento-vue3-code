<template>
  <svg
    :width="size"
    :height="size" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.9999 4.3335C14.0399 4.3335 4.33325 14.0402 4.33325 26.0002C4.33325 37.9602 14.0399 47.6668 25.9999 47.6668C37.9599 47.6668 47.6666 37.9602 47.6666 26.0002C47.6666 14.0402 37.9599 4.3335 25.9999 4.3335ZM28.1666 36.8335H23.8333V32.5002H28.1666V36.8335ZM28.1666 28.1668H23.8333V15.1668H28.1666V28.1668Z"
      :fill="color"/>
  </svg>
</template>

<script>
export default {
  props: {
    size: { type: [String, Number], default: 22 },
    color: { type: String, default: 'white' }
  }
}
</script>
