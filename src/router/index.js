import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Shop from '../views/Shop.vue'
import ProductPage from '../views/ProductPage.vue'
import Checkout from '../views/Checkout.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import Orders from '@/components/AccountPage/Orders/Orders.vue'
import OrderDetails from '@/components/AccountPage/Orders/OrderDetails.vue'
import Wishlist from '@/components/AccountPage/Wishlist.vue'
import PersonalInfo from '@/components/AccountPage/PersonalInfo.vue'
import Addresses from '@/components/AccountPage/Address/Addresses.vue'
import EditAddress from '@/components/AccountPage/Address/EditAddress.vue'
import Payment from '@/components/AccountPage/Payment.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/shopping-cart/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/shopping-cart',
    name: 'Shopping Cart',
    component: ShoppingCart
  },
  {
    path: '/account',
    component: Account,
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
        name: 'AccountAddresses',
        component: Addresses,
      },
      {
        path: 'addresses/new-address',
        name: 'AddNewAddress',
        component: EditAddress,
      },
      {
        path: 'addresses/edit/:index',
        name: 'EditAddress',
        component: EditAddress,
      },
      {
        path: 'payment-methods',
        name: 'AccountPayment',
        component: Payment,
      },
    ],
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
