<template>
  <div class="wrapper">
    <button @click="test">SEND SOCKET</button>
    <h1>{{ res }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      res: '',
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({})
  },
  methods: {
    test() {
      this.socket.emit('test', 'testmessage', (res) => {
        this.res = res
      })
    },
  },
}
</script>
