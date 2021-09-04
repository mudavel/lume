<template>
  <div class="wrapper">
    <NuxtLink to="/" class="to-home">Lume</NuxtLink>
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
    }
  },
  async mounted() {
    this.checkIfIsOwner()

    const PUSHER_KEY =
      process.env.NODE_ENV === 'production'
        ? process.env.PUSHER_KEY
        : require('~/config').PUSHER_KEY

    console.log(
      `%c PUSHER_KEY === undefined: ${PUSHER_KEY === undefined}`,
      'color: green;background-color: yellow;font-size: 30px'
    )

    pusher = new Pusher(PUSHER_KEY, {
      cluster: 'us2',
    })

    const room = pusher.subscribe(this.id)
    room.bind('previous-messages', (messages) => {
      this.messages = messages
    })
    await this.$axios.post('/api/pusher/previous-messages', {
      room_id: this.id,
    })

    room.bind('send-message', (message) => {
      this.messages.push(message)
    })
  },
  updated() {
    this.scrollDown()
  },
  methods: {
    async sendMessage() {
      if (this.username.length && this.message.length) {
        const rawMessage = {
          username: this.username,
          message: this.message,
          room: this.id,
          isOwner: this.isOwner,
        }

        const sendData = {
          room_id: this.id,
          socket_id: pusher.connection.socket_id,
          ...rawMessage,
        }
        await this.$axios.post('/api/pusher/send', sendData)
      }
      this.message = ''
    },
    scrollDown() {
      const getElement = document.querySelector('.messages')
      getElement.scrollTo(0, getElement.scrollHeight)
    },
    toClipboard() {
      navigator.clipboard.writeText(this.id)
    },
    async checkIfIsOwner() {
      const room = await this.$axios.get(`/api/room/${this.id}`)
      this.isOwner = room.data.owner === this.$auth.user.username
    },
  },
}
</script>

<style lang="sass" scoped src="~/assets/css/file-specific/message-field.sass" />
