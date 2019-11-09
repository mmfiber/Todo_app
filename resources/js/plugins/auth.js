const state = {
  user: null,
  tasks: null
}

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : '',
  todo: state => state.tasks.todo ? state.tasks.todo : '',
  done: state => state.tasks.done ? state.tasks.done : '',
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setTasks (state, tasks) {
    state.tasks = tasks
  },
}

const actions = {
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    if (response.data.error) return response.data.error
    context.commit('setUser', response.data)
  },
  async login (context, data) {
    const response = await axios.post('/api/login', data)
    if (response.data.error) return response.data.error
    context.commit('setUser', response.data)

    const response2 = await axios.post('/api/tasks', response.data)
    context.commit('setTasks', response2.data)
  },
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  async currentUser (context) {
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser', user)

    const response2 = await axios.post('/api/tasks', user)
    context.commit('setTasks', response2.data)
  },
  async edit (context, data) {
    const response = await axios.post('/api/edit', data)
    context.commit('setTasks', response.data)
  },
  async delete (context, data) {
    const response = await axios.post('/api/delete', data)
    context.commit('setTasks', response.data)
  },
  async createTodo (context, data) {
    const response = await axios.post('/api/createTodo', data)
    context.commit('setTasks', response.data)
  },
  async changeState (context, data) {
    const response = await axios.post('/api/changeState', data)
    context.commit('setTasks', response.data)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}