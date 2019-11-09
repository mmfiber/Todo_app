import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import vuetify from './plugins/vuetify'

import './bootstrap'


const createApp = async () => {
  await store.dispatch('auth/currentUser')

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !store.state.auth.user) {
      next({ path: '/login', query: { redirect: to.fullPath }});
    } else {
      next();
    }
  })

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

createApp()