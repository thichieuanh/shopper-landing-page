import mongooseModules from 'mongoose';
const { Schema, model } = mongooseModules;

// Product
export const productSchema = new Schema({
  productGroup: String,
  images: {
    img: String,
    imgOnHover: String
  },
  category: String,
  name: String,
  isNewProduct: Boolean,
  isWishlisted: Boolean,
  pricing: {
    price: Number,
    discount: Number,
    priceAfterDiscount: Number
  },
  variants: [
    {
      variantId: Number,
      variantColor: String,
      variantImages: [String],
      stock: [
        {
          sizeName: String,
          sizeStock: Number
        }
      ]
    }
  ],
  reviews: [
    {
      rating: Number,
      reviewer: String,
      date: Date,
      title: String,
      text: String,
      likeCount: Number,
      dislikeCount: Number,
      commentCount: Number
    }
  ]
}, {
  collection: 'products'
});

export const ProductModel = model('Product', productSchema)

// Cart
export const cartSchema = new Schema({
  productId: String,
  image: String,
  name: String,
  variantColor: String,
  size: Schema.Types.Mixed,
  quantity: Number,
  // sizeStock: Number,
  price: Number,
}, {
  collection: 'cart'
});

export const CartModel = model('Cart', cartSchema)

// Orders
export const orderSchema = new Schema({
  orderNo: Number,
  status: String,
  items: [
    {
      productId: String,
      image: String,
      name: String,
      variantColor: String,
      size: Schema.Types.Mixed,
      quantity: Number,
      price: Number,
    }
  ],
  shipping: {
    shippingMethod: String,
    shippingFee: Number
  },
  addresses: {
    billing: {
      firstName: String,
      lastName: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      zipCode: String,
      country: String,
      phone: String,
      companyName: String
    },
    shipping: {
      firstName: String,
      lastName: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      zipCode: String,
      country: String,
      phone: String,
      companyName: String
    },
  },
  paymentMethod: String,
  shippedDate: Date
}, {
  collection: 'orders'
});

export const OrderModel = model('Order', orderSchema)

// Account info
export const userSchema = new Schema({
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    gender: String
  },
  addresses: [
    {
      firstName: String,
      lastName: String,
      email: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      zipCode: String,
      country: String,
      phone: String,
      companyName: String
    }
  ],
  defaultAddressID: String,
  paymentCards: [
    {
      cardNumber: String,
      expiryDate: Date,
      nameOnCard: String,
    }
  ],
}, {
  collection: 'userData'
});

export const UserModel = model('User', userSchema)