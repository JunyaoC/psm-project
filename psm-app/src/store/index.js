import { createStore } from 'vuex'

export default createStore({
  state: {
  	user: ""
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
