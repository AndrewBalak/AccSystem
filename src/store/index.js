import Vue from 'vue'
import Vuex from 'vuex'

import Api from '@/api'
const API = new Api()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {
      accounts: [],
      currentAccount: null
    },
    meta: {
      loading: null,
      alert: {
        message: '',
        type: ''
      }
    }
  },
  mutations: {
    setData (state, { value, path }) {
      state.data[path] = value
    },
    setMeta (state, { value, path }) {
      state.meta[path] = value
    },
    addAccount (state, acc) {
      state.data.accounts.push(acc)
    },
    updateAccount (state, upAcc) {
      state.data.accounts = state.data.accounts.map((acc) => {
        return acc.id === upAcc.id ? upAcc : acc
      })
    }
  },
  actions: {
    async isLoginUnique ({ commit }, login) {
      return await API.isLoginUnique(login)
    },
    async isPasswordCorrect ({ commit }, { login, password }) {
      return await API.isPasswordCorrect({ login, password })
    },
    async getAccountById ({ commit }, id) {
      return await API.getAccountById(id)
    },
    async updateAccount ({ commit }, account) {
      commit('setMeta', { value: true, path: 'loading' })

      await API.updateAccounts(account)

      commit('updateAccount', account)

      commit('setMeta', { value: false, path: 'loading' })

      commit('setMeta', { value: { message: 'Успешно изменено', type: 'success', show: true }, path: 'alert' })
      setTimeout(() => {
        commit('setMeta', { value: { show: false }, path: 'alert' })
      }, 500)
    },
    async signIn ({ state, commit }, { login }) {
      const currentAccount = state.data.accounts.filter((acc) => acc.login === login)[0]

      commit('setData', { value: currentAccount, path: 'currentAccount' })
      localStorage.setItem('currentAccount', JSON.stringify(currentAccount))

      commit('setMeta', { value: { message: 'Успешный вход', type: 'success', show: true }, path: 'alert' })
      setTimeout(() => {
        commit('setMeta', { value: { show: false }, path: 'alert' })
      }, 500)
    },
    signOut ({ commit }) {
      commit('setData', { value: null, path: 'currentAccount' })
      localStorage.setItem('currentAccount', null)
    },
    async registration ({ commit, dispatch }, account) {
      commit('setMeta', { value: true, path: 'loading' })

      const newAccount = await API.addAccount(account)

      commit('addAccount', newAccount)

      await dispatch('signIn', newAccount)

      commit('setMeta', { value: false, path: 'loading' })
    },
    async init ({ commit }) {
      commit('setMeta', { value: true, path: 'loading' })

      commit('setData', { value: await API.fetch(), path: 'accounts' })

      commit('setData', { value: JSON.parse(localStorage.getItem('currentAccount')), path: 'currentAccount' })

      commit('setMeta', { value: false, path: 'loading' })
    }
  },
  getters: {
  }
})
