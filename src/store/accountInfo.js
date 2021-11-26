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
      [
        'Manuel Moore',
        '990 Camden Grove',
        'North Beulahberg',
        'New Mexico',
        '01167',
        'Puerto Rico',
        '82813-1233'
      ],
      [
        'Angel Padberg',
        "26210 O'Connell Glens",
        'Schroederstad',
        'Illinois',
        '00563-6866',
        'China',
        '62029-6713'
      ]
    ]

  }),

  mutations: {
    updatePersonalInfo: (state, payload) => state.personalInfo = payload
  },

  actions: {
  },

  getters: {
  }
}
