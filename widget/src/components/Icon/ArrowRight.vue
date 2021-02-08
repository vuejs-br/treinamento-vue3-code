<template>
  <svg
    :width="size"
    :height="size" viewBox="0 0 13 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.07415 3.21819L12.3158 3.23798L12.3183 2.06329L3.07666 2.04351L3.08044 0.281483L0.00512019 2.62427L3.07038 4.98021L3.07415 3.21819Z"
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
