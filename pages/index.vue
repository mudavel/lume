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

<style lang="sass" scoped src="~/assets/css/file-specific/index.sass" />
