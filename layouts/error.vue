<template>
  <div class="wrapper">
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.message }}</h2>
    <NuxtLink class="basic-button" to="/">Go back</NuxtLink>
  </div>
</template>

<script>
export default {
  layout({ $auth }) {
    return $auth.loggedIn ? 'default' : 'guest'
  },
  transition: {
    name: 'fade',
    mode: 'opacity',
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: `${this.error.statusCode} ${this.error.message}`,
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
