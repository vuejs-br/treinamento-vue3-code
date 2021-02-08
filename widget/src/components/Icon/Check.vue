<template>
  <svg
    :width="size"
    :height="size" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5 0C9.632 0 0 9.632 0 21.5C0 33.368 9.632 43 21.5 43C33.368 43 43 33.368 43 21.5C43 9.632 33.368 0 21.5 0ZM17.2 32.25L6.45 21.5L9.4815 18.4685L17.2 26.1655L33.5185 9.847L36.55 12.9L17.2 32.25Z"
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
