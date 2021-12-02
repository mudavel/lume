<template>
  <header class="page-header">
    <NuxtLink class="nuxt-link-title to-home" to="/">Lume</NuxtLink>
    <div class="profile header-part">
      <div class="email" @click="showLogout">{{ $auth.user.email }}</div>
      <div ref="blocker" class="blocker" @click="hideLogout"></div>
      <div ref="logout" class="logout" @click="logout">Logout</div>
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
      this.$refs.blocker.style.display = 'block'
      this.$refs.logout.style.display = 'block'
    },
    hideLogout() {
      this.$refs.blocker.style.display = 'none'
      this.$refs.logout.style.display = 'none'
    },
  },
}
</script>

<style lang="sass" scoped src="~/assets/css/scoped/header.sass"></style>
