<template>
  <div class="wrapper">
    <NuxtLink to="/" class="to-home">Lume</NuxtLink>
    <p class="room-id" title="Copy chat ID" @click="toClipboard">{{ id }}</p>
    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message">
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
  mounted() {
    this.checkIfIsOwner()
    this.socket = this.$nuxtSocket({})
    this.socket.emit('joinRoom', this.id)
    this.socket.emit('previousMessages', this.id, (msgs) => {
      this.messages = msgs
    })
    this.socket.on('broadcastMessage', (newMessage) => {
      this.messages = [...this.messages, newMessage]
    })
  },
  updated() {
    this.scrollDown()
  },
  methods: {
    sendMessage() {
      if (this.username.length && this.message.length) {
        const rawMessage = {
          username: this.username,
          message: this.message,
          room: this.id,
          isOwner: this.isOwner,
        }
        this.socket.emit('sendMessage', rawMessage, (newMessage) => {
          this.messages = [...this.messages, newMessage]
        })
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
