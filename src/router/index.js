import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AccountOrders from '../views/AccountOrders.vue'
import Wishlist from '../views/Wishlist.vue'
import Shop from '../views/Shop.vue'
import ProductPage from '../views/ProductPage.vue'
import Checkout from '../views/Checkout.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account-orders',
    name: 'AccountOrders',
    component: AccountOrders
  },
  {
    path: '/account-wishlist',
    name: 'Wishlist',
    component: Wishlist
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/product',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
