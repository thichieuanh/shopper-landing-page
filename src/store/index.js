import Vue from 'vue'
import Vuex from 'vuex'
import products from './products'
import product from './product'
import productPrivateStore from './productPrivateStore'
import notification from './notification'
import orders from './orders'
import accountInfo from './accountInfo'
import reviews from './reviews'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    product,
    productPrivateStore,
    notification,
    orders,
    accountInfo,
    reviews
  }
})
