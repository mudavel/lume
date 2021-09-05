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
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
        },
      })
      if (this.$auth.loggedIn) return
      this.$toast.error("Email and password don't match.")
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
