import requester from './requester';

const Api = {
  getWomenProducts: () => requester.get('/women'),
  getMenProducts: () => requester.get('/men'),
  getKidsProducts: () => requester.get('/kids'),
}
export default Api;
