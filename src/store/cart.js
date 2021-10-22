export default {
  namespaced: true,

  state: () => ({
    cart: [],
  }),
  mutations: {
    appendCart: (state, productId) => {
      if (!state.cart.includes(productId)) {
        state.cart = [...state.cart, productId]
      }
    },
    detachCart: (state, productId) => {
      if (state.cart.includes(productId)) {
        state.cart = state.cart.filter(id => id !== productId)
      }
    }
  },
  actions: {
    addCart: ({ commit }, productId) => {
      commit('appendCart', productId)
    },
    removeCart: ({ commit }, productId) => {
      commit('detachCart', productId)
    },
  },
}
