import Vue from 'vue'
import Vuex from 'vuex'
import API from '../lib/restAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    sessionToken: ''
  },
  mutations: {
    clear (state) {
      state.isLogin = false
      state.sessionToken = ''
      localStorage.removeItem('sessionToken')
    },
    setSessionToken (state, sessionToken) {
      state.isLogin = true
      state.sessionToken = sessionToken
      localStorage.setItem('sessionToken', sessionToken)
    }
  },
  actions: {
    load: ({ commit }) => {
      new API().health()
        .then(sessionToken => commit('setSessionToken', sessionToken))
        .catch(() => commit('clear'))
    },
    signup: ({ commit }, payload) => {
      new API().signup(payload)
        .then(sessionToken => commit('setSessionToken', sessionToken))
        .catch((e: Error) => {
          commit('clear')
          alert(e.message)
        })
    },
    signin: ({ commit }, payload) => {
      new API().signin(payload)
        .then(sessionToken => commit('setSessionToken', sessionToken))
        .catch((e: Error) => {
          commit('clear')
          alert(e.message)
        })
    },
    fetchLineCooperationUrl: () => {
      return new API().generateLineCooperationUrl()
    },
    lineCooperationSignin: ({ commit }, params) => {
      new API().lineCooperationSignin(params)
        .then(sessionToken => commit('setSessionToken', sessionToken))
        .catch((e: Error) => {
          commit('clear')
          alert(e.message)
        })
    },
    logout: ({ commit }) => {
      new API()
        .logout()
        .catch((e: Error) => alert(e.message))
        .finally(() => commit('clear'))
    }
  },
  modules: {
  }
})
