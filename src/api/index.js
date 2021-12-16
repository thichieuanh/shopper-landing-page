import requester from './requester';

const Api = {
  getProducts: () => requester.get('/products'),

  // getOrders: () => requester.get('/orders.json'),
  getOrders: () => requester.get('/products'),
}
export default Api;
