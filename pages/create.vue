<template>
  <div class="wrapper">
    <h1>Create Room</h1>
    <form @submit.prevent="createRoom">
      <input v-model="name" type="text" placeholder="Room name" required />
      <NuxtLink class="secondary-link" to="/docs/creating-rooms"
        >Learn more</NuxtLink
      >
      <input type="submit" class="basic-button" value="Create" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    async createRoom() {
      const name = this.name
      if (this.hasInvalidCharacters(name))
        return this.$toast.error('Invalid name!')
      const newRoom = await this.$axios.post('/api/newroom', {
        owner: this.$auth.user.username,
        name,
      })
      if (newRoom.data.id) {
        return await window.$nuxt.$router.push(`/chat/${name}`)
      }
      this.$toast.error(
        'This name is already in use. Please choose another one.'
      )
    },
    hasInvalidCharacters(str) {
      const validCharacters = /^[0-9a-zA-Z-_@,.]+$/
      if (!validCharacters.test(str)) return true
    },
  },
}
</script>

<style lang="sass" scoped>
input
  width: 100%
</style>
