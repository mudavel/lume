<template>
  <div class="wrapper">
    <h1>
      <NuxtLink
        :to="'/chat/' + roomName"
        class="nuxt-link-active nuxt-link-title"
        >{{ roomName }}</NuxtLink
      >
    </h1>
    <div class="manage-whitelist">
      <h2>Manage users</h2>
      <form @submit.prevent="addToWhitelist">
        <input
          v-model="includeUsername"
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
      includeUsername: '',
    }
  },
  head() {
    return {
      title: `Managing ${this.roomName}`,
    }
  },
  methods: {
    async addToWhitelist() {
      const username = this.includeUsername
      const user = await this.$axios.get(
        `/api/userexists/${this.includeUsername}`
      )
      if (!user.data) return this.$toast.info('User not found.')

      const room = await this.$axios.get(`/api/room/${this.roomName}`)
      if (room.data.allowed_users.includes(username))
        return this.$toast.info(`${username} is already included.`)

      await this.$axios.patch(`/api/room/${this.roomName}`, { username })
      this.$toast.success(`${username} was included!`)
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

a.nuxt-link-active
  margin-bottom: 3%
</style>
