<template lang="pug">
  v-form(id="register-form" @submit.prevent="register")
    v-text-field(label="Name" v-model="registerForm.name"
        required :error-messages="registerFormError.name")
    v-text-field(label="E-mail" v-model="registerForm.email"
        required :error-messages="registerFormError.email")
    v-text-field(label="Password" v-model="registerForm.password"
      required type="password" :error-messages="registerFormError.password")
    v-text-field(label="Password (confirm)" v-model="registerForm.password_confirmation"
        required type="password")
    v-btn.primary(type="submit" form="register-form" dark outlined) Register
</template>

<script>
export default {
  data () {
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      registerFormError: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async register () {
      this.initRegisterFormError()
      const error_msg = await this.$store.dispatch('auth/register', this.registerForm)

      if (error_msg) {
        for (let k in error_msg) {
          this.registerFormError[k] = error_msg[k][0]
        }
      } else {
        this.$router.push('/')
      }
    },
    initRegisterFormError() {
      for (let k in this.registerFormError) this.registerFormError[k] = ""
    }
  }
}
</script>