const messages = {
  addedToCart: {
    type: 'success',
    message: 'Added to cart',
  },
  notEnoughStockRemaining: {
    type: 'error',
    message: 'Sorry, there is not enough stock remaining. Please check your cart',
  },
  duplicatedItem: {
    type: 'error',
    message: 'Selected product is identical to the previous one',
  },
  replacedItem: {
    type: 'success',
    message: 'Cart updated',
  },
  removedFromCart: {
    type: 'success',
    message: 'Product removed from cart',
  },
  addedToWishlist: {
    type: 'success',
    message: 'Added to wishlist',
  },
  removedFromWishlist: {
    type: 'success',
    message: 'Removed from wishlist',
  },
  reviewPosted: {
    type: 'success',
    message: 'Your review has been posted',
  },
  incorrectPassword: {
    type: 'error',
    message: 'Incorrect password, please try again.',
  },
  addedNewAddress: {
    type: 'success',
    message: 'New address added successfully',
  },
  deleteAddress: {
    type: 'success',
    message: 'Address deleted successfully',
  },
  editAddress: {
    type: 'success',
    message: 'Address updated successfully',
  },
  addedNewPaymentCard: {
    type: 'success',
    message: 'New payment method added successfully',
  },
  editPaymentCard: {
    type: 'success',
    message: 'Payment method updated successfully',
  },

}

export default messages;
