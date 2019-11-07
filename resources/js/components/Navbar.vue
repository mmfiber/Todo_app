<template lang="pug">
  v-toolbar(dark).primary
    v-toolbar-title Todo App
    v-spacer
    v-toolbar-items
      v-icon.mr(large) fa-user
      v-btn(v-show="isLogin" text) {{ user ? user.name : "" }}
      v-btn(v-if="isLogin" text @click="logout") Logout
      v-btn(v-else text @click="login") Login
</template>

<style lang="css" scoped>
  .mr{
    margin-right: 10px;
  }
</style>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isLogin() {
      return Boolean(this.user)
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  }
}
</script>