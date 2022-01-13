<template>
  <div class="wrapper">
    <h1>
      <NuxtLink :to="'/chat/' + id" class="nuxt-link-active nuxt-link-title">{{
        fancy_name
      }}</NuxtLink>
    </h1>
    <p class="roomId">{{ id }}</p>
    <div class="manage-whitelist">
      <h2>Manage users</h2>
      <div class="user-wrapper">
        <div v-for="user in allowed_users" :key="user" class="allowed-user">
          <p>{{ user }}</p>
          <button class="remove" @click="kick(user)">-</button>
        </div>
      </div>
      <form @submit.prevent="addToWhitelist">
        <input
          v-model="include_username"
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
    const room = await $http.$post(`/api/room/${route.params.id}`)
    const owner = room.owner
    const username = $auth.$state.user.username
    if (!(owner === username)) return redirect('/')
  },
  data() {
    return {
      id: this.$route.params.id,
      fancy_name: '',
      include_username: '',
      allowed_users: '',
    }
  },
  head() {
    return {
      title: `Managing ${this.fancy_name}`,
    }
  },
  async beforeMount() {
    const room = await this.$http.$post(`/api/room/${this.$route.params.id}`)
    this.allowed_users = room.allowed_users
    this.fancy_name = room.fancy_name
  },
  methods: {
    async addToWhitelist() {
      const username = this.include_username
      this.include_username = ''
      const user = await this.$http.$post(`/api/exists/username/${username}`)
      if (!user) return this.$toast.error('User not found.')

      const room = await this.$http.$post(`/api/room/${this.id}`)
      if (room.allowed_users.includes(username))
        return this.$toast.info(`${username} is already included.`)

      await this.$http.$patch(`/api/room/add/${this.id}`, { username })
      this.allowed_users.push(username)
      this.$toast.success(`${username} was included!`)
    },
    async kick(username) {
      await this.$http.$patch(`/api/room/remove/${this.id}`, { username })
      const indexToRemove = this.allowed_users.indexOf(username)
      this.allowed_users.splice(indexToRemove, 1)
      this.$toast.success(`${username} was kicked!`)
    },
  },
}
</script>

<style lang="sass" scoped>

.roomId
  font-size: 0.8em
  margin-bottom: 50px

.username-input
  width: 100%
  margin-left: 0px

.manage-whitelist
  display: flex
  flex-direction: column
  align-items: center
  border: 1px solid hsl(0, 0%, 75%)
  padding: 30px
  border-radius: 20px

.submit
  width: 50px
  margin: 0px
  padding: 0px
  font-size: 1.5em

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

h1
  margin-bottom: 0px

h2
  font-weight: normal
  margin-bottom: 6%
  user-select: none

form
  width: 100%
  flex-direction: row

@media (max-width: 600px)
  .manage-whitelist
    width: 90vw
</style>
