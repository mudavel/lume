<template>
  <div class="wrapper">
    <h1>
      <span class="thank-you">Thank you</span> for using
      <span class="lume">Lume</span>.
    </h1>
    <NuxtLink to="/" class="basic-button">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
  transition: '',
}
</script>

<style lang="sass" scoped>
.lume
  color: #3c3

h1
  color: #666
  user-select: none

.thank-you
  &:hover
    color: #000

a.nuxt-link-active
  padding: 30px 50px
  font-size: 25px
</style>
