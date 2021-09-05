<template>
  <div class="wrapper">
    <h1>Lume</h1>
    <NuxtLink class="basic-button" to="/login">Login</NuxtLink>
    <NuxtLink class="basic-button" to="/register">Create account</NuxtLink>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
}
</script>

<style lang="sass" scoped>
@keyframes letter-spacing
  25%
    letter-spacing: 5px
  75%
    letter-spacing: -5px
  100%
    letter-spacing: 0px

h1
  margin-bottom: 40px
  font-size: 5em
  font-weight: normal
  letter-spacing: 0px
  transition: 0.3s
  user-select: none

  &:active
    animation: letter-spacing 0.75s infinite linear

a, button
  width: 20%
  height: 50px
  font-size: 1.3em
  font-family: 'Segoe UI'
  &:hover
    letter-spacing: 0.5px
</style>
