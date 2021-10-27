export default {
  install(Vue) {
    Vue.prototype.eventHub = new Vue()
  }
}
