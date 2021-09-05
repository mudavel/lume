<template>
  <div class="wrapper">
    <h1>
      Welcome back, <b>{{ $auth.user.username }}</b
      >!
    </h1>
    <div class="actions">
      <NuxtLink class="basic-button grid-button" to="/create">
        Create Room
      </NuxtLink>
      <NuxtLink class="basic-button grid-button" to="/manage"
        >Your Rooms</NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async createRoom() {
      const newRoom = await this.$axios.post('/api/newroom', {
        username: this.$auth.user.username,
      })
      await window.$nuxt.$router.push(`/chat/${newRoom.data.id}`)
    },
  },
}
</script>

<style lang="sass" scoped src="~/assets/css/scoped/dashboard.sass"></style>
