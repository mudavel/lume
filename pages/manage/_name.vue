<template>
  <div class="wrapper">
    <h1>{{ roomName }}</h1>
    <div class="manage-whitelist">
      <h2>Manage users</h2>
      <form @submit.prevent="addToWhitelist">
        <input
          v-model="whitelistUsername"
          type="text"
          placeholder="Username"
          required
        />
        <input type="submit" class="basic-button" value="Add user" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  async middleware({ $auth, $axios, redirect, route }) {
    const room = await $axios.get(`/api/room/${route.params.name}`)
    const owner = room.data.owner
    const username = $auth.$state.user.username
    if (!(owner === username)) return redirect('/')
  },
  data() {
    return {
      roomName: this.$route.params.name,
      whitelistUsername: '',
    }
  },
  head() {
    return {
      title: `Lume: ${this.roomName}`,
    }
  },
  methods: {
    async addToWhitelist() {
      const user = await this.$axios.get(`/api/user/${this.whitelistUsername}`)
      if (!user.data.username) return this.$toast.info('User not found.')

      const username = user.data.username

      const room = await this.$axios.get(`/api/room/${this.roomName}`)
      if (room.data.allowed_users.includes(username))
        return this.$toast.info(`${username} is already in the whitelist.`)

      await this.$axios.patch(`/api/room/${this.roomName}`, { username })
    },
  },
}
</script>

<style lang="sass" scoped>
input
  width: 100%

form
  width: 100%

.manage-whitelist
  display: flex
  flex-direction: column
  align-items: center
  border: 1px solid hsl(0, 0%, 75%)
  padding: 30px
  border-radius: 20px

h2
  font-weight: normal
  margin-bottom: 6%
</style>
