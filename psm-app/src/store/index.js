import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

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
    },
    removeUser : (state) => {
      state.user = undefined;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
