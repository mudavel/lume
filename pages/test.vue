<template>
  <div class="wrapper">
    <h1>{{ response }}</h1>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
  data() {
    return {
      response: '',
    }
  },
  async mounted() {
    const testRequest = await this.$axios.get('/api')
    this.response = testRequest.data
  },
}
</script>
