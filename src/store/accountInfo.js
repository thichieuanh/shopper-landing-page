import messages from '@/assets/data/notiMessages';

export default {

  namespaced: true,

  state: () => ({
    personalInfo: {
      firstName: 'Daniel',
      lastName: 'Robinson',
      email: 'user@email.com',
      password: 'thixinhxinh',
      dateOfBirth: new Date(1995, 7, 26).toISOString().substr(0, 10),
      gender: 'Male'
    },

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

    defaultAddress: undefined
  }),

  mutations: {
    updatePersonalInfo: (state, payload) => state.personalInfo = payload,

    appendAddress: (state, address) => state.addresses = [...state.addresses, address],

    removeAddress: (state, index) => state.addresses.splice(index, 1),

    editAddress: (state, { index, address }) => state.addresses[index] = address,

    setDefaultAddress: (state, index) => state.defaultAddress = index
  },

  actions: {
    addAddress: ({ commit, dispatch }, payload) => {
      commit('appendAddress', payload)
      dispatch('notification/showNotification', messages.addedNewAddress, { root: true })
    },

    updateAddress: ({ commit, dispatch }, payload) => {
      commit('editAddress', payload)
      dispatch('notification/showNotification', messages.editAddress, { root: true })
    },
  },

  getters: {
  }
}
