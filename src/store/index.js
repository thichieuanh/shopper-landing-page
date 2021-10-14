import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/api';
import reviews from '@/assets/data/reviews';

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    womenProducts: [],
    menProducts: [],
    kidsProducts: [],
    reviews
  }),
  mutations: {
    womenProducts: (state, womenProducts) => state.womenProducts = womenProducts,
    menProducts: (state, menProducts) => state.menProducts = menProducts,
    kidsProducts: (state, kidsProducts) => state.kidsProducts = kidsProducts,
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const womenProducts = await Api.getWomenProducts();
        const menProducts = await Api.getMenProducts();
        const kidsProducts = await Api.getKidsProducts();

        commit('womenProducts', womenProducts);
        commit('menProducts', menProducts);
        commit('kidsProducts', kidsProducts);
      } catch (error) {
        console.error(error);
        throw new Error('Something went wrong!!', error);
      }
    },
  },
  modules: {
  }
})
