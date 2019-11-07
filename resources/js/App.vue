<template lang="pug">
  v-app
    .wrapper.fill-height
      Navbar.stick
      main
        v-container
          v-row.justify-center
            RouterView
      footer
</template>
<style>
.wrapper {
  background: white;
}
.stick {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
<script>
import Navbar from "./components/Navbar.vue"
export default {
  components: {
    Navbar,
  }
}
</script>