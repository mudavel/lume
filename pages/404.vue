<template>
  <div class="wrapper">
    <h1>404</h1>
    <h2>Not Found</h2>
    <NuxtLink class="basic-button" to="/">Go back</NuxtLink>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'opacity',
  },
  head() {
    return {
      title: '404 Not found.',
    }
  },
}
</script>

<style lang="sass" scoped>
h1
  font-size: 170px
  margin: 0px 50px

h2
  font-size: 40px
  font-weight: normal
  margin-bottom: 50px

a.nuxt-link-active
  padding: 30px
  font-size: 1.5em
</style>
