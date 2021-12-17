import requester from './requester';

const Api = {
  getProducts: () => requester.get('/products'),

  // getOrders: () => requester.get('/orders.json'),
  getOrders: () => requester.get('/products'),

  getReviews: params => requester.get(`/product-reviews/${params}`),

  addReview: ({ productId, reviewDetails }) => requester.post(`/add-review/${productId}`, reviewDetails)
}
export default Api;
