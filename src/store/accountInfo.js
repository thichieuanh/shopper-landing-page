import messages from '@/assets/data/notiMessages';
import faker from 'faker'
import API from '@/api';

export default {

  namespaced: true,

  state: () => ({
    personalInfo: null,
    addresses: null,
    address: null,
    paymentCards: [
      {
        cardNumber: faker.finance.creditCardNumber().split('-').join(' '),
        expiryDate: new Date(faker.date.future()).toISOString().substr(0, 7),
        nameOnCard: faker.name.findName(),
      }
    ],
    defaultAddress: undefined,
    defaultPaymentCard: undefined,
    accountInfo: null
  }),

  mutations: {
    personalInfo: (state, personalInfo) => state.personalInfo = personalInfo,

    addresses: (state, addresses) => state.addresses = addresses,

    address: (state, address) => state.address = address,

    defaultAddress: (state, addressId) => state.defaultAddress = addressId,

    appendAddress: (state, address) => state.addresses = [...state.addresses, address],

    removeAddress: (state, index) => state.addresses.splice(index, 1),

    editAddress: (state, { index, address }) => state.addresses[index] = address,

    setDefaultAddress: (state, id) => state.defaultAddress = id,

    appendPayment: (state, payment) => state.paymentCards = [...state.paymentCards, payment],

    removePayment: (state, index) => state.paymentCards.splice(index, 1),

    editPayment: (state, { index, payment }) => state.paymentCards[index] = payment,

    setDefaultPayment: (state, index) => state.defaultPaymentCard = index
  },

  actions: {
    async getFullAccountInfo({ commit }) {
      try {
        const data = await API.getFullAccountInfo();

        commit('personalInfo', data[0].personalInfo)
      } catch (error) {
        console.error(error);
        throw new Error('Error when fetching accountInfo from db', error);
      }
    },

    async getPersonalInfo({ commit }) {
      const data = await API.getPersonalInfo();
      commit('personalInfo', data)
    },

    async updatePersonalInfo({ dispatch }, payload) {
      await API.updatePersonalInfo(payload);
      dispatch('getPersonalInfo');
    },

    async getAddresses({ commit }) {
      const data = await API.getAddresses();
      commit('addresses', data)
    },

    async getAddress({ commit }, addressId) {
      const data = await API.getAddress(addressId);
      commit('address', data)
    },

    async getDefaultAddress({ commit }) {
      const data = await API.getDefaultAddress();
      commit('defaultAddress', data)
    },

    async setDefaultAddress({ commit }) {
      const data = await API.setDefaultAddress();
      commit('address', data)
    },

    async addAddress({ commit, dispatch }, payload) {
      await API.addAddress(payload);
      dispatch('notification/showNotification', messages.addedNewAddress, { root: true })
      dispatch('getAddresses');
      dispatch('getDefaultAddress');
    },

    updateAddress: ({ commit, dispatch }, payload) => {
      commit('editAddress', payload)
      dispatch('notification/showNotification', messages.editAddress, { root: true })
    },

    addPayment: ({ commit, dispatch }, payload) => {
      commit('appendPayment', payload)
      dispatch('notification/showNotification', messages.addedNewPaymentCard, { root: true })
    },

    updatePayment: ({ commit, dispatch }, payload) => {
      commit('editPayment', payload)
      dispatch('notification/showNotification', messages.editPaymentCard, { root: true })
    },
  },

  getters: {
  }
}
