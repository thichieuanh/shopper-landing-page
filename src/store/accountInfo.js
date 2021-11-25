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
  }),

  mutations: {
    updatePersonalInfo: (state, payload) => state.personalInfo = payload
  },

  actions: {
  },

  getters: {
  }
}
