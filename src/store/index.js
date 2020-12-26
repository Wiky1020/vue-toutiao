import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
const TOUTIAO_KEY = 'TOUTIAO_KEY'
export default new Vuex.Store({
  state: {
    user: getItem(TOUTIAO_KEY),
    tabbarheight: null
  },
  mutations: {
    getToken (state, val) {
      state.user = val
      setItem(TOUTIAO_KEY, state.user)
    },
    getTabBarHeight (state, val) {
      state.tabbarheight = val
    }
  },
  actions: {
  },
  modules: {
  }
})
