<template>
  <div class="wrapper">
    <h1>Your Rooms</h1>
    <div class="rooms">
      <NuxtLink
        v-for="room of rooms"
        :key="room._id"
        :to="'/manage/' + room.fancy_name"
        class="basic-button rooms-button"
      >
        {{ room.fancy_name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
    }
  },
  async beforeMount() {
    const rooms = await this.$http.$post(
      `/api/owner/${this.$auth.user.username}`
    )
    this.rooms = rooms
  },
}
</script>

<style lang="sass" scoped>
.rooms
  display: flex
  flex-direction: column
  width: 100%
  align-items: center
  justify-content: center

.rooms-button
  width: 40%
  margin: 10px

h1
  font-size: 50px

@media (max-width: 800px)
  .rooms-button
    width: 80vw
</style>
