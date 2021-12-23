import API from '@/api';
import reviews from '@/assets/data/reviews';

export default {
  namespaced: true,

  state: () => ({
    womenProducts: [],
    menProducts: [],
    kidsProducts: [],
    products: [],
    reviews
  }),

  mutations: {
    products: (state, products) => state.womenProducts = products,
    womenProducts: (state, womenProducts) => state.womenProducts = womenProducts,
    menProducts: (state, menProducts) => state.menProducts = menProducts,
    kidsProducts: (state, kidsProducts) => state.kidsProducts = kidsProducts,
  },

  actions: {
    async getProducts({ commit }) {
      try {
        const products = await API.getProducts();
        const womenProducts = products.filter(product => product.productGroup === 'women');
        const menProducts = products.filter(product => product.productGroup === 'men');
        const kidsProducts = products.filter(product => product.productGroup === 'kids');

        commit('products', products);
        commit('womenProducts', womenProducts);
        commit('menProducts', menProducts);
        commit('kidsProducts', kidsProducts);
      } catch (error) {
        console.error(error);
        throw new Error('Error when fetching products from db', error);
      }
    },
  },

  getters: {
    getAllProducts: ({ products }) => products,

    getProductById: (_state, getters) => (id) => {
      return getters.getAllProducts.find(product => product._id === id);
    },
  },
}
