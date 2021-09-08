<template>
  <MessageField :id="roomName" />
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
      roomName: this.$route.params.id,
    }
  },
  head() {
    return {
      title: `Lume: ${this.roomName}`,
    }
  },
}
</script>
