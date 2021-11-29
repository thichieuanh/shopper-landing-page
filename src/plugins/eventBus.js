import EventBus from '../EventBus'

export default {
  install(Vue) {
    Vue.prototype.eventBus = new EventBus()
  }
}
