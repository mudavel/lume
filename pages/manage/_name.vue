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
      <div class="user-wrapper">
        <div v-for="user in allowed_users" :key="user" class="allowed-user">
          <p>{{ user }}</p>
          <button class="remove" @click="kick(user)">x</button>
        </div>
      </div>
      <form @submit.prevent="addToWhitelist">
        <input
          v-model="includeUsername"
          type="text"
          placeholder="Username"
          class="username-input"
          required
        />
        <input type="submit" class="basic-button submit" value="+" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  async middleware({ $auth, $http, redirect, route }) {
    const room = await $http.$post(`/api/room/${route.params.name}`)
    const owner = room.owner
    const username = $auth.$state.user.username
    if (!(owner === username)) return redirect('/')
  },
  data() {
    return {
      roomName: this.$route.params.name,
      includeUsername: '',
      allowed_users: '',
    }
  },
  head() {
    return {
      title: `Managing ${this.roomName}`,
    }
  },
  async beforeMount() {
    const room = await this.$http.$post(`/api/room/${this.roomName}`)
    this.allowed_users = room.allowed_users
  },
  methods: {
    async addToWhitelist() {
      const username = this.includeUsername
      this.includeUsername = ''
      const user = await this.$http.$post(`/api/exists/username/${username}`)
      if (!user) return this.$toast.error('User not found.')

      const room = await this.$http.$post(`/api/room/${this.roomName}`)
      if (room.allowed_users.includes(username))
        return this.$toast.info(`${username} is already included.`)

      await this.$http.$patch(`/api/room/add/${this.roomName}`, { username })
      this.allowed_users.push(username)
      this.$toast.success(`${username} was included!`)
    },
    async kick(username) {
      await this.$http.$patch(`/api/room/remove/${this.roomName}`, { username })
      const indexToRemove = this.allowed_users.indexOf(username)
      this.allowed_users.splice(indexToRemove, 1)
      this.$toast.success(`${username} was kicked!`)
    },
  },
}
</script>

<style lang="sass" scoped>
.username-input
  width: 100%
  margin-left: 0px

form
  width: 100%
  flex-direction: row

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
  user-select: none

.submit
  width: 50px
  margin: 0px
  padding: 0px
  font-size: 1.5em

a.nuxt-link-active
  margin-bottom: 3%

.remove
  display: none
  align-items: center
  justify-content: center
  border: none
  background-color: #fcc
  border-radius: 5px
  color: #f00
  font-weight: bold
  font-size: 1.4em
  width: 30px
  height: 30px

  &:hover
    color: #d00

.allowed-user
  width: calc(100% - 2px)
  height: 40px
  padding: 5px
  margin: 8px 0px
  font-size: 1.3em
  display: flex
  justify-content: space-between
  border-radius: 5px
  background-color: #dfd
  user-select: none

  &:hover, &:focus
    .remove
      display: flex

.user-wrapper
  width: 100%
  max-height: 50vh
  overflow-x: hidden

@media (max-width: 600px)
  .manage-whitelist
    width: 90vw
</style>
