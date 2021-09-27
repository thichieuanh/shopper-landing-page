import Vue from 'vue'
import Vuex from 'vuex'
import womenProducts from '@/assets/data/womenProducts';
import reviews from '@/assets/data/reviews';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    womenProducts,
    reviews
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
