export default {
  namespaced: true,

  state: () => ({
    reviews: []
  }),

  mutations: {
    getProductReviewList: (state, product) => {
      state.reviews = product.reviews
    },
  },

  actions: {

  },

  getters: {
  }
}
