import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
      const sessionToken = localStorage.getItem('sessionToken')
      if (sessionToken) {
        axios({
          url: 'http://localhost:8080/health',
          method: 'get',
          headers: { Authorization: sessionToken },
          data: {}
        }).then(res => {
          if (res.status === 200) {
            commit('setSessionToken', sessionToken)
          } else {
            commit('clear')
          }
        }).catch(() => commit('clear'))
      } else {
        commit('clear')
      }
    },
    signup: ({ commit }, payload) => {
      axios({
        url: 'http://localhost:8080/signup',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          mail: payload.mail,
          pass: payload.pass
        }
      }).then(res => {
        if (res.status === 200) {
          commit('setSessionToken', res.headers['set-authorization'])
        }
      })
    },
    signin: ({ commit }, payload) => {
      axios({
        url: 'http://localhost:8080/signin',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          mail: payload.mail,
          pass: payload.pass
        }
      }).then(res => {
        if (res.status === 200) {
          const toenk = res.headers['set-authorization']
          if (toenk) commit('setSessionToken', toenk)
        }
      })
    },
    fetchLineCooperationUrl: () => {
      return axios({
        url: 'http://localhost:8080/oauth2/signin/line',
        method: 'post'
      }).then(res => {
        const redirectUri = res.data.redirect_uri
        if (res.status === 200 && redirectUri) {
          return Promise.resolve(redirectUri)
        } else {
          return Promise.reject(new Error('連携URIの発行に失敗しました'))
        }
      })
    },
    lineCooperationSignin: ({ commit }, params) => {
      return axios({
        url: 'http://localhost:8080/oauth2/signin/line',
        method: 'get',
        params: params
      }).then(res => {
        if (res.status === 200) {
          commit('setSessionToken', res.headers['set-authorization'])
          return Promise.resolve()
        }
        return Promise.reject(new Error('Lineでのログインに失敗しました'))
      }).catch(() => Promise.reject(new Error('Lineでのログインに失敗しました')))
    },
    logout: ({ commit }) => {
      const sessionToken = localStorage.getItem('sessionToken')
      if (sessionToken) {
        axios({
          url: 'http://localhost:8080/logout',
          method: 'delete',
          headers: { Authorization: sessionToken },
          data: {}
        }).finally(() => {
          commit('clear')
        })
      } else {
        commit('clear')
      }
    }
  },
  modules: {
  }
})
