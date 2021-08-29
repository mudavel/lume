<template>
  <div class="wrapper">
    <h1>Register</h1>
    <RegisterForm />
    <NuxtLink to="/login"
      >Already have an account? Click here to login</NuxtLink
    >
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
}
</script>
