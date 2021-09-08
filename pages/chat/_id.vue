<template>
  <MessageField :id="roomName" />
</template>

<script>
export default {
  async middleware({ $auth, $http, redirect, route }) {
    const room = await $http.$post(`/api/room/${route.params.id}`)
    if (!room.allowed_users) return redirect('/')
    const whitelist = room.allowed_users
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
