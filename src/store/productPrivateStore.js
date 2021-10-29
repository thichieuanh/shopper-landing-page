const successPayload = {
  type: 'success',
  message: 'Added to cart',
};
const errorPayload = {
  type: 'error',
  message: 'Sorry, there is not enough stock remaining for this size',
};
const duplicatedItem = {
  type: 'error',
  message: 'Selected product is identical to the previous one',
}
const replacedItem = {
  type: 'success',
  message: 'Cart updated',
}

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
    changeQtyItemExistedInCart: (state, { updatedQty, itemIndex }) => {
      state.cart[itemIndex].quantity = updatedQty;
    },
    detachCart: (state, productId) => {
      if (state.cart.includes(productId)) {
        state.cart = state.cart.filter(id => id !== productId)
      }
    },
    replaceItemInCart: (state, { itemIndexToUpdate, replacingItem }) => {
      state.cart.splice(itemIndexToUpdate, 1, ...[replacingItem].filter(Boolean));
    }

  },

  actions: {
    updateWishList: ({ commit, getters }, productId) => {
      getters.isWishlisted(productId)
        ? commit('detachWishlist', productId)
        : commit('appendWishlist', productId)
    },

    updateCart: ({ dispatch, commit, state, getters, }, { isUpdatingCart, itemIndexToUpdate, productPayload, }) => {
      const { variantColor, quantity, sizeName, sizeStock } = productPayload;

      if (isUpdatingCart) {
        const updatingItem = state.cart[itemIndexToUpdate];
        let replacingItem = productPayload;

        const isUpdatingAndNewItemsIdentical =
          (updatingItem.sizeName === replacingItem.sizeName) &&
          (updatingItem.variantColor === replacingItem.variantColor) &&
          (updatingItem.quantity === replacingItem.quantity)

        if (isUpdatingAndNewItemsIdentical) {
          dispatch('notification/showNotification', duplicatedItem, { root: true })
        } else {
          // Check if selected item already exists in cart
          const index = getters.itemIndexInCart(variantColor, sizeName)
          const isItemExistedInCart = (index !== -1);

          if (isItemExistedInCart) {
            let updatedQuantity = state.cart[index].quantity + quantity;
            if (updatedQuantity > sizeStock) {
              updatedQuantity = sizeStock
            }
            if (itemIndexToUpdate !== index) replacingItem = undefined;
            commit('changeQtyItemExistedInCart', { updatedQty: updatedQuantity, itemIndex: index })
          }

          commit('replaceItemInCart', { itemIndexToUpdate: itemIndexToUpdate, replacingItem: replacingItem })
          dispatch('notification/showNotification', replacedItem, { root: true })
        }
      } else {
        const index = getters.itemIndexInCart(variantColor, sizeName)
        const isItemExistedInCart = index !== -1;

        /* Case: Add to cart */
        // Check if selected item already exists in cart
        if (isItemExistedInCart) { // If existed, check stock then update quantity in cart
          const updatedQuantity = state.cart[index].quantity + quantity;
          if (updatedQuantity > sizeStock) {
            dispatch('notification/showNotification', errorPayload, { root: true })
          } else {
            commit('changeQtyItemExistedInCart', { updatedQty: updatedQuantity, itemIndex: index })
            dispatch('notification/showNotification', successPayload, { root: true })
          }
        } else { // If not existed then add product to cart
          commit('appendCart', productPayload)
          dispatch('notification/showNotification', successPayload, { root: true })
        }
      }
    },
  },

  getters: {
    isWishlisted: (state) => (productId) => {
      return state.wishlist.includes(productId);
    },
    itemIndexInCart: (state) => (variantColor, sizeName) => {
      return state.cart.findIndex(item => item.variantColor === variantColor && item.sizeName === sizeName)
    },
    isProductIdInCart: (state) => (id) => {
      return state.cart.find(item => item.productId === id)
    },
    cartTotal: ({ cart }) => cart.length,
    cart: ({ cart }) => cart.sort((a, b) => a.productId - b.productId),
  },
}
