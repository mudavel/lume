<template>
  <header class="page-header">
    <NuxtLink class="nuxt-link-title to-home" to="/">Lume</NuxtLink>
    <div class="profile header-part">
      <div class="email" @click="showLogout">{{ $auth.user.email }}</div>
      <div class="blocker" @click="hideLogout"></div>
      <div class="logout" @click="logout">Logout</div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      await window.$nuxt.$router.push('/login')
    },
    showLogout() {
      document.querySelector('.blocker').style.display = 'block'
      document.querySelector('.logout').style.display = 'block'
    },
    hideLogout() {
      document.querySelector('.blocker').style.display = 'none'
      document.querySelector('.logout').style.display = 'none'
    },
  },
}
</script>

<style lang="sass" scoped src="~/assets/css/scoped/header.sass"></style>
