<template>
  <div class="wrapper">
    <button class="basic-button" @click="testSocketIo">TEST SOCKET IO</button>
    <p>{{ socketRes }}</p>
    <button class="basic-button" @click="testPusher">TEST PUSHER</button>
  </div>
</template>

<script>
import Pusher from 'pusher-js'
const pusher = new Pusher('389a8d7c96b12eded195', {
  cluster: 'us2',
})
const channel = pusher.subscribe('test-channel')
export default {
  data() {
    return {
      socketRes: '',
      pusher: '',
    }
  },
  mounted() {
    // this.socket = this.$nuxtSocket({})
    try {
      channel.bind('test-event', (data) => {
        console.log(data)
      })
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    testSocketIo() {
      this.socket.emit('test', 'testmessage', (res) => {
        this.socketRes = res
      })
    },
    async testPusher() {
      const trigger = await this.$axios.get('/api/test')
      console.log(trigger.data)
    },
  },
}
</script>
