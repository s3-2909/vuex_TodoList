import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count++
    },
    addN(state, payload) {
      state.count += payload
    },
    subtrac(state) {
      state.count--
    },
    subtracN(state, payload) {
      state.count -= payload
    },
  },
  actions: {
    addAsync(context, payload) {
      setTimeout(() => {
        context.commit('add')
      }, 1500)
    },
    subAsync({
      commit
    }, payload) {
      setTimeout(() => {
        commit('subtracN', payload)
      }, 1500)
    }
  },
  getters: {
    showNum: state => {
      return `当前state.count是【${state.count }】`
    }
  },
  modules: {}
})