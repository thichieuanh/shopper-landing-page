import messages from '@/assets/data/notiMessages';
import faker from 'faker'
import API from '@/api';

export default {

  namespaced: true,

  state: () => ({
    personalInfo: null,
    addresses: [
      {
        firstName: 'Dale',
        lastName: 'Morissette',
        email: 'foo@gmail.com',
        addressLine1: '98608 Balistreri Turnpike',
        addressLine2: '29790 Devon Park',
        city: 'West Friedaborough',
        zipCode: '31224-0072',
        country: 'Saint Lucia',
        phone: '1-388-349-5393',
        companyName: 'Spinka, Ondricka and Morar',
      },
      {
        firstName: 'Elenora',
        lastName: 'Grimes',
        email: 'bar@gmail.com',
        addressLine1: '55440 Devyn Hills',
        addressLine2: '4062 Fay Drives',
        city: 'Phoebeberg',
        zipCode: '95649-2128',
        country: 'French Polynesia',
        phone: '1-817-437-4228 x472',
        companyName: 'Gleason - Ullrich',
      }
    ],
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

    appendAddress: (state, address) => state.addresses = [...state.addresses, address],

    removeAddress: (state, index) => state.addresses.splice(index, 1),

    editAddress: (state, { index, address }) => state.addresses[index] = address,

    setDefaultAddress: (state, index) => state.defaultAddress = index,

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

    addAddress: ({ commit, dispatch }, payload) => {
      commit('appendAddress', payload)
      dispatch('notification/showNotification', messages.addedNewAddress, { root: true })
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
