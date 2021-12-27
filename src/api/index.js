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

  getAddress: id => requester.get(`/account/address/${id}`),

  getDefaultAddress: () => requester.get('/account/default-address'),

  addAddress: newAddress => requester.put('/account/add-address', newAddress),

  deleteAddress: id => requester.put('/account/delete-address', id),

  editAddress: ({ id, newAddress }) => requester.put(`/account/edit-address/${id}`, newAddress),
}
export default API;
