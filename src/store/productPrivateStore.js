export default {
  namespaced: true,

  state: () => ({
    wishlist: [],
    cart: [],
  }),
  mutations: {
    appendWishlist: (state, productId) => {
      if (!state.wishlist.includes(productId)) {
        state.wishlist = [...state.wishlist, productId]
      }
    },
    detachWishlist: (state, productId) => {
      if (state.wishlist.includes(productId)) {
        state.wishlist = state.wishlist.filter(id => id !== productId)
      }
    },
    detachCart: (state, productId) => {
      if (state.cart.includes(productId)) {
        state.cart = state.cart.filter(id => id !== productId)
      }
    },
    appendCart: (state, payload) => {
      state.cart = [...state.cart, payload]
    },
  },
  actions: {
    updateWishList: ({ commit, getters }, productId) => {
      getters.isWishlisted(productId)
        ? commit('detachWishlist', productId)
        : commit('appendWishlist', productId)
    },
    addToCart: ({ commit }, payload) => {
      commit('appendCart', payload)
    },
  },
  getters: {
    isWishlisted: (state) => (productId) => {
      return state.wishlist.includes(productId);
    },
    isItemInCart: (state) => (product) => {
      const { variantId, size } = product;
      return state.cart.find(item => item.variantId === variantId && item.size === size)
    },
    isProductIdInCart: (state) => (id) => {
      return state.cart.find(item => item.productId === id)
    },
    cartTotal: ({ cart }) => cart.length,
  },
}
