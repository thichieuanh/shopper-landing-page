import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Shop from '../views/Shop.vue'
import ProductPage from '../views/ProductPage.vue'
import Checkout from '../views/Checkout.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import ShippingAndReturns from '../views/Shipping.vue'

import Orders from '@/components/AccountPage/Orders/Orders.vue'
import OrderDetails from '@/components/AccountPage/Orders/OrderDetails.vue'
import Wishlist from '@/components/AccountPage/Wishlist/Wishlist.vue'
import PersonalInfo from '@/components/AccountPage/PersonalInfo.vue'
import Address from '@/components/AccountPage/Address/Address.vue'
import AddressList from '@/components/AccountPage/Address/AddressList.vue'
import EditAddress from '@/components/AccountPage/Address/EditAddress.vue'
import Payment from '@/components/AccountPage/Payment/Payment.vue'
import PaymentCards from '@/components/AccountPage/Payment/PaymentCards.vue'
import EditPayment from '@/components/AccountPage/Payment/EditPayment.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { scrollToTop: true }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage,
    meta: { scrollToTop: true }
  },
  {
    path: '/shopping-cart/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/shipping-and-returns',
    name: 'ShippingAndReturns',
    component: ShippingAndReturns
  },
  {
    path: '/account',
    component: Account,
    meta: { scrollToTop: true },
    children: [
      {
        path: '/',
        component: Orders,
      },
      {
        path: 'orders',
        name: 'AccountOrders',
        component: Orders,
      },
      {
        path: 'order-details/:orderNo',
        name: 'OrderDetails',
        component: OrderDetails
      },
      {
        path: 'wishlist',
        name: 'AccountWishlist',
        component: Wishlist,
      },
      {
        path: 'personal-info',
        name: 'AccountPersonalInfo',
        component: PersonalInfo,
      },
      {
        path: 'addresses',
        component: Address,
        children: [
          {
            path: '/',
            name: 'AccountAddresses',
            component: AddressList,
          },
          {
            path: 'new-address',
            name: 'AddNewAddress',
            component: EditAddress,
          },
          {
            path: 'edit/:id',
            name: 'EditAddress',
            component: EditAddress,
          },
        ]
      },
      {
        path: 'payment-methods',
        component: Payment,
        children: [
          {
            path: '/',
            name: 'AccountPayments',
            component: PaymentCards,
          },
          {
            path: 'new-card',
            name: 'AddNewCard',
            component: EditPayment,
          },
          {
            path: 'edit/:id',
            name: 'EditPayment',
            component: EditPayment,
          },
        ]
      },
    ],
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const scrollBehavior = function (to, from, savedPosition) {
  // REF: https://router.vuejs.org/guide/advanced/scroll-behavior.html#async-scrolling
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = { behavior: 'smooth' }

    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash

      // specify offset of the element
      if (to.hash === '#anchor2') {
        position.offset = { y: 100 }
      }

      // bypass #1number check
      if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
        return position
      }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false
    }

    return new Promise(resolve => {
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // coords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0
        position.y = 0
      }

      // wait for the out transition to complete (if necessary)
      this.app.$root.$once('triggerScroll', () => {
        // if the resolved position is falsy or an empty object,
        // will retain current scroll position.
        resolve(position)
      })
    })
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior
})

export default router
