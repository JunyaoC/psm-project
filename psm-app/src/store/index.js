import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const endpoint = "http://185.185.40.33:3000"

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
    setUser : (state, user) => {
      state.user = {...user};
      state.user.avatar = `${endpoint}/media/avatar_${user.uid}.png`;
    },
    removeUser : (state) => {
      state = {}
      
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
