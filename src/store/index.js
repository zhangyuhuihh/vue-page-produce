import Vue from 'vue'
import Vuex from 'vuex'
import partComponent from '@/views/partComponent/vuex_module.js'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    partComponent
  }
})
