import messages from '@/assets/data/notiMessages';

export default {
  namespaced: true,

  state: () => ({
    reviews: [],
    productId: undefined
  }),

  mutations: {
    getProductReviewList: (state, product) => {
      state.reviews = product.reviews
    },

    appendReview: (state, payload) => {
      state.reviews = [...state.reviews, payload]
    },
  },

  actions: {
    addReview: ({ commit, dispatch }, payload) => {
      commit('appendReview', payload)
      dispatch('notification/showNotification', messages.reviewPosted, { root: true })
    },
  },

  getters: {
  }
}
