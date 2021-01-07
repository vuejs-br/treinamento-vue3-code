<template>
  <div>
    <h1 :style="{ textDecoration: decoration }">Hello {{ name }}!</h1>
    <input type="text" v-model="name">
    <br>
    <a :href="link">Link pro curso!</a>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: 'Igor',
    link: 'https://treinamento.vuejsbrasil.org',
    decoration: 'underline'
  })
}
</script>

