import { createStore } from 'vuex'

export default createStore({
  state: {
    token: ""
  },
  getters: {
    token : state => state.token
  },
  mutations: {
    setToken(state, new_token) {
      state.token = new_token;
    }
  },
  actions: {
  },
  modules: {
  }
})
