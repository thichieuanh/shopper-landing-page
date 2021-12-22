import { random, round } from 'lodash'
import messages from '@/assets/data/notiMessages';
import API from '@/api';

export default {
  namespaced: true,

  state: () => ({
    cart: [],
    isEditingCart: null,
    updatingItemInCart: {},
    isCouponApplied: false,
    discountRateForCoupon: 0,
    coupon: '',
    wishlist: [],
    product: null
  }),

  mutations: {
    cart: (state, payload) => {
      state.cart = payload;
    },

    toggleEditCart: (state, payload) => {
      state.isEditingCart = payload.isEditingCart;
      state.updatingItemInCart = payload.updatingItemInCart;
    },

    // replaceItemInCart: (state, { itemIndexToUpdate, replacingItem }) => {
    //   state.cart.splice(itemIndexToUpdate, 1, ...[replacingItem].filter(Boolean));
    //   // Rest parameter syntax, the last param is optional, make it as undefined in case of just removing the product
    //   // then use .filter(Boolean) to remove that falsy value
    // },

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
      const currentProduct = await API.getProduct(productId);
      commit('setProductDetail', currentProduct)
    },

    async getWishlistedProducts({ commit }) {
      const products = await API.getProducts();
      const wishlist = products.filter(product => product.isWishlisted === true);
      commit('wishlist', wishlist)
    },

    async updateProductWishlistState({ getters, commit, dispatch }, productId) {
      commit('notification/loading', true, { root: true })
      await API.updateProductWishlistState(productId);
      await dispatch('getWishlistedProducts');

      commit('notification/loading', false, { root: true })
      dispatch('notification/showNotification',
        getters.isWishlisted(productId) ? messages.addedToWishlist : messages.removedFromWishlist,
        { root: true })
    },

    async getCart({ commit }) {
      const database = await API.getCart();
      commit('cart', database)
    },

    async updateCart({ dispatch, state, }, productPayload) {
      if (state.isEditingCart) {
        const res = await API.editCart({
          id: state.updatingItemInCart.id,
          replacedProduct: productPayload
        });

        if (res.status === 'Duplicated item') {
          dispatch('notification/showNotification', messages.duplicatedItem, { root: true })
        } else {
          dispatch('getCart');
          dispatch('notification/showNotification', messages.replacedItem, { root: true })
        }
      } else {
        const res = await API.addToCart(productPayload);
        if (res.status === 'Not enough stock remaining') {
          dispatch('notification/showNotification', messages.notEnoughStockRemaining, { root: true })
        } else {
          dispatch('getCart');
          dispatch('notification/showNotification', messages.addedToCart, { root: true })
        }
      }
    },

    async removeFromCart({ commit, dispatch }, id) {
      await API.removeFromCart(id);
      dispatch('getCart');
      commit('notification/showNotification', messages.removedFromCart, { root: true });
    }
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

    cart: ({ cart }) => cart,

    cartLength: ({ cart }) => cart.length,

    cartSubtotal: ({ cart }) => cart.reduce((subtotal, { quantity, price }) => {
      subtotal += (quantity * price)
      return subtotal
    }, 0),
  },
}
