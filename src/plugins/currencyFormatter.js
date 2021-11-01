export default {
  install(Vue) {
    Vue.filter('currencyFormatter', function (value) {
      return '$' + value.toFixed(2);
    })
  }
}
