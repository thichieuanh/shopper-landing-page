const messages = {
  addedToCart: {
    type: 'success',
    message: 'Added to cart',
  },
  notEnoughStockRemaining: {
    type: 'error',
    message: 'Sorry, there is not enough stock remaining for this size',
  },
  duplicatedItem: {
    type: 'error',
    message: 'Selected product is identical to the previous one',
  },
  replacedItem: {
    type: 'success',
    message: 'Cart updated',
  },
  productRemoved: {
    type: 'success',
    message: 'Product removed from your cart',
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
  editAddress: {
    type: 'success',
    message: 'Address updated successfully',
  }
}

export default messages;
