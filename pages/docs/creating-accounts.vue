<template>
  <div class="wrapper">
    <h1>Creating Accounts</h1>
    <p>
      Usernames can only contain alphanumeric characters (<code
        >a-z, A-Z, 0-9</code
      >) and the following special characters: <code>_ .</code>.
    </p>
    <NuxtLink class="basic-button" to="/create"
      >I'm ready to create my Lume account!</NuxtLink
    >
  </div>
</template>

<script>
export default {
  auth: false,
}
</script>
