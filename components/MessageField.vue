<template>
  <div class="wrapper">
    <h1 class="room-id" title="Copy Link" @click="toClipboard">{{ id }}</h1>
    <div ref="messages" class="messages">
      <div v-for="msg in messages" :key="msg._id" class="message">
        <div class="msg-wrapper">
          <div v-if="!msg.isOwner" class="msg-username">{{ msg.sender }}</div>
          <div v-else class="msg-username owner">{{ msg.sender }}</div>
          <p class="msg-text">{{ msg.content }}</p>
          <p class="msg-time">{{ formatMongoTime(msg.creationDate) }}</p>
        </div>
        <button
          v-if="msg.sender === $auth.user.username || isOwner"
          class="msg-delete"
          @click="deleteMessage(msg)"
        >
          x
        </button>
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
      {{ state.charAt(0).toUpperCase() + state.slice(1) }}
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
  async mounted() {
    this.PUSHER_KEY = this.$config.PUSHER_KEY
    this.checkIfIsOwner()

    pusher = new Pusher(this.PUSHER_KEY, {
      cluster: 'us2',
    })
    room = pusher.subscribe(this.id)

    pusher.connection.bind('connected', () => {
      this.connected = true
    })

    pusher.connection.bind('disconnected', () => {
      this.state = "Couldn't connect to the chat. Please refresh the page."
    })

    room.bind('send', (message) => {
      this.messages.push(message)
      this.$nextTick(() => {
        this.$refs.messages.scrollTo(0, this.$refs.messages.scrollHeight)
      })
    })

    room.bind('delete', (message) => {
      const index = this.messages.findIndex(
        (msg) =>
          msg.creationDate === message.creationDate &&
          msg.owner === message.owner
      )
      this.messages.splice(index, 1)
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
          roomId: this.id,
          sender: this.username,
          content,
          isOwner: this.isOwner,
        }
        await this.$http.$post('/api/send', data)
      }
    },
    toClipboard() {
      const baseUrl = this.$config.BASE_URL
      navigator.clipboard.writeText(baseUrl + this.$nuxt.$route.path)
      this.$toast.info('Link copied!')
    },
    async checkIfIsOwner() {
      const room = await this.$http.$post(`/api/room/${this.id}`)
      this.isOwner = room.owner === this.$auth.user.username
    },
    formatMongoTime(mongoTime) {
      const timestamp = new Date(mongoTime)
      const hours = ('0' + timestamp.getHours()).slice(-2)
      const minutes = ('0' + timestamp.getMinutes()).slice(-2)
      return `${hours}:${minutes}`
    },
    async deleteMessage(msg) {
      await this.$http.$post('/api/delete', msg)
    },
  },
}
</script>

<style lang="sass" scoped src="~/assets/css/scoped/message-field.sass" />
