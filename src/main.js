import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSplide from '@splidejs/vue-splide';
import eventhub from './plugins/eventhub'
import eventBus from './plugins/eventBus'
import currencyFormatter from './plugins/currencyFormatter'
import vuetify from './plugins/vuetify'
import '@/assets/styles/app-style.scss';

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter, faMedium, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faUser, faHeart, faEye } from '@fortawesome/free-regular-svg-icons'

library.add(faShoppingCart, faFacebookF, faTwitter, faInstagram, faMedium, faYoutube, faUser, faSearch, faHeart, faEye, faStar)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSplide);
Vue.use(eventhub);
Vue.use(eventBus);
Vue.use(currencyFormatter);

Vue.config.productionTip = false
dom.watch()

new Vue({
  router,
  store,
  vuetify,
  eventhub,
  render: h => h(App)
}).$mount('#app')
