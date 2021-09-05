<template>
  <form @submit.prevent="createAccount">
    <input
      v-model="username"
      type="text"
      class="username form-input"
      placeholder="Username"
      required
    />
    <nuxt-link class="secondary-link" to="docs/creating-accounts"
      >Learn More</nuxt-link
    >
    <input
      v-model="email"
      type="email"
      class="email form-input"
      placeholder="Email"
      required
    />
    <input
      v-model="password"
      type="password"
      class="password form-input"
      placeholder="Password"
      required
    />
    <input type="submit" class="submit" value="Create account" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async createAccount() {
      if (this.hasInvalidCharacters(this.username))
        return this.$toast.error('Invalid username!')
      await this.$axios.post('/api/auth/register', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      window.$nuxt.$router.push(`/login`)
    },
    hasInvalidCharacters(str) {
      const validCharacters = /^[0-9a-zA-Z_.]+$/
      if (!validCharacters.test(str)) return true
    },
  },
}
</script>

<style lang="sass" scoped>
form input
  width: 100%

form .submit
  background-color: #ddffe0
  cursor: pointer

  &:hover
    background-color: #afb
</style>
