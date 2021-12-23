import API from '@/api';

export default {
  namespaced: true,

  state: () => ({
    orders: [],
    order: null
  }),

  mutations: {
    orders: (state, orders) => state.orders = orders,
    order: (state, order) => state.order = order
  },

  actions: {
    async getOrders({ commit }) {
      try {
        const orders = await API.getOrders();

        // Sort orders by newest to oldest
        orders.sort((a, b) => b.shippedDate - a.shippedDate)
        commit('orders', orders);
      } catch (error) {
        console.error(error);
        throw new Error('Error when fetching orders from db', error);
      }
    },

    async getOrder({ commit }, orderNo) {
      const data = await API.getOrder(orderNo);
      commit('order', data)
    },
  },

  getters: {
    getOrderByOrderNo: (state) => (orderNo) => {
      return state.orders.find(order => order.orderNo === orderNo);
    },
  }
}
