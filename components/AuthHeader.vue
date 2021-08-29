<template>
  <header class="page-header">
    <img
      src="~/static/back.svg"
      alt="Go back"
      class="go-back-image header-part"
      @click="toHomePage"
    />
    <div class="profile header-part">
      <div class="email" @click="showLogout">{{ $auth.user.email }}</div>
      <div class="blocker" @click="hideLogout"></div>
      <div class="logout right-side" @click="logout">Logout</div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    async toHomePage() {
      await window.$nuxt.$router.push('/')
    },
    async logout() {
      await this.$auth.logout()
      await window.$nuxt.$router.push('/logout')
      // await window.$nuxt.$router.push('/login') // MUDAR PRA ISSO (TALVEZ)
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

<style lang="sass" scoped src="~/assets/css/file-specific/header.sass"></style>
