<template>
  <div class="wrapper">
    <h1><NuxtLink to="/" class="nuxt-link-title">Lume</NuxtLink></h1>
    <p class="room-id" title="Copy chat ID" @click="toClipboard">{{ id }}</p>
    <div class="messages">
      <div v-for="msg in messages" :key="msg._id" class="message">
        <div v-if="!msg.isOwner" class="msg-username">{{ msg.username }}</div>
        <div v-else class="msg-username owner">{{ msg.username }}</div>
        <p class="msg-text">{{ msg.message }}</p>
      </div>
    </div>
    <form class="msg-input-form" @submit.prevent="sendMessage">
      <input
        v-model="message"
        type="text"
        class="message-input"
        placeholder="Your message"
        required
      />
      <input class="submit" type="submit" title="Send message" value="" />
    </form>
  </div>
</template>

<script>
import Pusher from 'pusher-js'

let pusher
export default {
  props: {
    id: {
      type: String,
      default: 'global',
    },
  },
  data() {
    return {
      messages: [],
      message: '',
      username: this.$auth.user.username,
      isOwner: '',
      PUSHER_KEY: '',
    }
  },
  fetch() {
    this.PUSHER_KEY = this.$config.PUSHER_KEY
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        const element = document.querySelector('.messages')
        element.scrollTo(0, element.scrollHeight)
      })
    },
  },
  async beforeMount() {
    this.checkIfIsOwner()

    pusher = new Pusher(this.PUSHER_KEY, {
      cluster: 'us2',
    })

    const room = pusher.subscribe(this.id)
    room.bind('send', (message) => {
      this.messages.push(message)
    })

    const previousMessages = await this.$axios.post(`/api/previous/${this.id}`)
    this.messages = previousMessages.data
  },
  methods: {
    async sendMessage() {
      const messageContent = this.message
      if (messageContent.trim()) {
        this.message = ''
        const data = {
          room_id: this.id,
          socket_id: pusher.connection.socket_id,
          username: this.username,
          message: messageContent,
          room: this.id,
          isOwner: this.isOwner,
        }
        await this.$axios.post('/api/pusher/send', data)
      }
    },
    toClipboard() {
      navigator.clipboard.writeText(this.id)
    },
    async checkIfIsOwner() {
      const room = await this.$axios.post(`/api/room/${this.id}`)
      this.isOwner = room.data.owner === this.$auth.user.username
    },
  },
}
</script>

<style lang="sass" scoped src="~/assets/css/scoped/message-field.sass" />
