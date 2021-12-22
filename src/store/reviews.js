import messages from '@/assets/data/notiMessages';
import API from '@/api';

export default {
  namespaced: true,

  state: () => ({
    reviews: [],
    productId: undefined
  }),

  mutations: {
    getProductReviewList: (state, payload) => {
      state.reviews = payload
    },

    appendReview: (state, payload) => {
      state.reviews = [...state.reviews, payload]
    },
  },

  actions: {
    async getReviews({ commit }, productId) {
      try {
        const productReviews = await API.getReviews(productId);
        commit('getProductReviewList', productReviews)
      } catch (e) {
        console.error(e);
        throw new Error('Error when fetching product reviews', e);
      }
    },

    async addReview({ commit, dispatch }, payload) {
      commit('appendReview', payload.reviewDetails)
      dispatch('notification/showNotification', messages.reviewPosted, { root: true })
      await API.addReview(payload);
    },
  },

  getters: {
  }
}
