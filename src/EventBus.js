export default class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    this.listeners[event] = callback;
  }

  emit(event, params) {
    if (this.listeners[event]) {
      this.listeners[event](params);
    }
  }
}
