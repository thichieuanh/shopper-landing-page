import requester from './requester';

const Api = {
  getWomenProducts: () => requester.get('/women.json'),
  getMenProducts: () => requester.get('/men.json'),
  getKidsProducts: () => requester.get('/kids.json'),
  getOrders: () => requester.get('/orders.json'),
}
export default Api;
