<template lang="pug">
  BaseLayout(tab1="Login" tab2="Register")

    template(v-slot:tab1)
      v-row.justify-center
        v-col(cols=12 sm=8)
          Login

    template(v-slot:tab2)
      v-row.justify-center
        v-col(cols=12 sm=8)
          Register
</template>

<script>
import BaseLayout from"../components/BaseLayout.vue"
import Login from"../components/Login.vue"
import Register from"../components/Register.vue"

export default {
  components: {
    BaseLayout,
    Login,
    Register
  },
}
</script>