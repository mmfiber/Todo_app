<template lang="pug">
  v-form(id="login-form" @submit.prevent="login")
    v-text-field(label="E-mail" v-model="loginForm.email"
         required :error-messages="loginFormError.email")
    v-text-field(label="Password" v-model="loginForm.password"
        required type="password" :error-messages="loginFormError.password")
    v-btn.primary(type="submit" form="login-form" dark outlined) Login
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginFormError: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    async login () {
      this.initLoginFormError()
      const error_msg = await this.$store.dispatch('auth/login', this.loginForm)

      if (error_msg) {
        for (let k in error_msg) {
          this.loginFormError[k] = error_msg[k][0]
        }
      } else {
        this.$router.push('/')
      }
    },
    initLoginFormError() {
      for (let k in this.loginFormError) this.loginFormError[k] = ""
    },
  }
}
</script>