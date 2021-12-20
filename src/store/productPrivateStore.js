import { random, round } from 'lodash'
import messages from '@/assets/data/notiMessages';
import Api from '@/api';

export default {
  namespaced: true,

  state: () => ({
    cart: [],
    isCouponApplied: false,
    discountRateForCoupon: 0,
    coupon: '',
    wishlist: [],
    product: null
  }),

  mutations: {
    appendCart: (state, payload) => {
      state.cart = [...state.cart, payload]
    },

    changeQtyItemExistedInCart: (state, { updatedQty, itemIndex }) => {
      state.cart[itemIndex].quantity = updatedQty;
    },

    detachCart: (state, itemIndexToUpdate) => {
      state.cart.splice(itemIndexToUpdate, 1)
    },

    replaceItemInCart: (state, { itemIndexToUpdate, replacingItem }) => {
      state.cart.splice(itemIndexToUpdate, 1, ...[replacingItem].filter(Boolean));
      // Rest parameter syntax, the last param is optional, make it as undefined in case of just removing the product
      // then use .filter(Boolean) to remove that falsy value
    },

    applyCoupon: (state, text) => {
      state.isCouponApplied = true;
      state.discountRateForCoupon = round(random(0.1, 0.7), 2);
      state.coupon = text
    },

    removeCoupon: (state) => {
      state.isCouponApplied = false;
      state.discountRateForCoupon = 0;
    },

    wishlist: (state, payload) => {
      state.wishlist = payload;
    },

    setProductDetail: (state, payload) => {
      state.product = payload;
    }
  },

  actions: {
    async getProduct({ commit }, productId) {
      const currentProduct = await Api.getProduct(productId);
      commit('setProductDetail', currentProduct)
    },

    async getWishlistedProducts({ commit }) {
      const products = await Api.getProducts();
      const wishlist = products.filter(product => product.isWishlisted === true);
      commit('wishlist', wishlist)
    },

    async updateProductWishlistState({ getters, commit, dispatch }, productId) {
      commit('notification/loading', true, { root: true })
      await Api.updateProductWishlistState(productId);
      await dispatch('getWishlistedProducts');

      commit('notification/loading', false, { root: true })
      dispatch('notification/showNotification',
        getters.isWishlisted(productId) ? messages.addedToWishlist : messages.removedFromWishlist,
        { root: true })
    },

    updateCart: ({ dispatch, commit, state, getters, }, { isUpdatingCart, itemIndexToUpdate, productPayload, }) => {
      /*
      - itemIndexToUpdate: the item being edited
      - indexOfPayload: check if the selected product (payload) existed in cart or not
      */
      const { variantColor, quantity, sizeName, sizeStock } = productPayload;
      const indexOfPayload = getters.itemIndexInCart(variantColor, sizeName)
      const isItemExistedInCart = indexOfPayload !== -1;
      let updatedQuantity = isItemExistedInCart ? state.cart[indexOfPayload].quantity + quantity : undefined;

      if (isUpdatingCart) { // Case 1: editing cart
        const updatingItem = state.cart[itemIndexToUpdate];
        let replacingItem = productPayload;

        const isUpdatingAndNewItemsIdentical = (updatingItem.sizeName === replacingItem.sizeName) && (updatingItem.variantColor === replacingItem.variantColor) && (updatingItem.quantity === replacingItem.quantity)

        if (isUpdatingAndNewItemsIdentical) {
          dispatch('notification/showNotification', messages.duplicatedItem, { root: true })
        } else {
          if (isItemExistedInCart) {
            /* Replace current item to other item already existed in cart:
            Increase the existing item's quantity and delete editing item
            */
            if (updatedQuantity > sizeStock) {
              updatedQuantity = sizeStock
            }
            if (itemIndexToUpdate !== indexOfPayload) replacingItem = undefined;
            commit('changeQtyItemExistedInCart', { updatedQty: updatedQuantity, itemIndex: indexOfPayload })
          }

          commit('replaceItemInCart', { itemIndexToUpdate: itemIndexToUpdate, replacingItem: replacingItem })
          dispatch('notification/showNotification', messages.replacedItem, { root: true })
        }
      } else { // Case 2: add new item to cart
        if (isItemExistedInCart) { // If existed, check stock then increase quantity in cart
          if (updatedQuantity > sizeStock) {
            dispatch('notification/showNotification', messages.notEnoughStockRemaining, { root: true })
          } else {
            commit('changeQtyItemExistedInCart', { updatedQty: updatedQuantity, itemIndex: indexOfPayload })
            dispatch('notification/showNotification', messages.addedToCart, { root: true })
          }
        } else { // If not existed then add product to cart
          commit('appendCart', productPayload)
          dispatch('notification/showNotification', messages.addedToCart, { root: true })
        }
      }
    },
  },

  getters: {
    wishlist: ({ wishlist }) => wishlist,

    isWishlisted: (state) => (productId) => {
      return state.wishlist.some(product => product._id === productId);
    },

    itemIndexInCart: (state) => (variantColor, sizeName) => {
      return state.cart.findIndex(item => item.variantColor === variantColor && item.sizeName === sizeName)
    },

    isProductIdInCart: (state) => (id) => {
    },

    discountRateForCoupon: (state) => state.isCouponApplied ? round(random(0.1, 0.7), 2) : 0,

    cart: ({ cart }) => cart.sort((a, b) => a.productId - b.productId),

    cartLength: ({ cart }) => cart.length,

    cartSubtotal: ({ cart }) => cart.reduce((subtotal, { quantity, price }) => {
      subtotal += (quantity * price)
      return subtotal
    }, 0),
  },
}
