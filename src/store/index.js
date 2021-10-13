import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/api';
// import womenProducts from '@/assets/data/womenProducts';
import reviews from '@/assets/data/reviews';

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    womenProducts: [],
    // womenProducts,
    reviews
  }),
  mutations: {
    womenProducts: (state, womenProducts) => state.womenProducts = womenProducts,
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const womenProducts = await Api.getWomenProducts();
        console.log('womenProducts:', womenProducts)
        commit('womenProducts', womenProducts);
      } catch (error) {
        console.error(error);
        throw new Error('Something went wrong!!!!.', error);
      }
    },
  },
  modules: {
  }
})
