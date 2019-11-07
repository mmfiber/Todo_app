import Vue from 'vue'
import VueRouter from 'vue-router'

import ToDo from '../views/Todo.vue'
import Account from '../views/Account.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/todo'
  },
  {
    path: '/todo',
    component: ToDo
  },
  {
    path: '/login',
    component: Account
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router