import API from '@/api';
import getShippedDate from '@/utils/fakeShippedDate';

export default {
  namespaced: true,

  state: () => ({
    orders: [],
  }),

  mutations: {
    orders: (state, orders) => state.orders = orders,
  },

  actions: {
    async getOrders({ commit }) {
      try {
        const orderData = await API.getOrders();

        // Add shipped date to each order
        const orders = orderData.reduce((array, order) => {
          order.shippedDate = getShippedDate(order.status);
          array.push(order)
          return array;
        }, [])

        // Sort orders by newest to oldest
        orders.sort((a, b) => b.shippedDate - a.shippedDate)

        commit('orders', orders);
      } catch (error) {
        console.error(error);
        throw new Error('Error when fetching order from db', error);
      }
    },
  },

  getters: {
    getOrderByOrderNo: (state) => (orderNo) => {
      return state.orders.find(order => order.orderNo === orderNo);
    },
  }
}
