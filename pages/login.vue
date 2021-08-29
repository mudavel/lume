<template>
  <div class="wrapper">
    <h1>Login</h1>
    <LoginForm />
    <NuxtLink to="/register"
      >Don't have an account? Click here to register</NuxtLink
    >
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
}
</script>
