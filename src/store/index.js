import Vue from 'vue'
import Vuex from 'vuex'
import products from './products'
import productPrivateStore from './productPrivateStore'
import notification from './notification'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    productPrivateStore,
    notification
  }
})
