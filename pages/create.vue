<template>
  <div class="wrapper">
    <h1>Create Room</h1>
    <form @submit.prevent="createRoom">
      <input v-model="name" type="text" placeholder="Room name" required />
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
      const newRoom = await this.$axios.post('/api/newroom', {
        owner: this.$auth.user.username,
        name: this.name,
      })
      if (newRoom.data.id) {
        return await window.$nuxt.$router.push(`/chat/${this.name}`)
      }
      this.$toast.error(
        'This name is already in use. Please choose another one.'
      )
    },
  },
}
</script>

<style lang="sass" scoped>
input
  width: 100%
</style>
