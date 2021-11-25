import Vue from 'vue'
import Vuex from 'vuex'
import products from './products'
import productPrivateStore from './productPrivateStore'
import notification from './notification'
import orders from './orders'
import accountInfo from './accountInfo'
import reviews from './reviews'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    productPrivateStore,
    notification,
    orders,
    accountInfo,
    reviews
  }
})
