import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import endpoint from "@/endpoint.js";

export default createStore({
  state: {
  	user: "",
    rules:{}
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setUser : (state, user) => {
      state.user = {...user};
      state.user.avatar = `${endpoint.storage}/media/avatar_${user.uid}.png`;
    },
    updateRules : (state, rules) => {
      state.rules = rules
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
