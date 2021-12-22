import requester from './requester';

const API = {
  getProducts: () => requester.get('/products'),

  getProduct: productId => requester.get(`/product/${productId}`),

  // getOrders: () => requester.get('/orders.json'),
  getOrders: () => requester.get('/products'),

  getReviews: productId => requester.get(`/product-reviews/${productId}`),

  addReview: ({ productId, reviewDetails }) => requester.post(`/add-review/${productId}`, reviewDetails),

  updateProductWishlistState: productId => requester.put(`/update-wishlist/${productId}`),

  getCart: () => requester.get('/cart'),

  addToCart: product => requester.post('/cart/add-to-cart', product),

  editCart: ({ id, replacedProduct }) => requester.put(`/cart/edit-cart/${id}`, replacedProduct),

  removeFromCart: id => requester.delete(`/cart/remove-from-cart/${id}`),

  getItemStock: id => requester.get(`/item-stock/${id}`),
}
export default API;
