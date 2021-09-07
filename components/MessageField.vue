<template>
  <div class="wrapper">
    <h1><NuxtLink to="/" class="nuxt-link-title">Lume</NuxtLink></h1>
    <p class="room-id" title="Copy chat ID" @click="toClipboard">{{ id }}</p>
    <div class="messages">
      <div v-for="msg in messages" :key="msg._id" class="message">
        <div v-if="!msg.isOwner" class="msg-username">{{ msg.sender }}</div>
        <div v-else class="msg-username owner">{{ msg.sender }}</div>
        <p class="msg-text">{{ msg.content }}</p>
      </div>
    </div>
    <form v-if="connected" class="msg-input-form" @submit.prevent="sendMessage">
      <input
        v-model="message"
        type="text"
        class="message-input"
        placeholder="Your message"
        required
      />
      <input class="submit" type="submit" title="Send message" value="" />
    </form>
    <p v-else class="connecting">
      {{ state.charAt(0).toUpperCase() + state.slice(1) }}...
    </p>
  </div>
</template>

<script>
import Pusher from 'pusher-js'

let pusher, room
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
      connected: false,
      state: '',
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
    room = pusher.subscribe(this.id)

    pusher.connection.bind('connected', () => {
      this.connected = true
    })

    pusher.connection.bind('disconnected', () => {
      room = pusher.subscribe(this.id)
      this.state = pusher.connection.state
    })

    room.bind('send', (message) => {
      this.messages.push(message)
    })

    const previousMessages = await this.$http.$post(`/api/previous/${this.id}`)
    this.messages = previousMessages
    this.state = pusher.connection.state
  },
  methods: {
    async sendMessage() {
      const content = this.message.trim()
      if (content) {
        this.message = ''
        const data = {
          room_id: this.id,
          sender: this.username,
          content,
          room: this.id,
          isOwner: this.isOwner,
        }
        await this.$http.$post('/api/pusher/send', data)
      }
    },
    toClipboard() {
      navigator.clipboard.writeText(this.id)
    },
    async checkIfIsOwner() {
      const room = await this.$http.$post(`/api/room/${this.id}`)
      this.isOwner = room.owner === this.$auth.user.username
    },
  },
}
</script>

<style lang="sass" scoped src="~/assets/css/scoped/message-field.sass" />
