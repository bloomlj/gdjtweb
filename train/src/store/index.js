import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用来存储暂时数据
    frontData: [],
    armData: [],
    wristData: [],
    // 用来存储总数据
    frontAll: [],
    armAll: [],
    wristAll: []
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
