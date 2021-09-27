import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSplide from '@splidejs/vue-splide';
import '@/assets/styles/app-style.css';

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons'
import { faUser, faHeart, faEye } from '@fortawesome/free-regular-svg-icons'

library.add(faShoppingCart, faFacebookF, faTwitter, faInstagram, faMedium, faUser, faSearch, faHeart, faEye, faStar)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSplide);

Vue.config.productionTip = false
dom.watch()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
