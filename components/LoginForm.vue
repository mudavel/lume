<template>
  <form @submit.prevent="validateLogin">
    <input
      v-model="email"
      type="email"
      class="email form-input"
      placeholder="Email"
      name="email"
      required
    />
    <input
      v-model="password"
      type="password"
      class="password form-input"
      placeholder="Password"
      name="password"
      required
    />
    <input type="submit" value="Login" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async validateLogin() {
      console.log(`Authenticated 1: ${this.$auth.loggedIn}`)
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
        },
      })
      console.log(`Authenticated 2: ${this.$auth.loggedIn}`)
      if (this.$auth.loggedIn) {
        await window.$nuxt.$router.push('/dashboard')
      }
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
