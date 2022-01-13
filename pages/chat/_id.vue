<template>
  <MessageField :id="id" :fancy-name="fancy_name" />
</template>

<script>
export default {
  async middleware({ $auth, $axios, redirect, route }) {
    const room = await $axios.post(`/api/room/${route.params.id}`)
    if (!room.data.allowed_users) return redirect('/')
    const whitelist = room.data.allowed_users
    const username = $auth.$state.user.username
    if (!whitelist.includes(username)) return redirect('/')
  },
  transition: 'back',
  data() {
    return {
      fancy_name: '',
      id: this.$route.params.id,
    }
  },
  head() {
    return {
      title: `Lume: ${this.fancy_name}`,
    }
  },
  async beforeCreate() {
    const room = await this.$http.$post(`/api/room/${this.$route.params.id}`)
    this.fancy_name = room.fancy_name
  },
}
</script>
