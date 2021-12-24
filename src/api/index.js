import requester from './requester';

const API = {
  getProducts: () => requester.get('/products'),

  getProduct: productId => requester.get(`/product/${productId}`),

  getReviews: productId => requester.get(`/product-reviews/${productId}`),

  addReview: ({ productId, reviewDetails }) => requester.post(`/add-review/${productId}`, reviewDetails),

  updateProductWishlistState: productId => requester.put(`/update-wishlist/${productId}`),

  getCart: () => requester.get('/cart'),

  addToCart: product => requester.post('/cart/add-to-cart', product),

  editCart: ({ id, replacedProduct }) => requester.put(`/cart/edit-cart/${id}`, replacedProduct),

  removeFromCart: id => requester.delete(`/cart/remove-from-cart/${id}`),

  getItemStock: id => requester.get(`/item-stock/${id}`),

  getOrders: () => requester.get('/orders'),

  getOrder: orderNo => requester.get(`/orders/${orderNo}`),

  getFullAccountInfo: () => requester.get('/account'),

  getPersonalInfo: () => requester.get('/account/personal-info'),

  updatePersonalInfo: newPersonalInfo => requester.put('/account/update-personal-info', newPersonalInfo),

  getAddresses: () => requester.get('/account/addresses'),

  getAddress: id => requester.get(`/account/addresses/${id}`),

  getDefaultAddress: () => requester.get('/account/default-address'),

  updateAddress: ({ id, newAddress }) => requester.put(`/account/update-address/${id}`, newAddress),

  addAddress: newAddress => requester.put('/account/add-address', newAddress),
}
export default API;
