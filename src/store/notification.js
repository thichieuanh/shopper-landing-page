export default {
  namespaced: true,

  state: () => ({
    loading: false,
    isShowNotification: false,
    notificationType: '',
    notificationMessage: '',
  }),
  mutations: {
    loading: (state, payload) => {
      state.loading = payload
    },
    showNotification: (state, { type, message }) => {
      state.isShowNotification = true;
      state.notificationType = type;
      state.notificationMessage = message;
    },
    hideNotification: (state) => {
      state.isShowNotification = false;
      state.notificationType = '';
      state.notificationMessage = '';
    },
  },
  actions: {
    showNotification({ commit }, payload) {
      commit('showNotification', payload)
    },
  },
  getters: {
    isShowNotification: ({ isShowNotification }) => isShowNotification,
    notificationType: ({ notificationType }) => notificationType,
    notificationMessage: ({ notificationMessage }) => notificationMessage,
  }
}
