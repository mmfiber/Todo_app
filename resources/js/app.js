import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import vuetify from './plugins/vuetify'

import './bootstrap'


const createApp = async () => {
  await store.dispatch('auth/currentUser')

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

createApp()