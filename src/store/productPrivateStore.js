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
    appendCart: (state, payload) => {
      state.cart = [...state.cart, payload]
    },
    increaseQtyItemExistedInCart: (state, { updatedQty, itemIndex }) => {
      state.cart[itemIndex].quantity = updatedQty;
    },
    detachCart: (state, productId) => {
      if (state.cart.includes(productId)) {
        state.cart = state.cart.filter(id => id !== productId)
      }
    },
  },

  actions: {
    updateWishList: ({ commit, getters }, productId) => {
      getters.isWishlisted(productId)
        ? commit('detachWishlist', productId)
        : commit('appendWishlist', productId)
    },

    updateCart: ({ dispatch, commit, state, getters, }, productPayload) => {
      const { variantColor, quantity, size, sizeStock } = productPayload;

      const successPayload = {
        type: 'success',
        message: 'Added to cart',
      };

      const errorPayload = {
        type: 'error',
        message: 'Sorry, there is not enough stock remaining for this size',
      };

      // Check if selected item already exists in cart
      if (getters.isItemInCart(productPayload)) {
        const itemIndex = state.cart.findIndex(
          (item) => item.variantColor === variantColor && item.size === size
        );
        const tempStock = state.cart[itemIndex].quantity + quantity;

        // If existed, check stock then update quantity in cart
        if (tempStock > sizeStock) {
          dispatch('notification/showNotification', errorPayload, { root: true })
        } else {
          commit('increaseQtyItemExistedInCart', { updatedQty: tempStock, itemIndex: itemIndex })
          dispatch('notification/showNotification', successPayload, { root: true })
        }
      } else {
        // If not existed then add product to cart
        commit('appendCart', productPayload)
        dispatch('notification/showNotification', successPayload, { root: true })
      }
    },
  },

  getters: {
    isWishlisted: (state) => (productId) => {
      return state.wishlist.includes(productId);
    },
    isItemInCart: (state) => (product) => {
      const { variantColor, size } = product;
      return state.cart.find(item => item.variantColor === variantColor && item.size === size)
    },
    isProductIdInCart: (state) => (id) => {
      return state.cart.find(item => item.productId === id)
    },
    cartTotal: ({ cart }) => cart.length,
    cart: ({ cart }) => cart.sort((a, b) => a.productId - b.productId),
  },
}
