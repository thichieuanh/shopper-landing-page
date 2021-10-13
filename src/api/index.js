import requester from './requester';

const Api = {
  getWomenProducts: () => requester.get('/womenProducts'),
}
export default Api;
