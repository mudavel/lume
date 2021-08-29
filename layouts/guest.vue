<template>
  <div>
    <img
      src="~/static/back.svg"
      alt="Go back"
      class="go-back-image"
      @click="toHomePage"
    />
    <Nuxt />
  </div>
</template>

<script>
export default {
  auth: 'guest',
  methods: {
    async toHomePage() {
      await window.$nuxt.$router.push('/')
    },
  },
}
</script>

<style lang="sass" scoped>
.go-back-image
  margin: 10px
  width: 50px
  position: absolute
</style>
