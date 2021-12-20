import requester from './requester';

const Api = {
  getProducts: () => requester.get('/products'),

  getProduct: productId => requester.get(`/product/${productId}`),

  // getOrders: () => requester.get('/orders.json'),
  getOrders: () => requester.get('/products'),

  getReviews: params => requester.get(`/product-reviews/${params}`),

  addReview: ({ productId, reviewDetails }) => requester.post(`/add-review/${productId}`, reviewDetails),

  updateProductWishlistState: productId => requester.put(`/update-wishlist/${productId}`)
}
export default Api;
