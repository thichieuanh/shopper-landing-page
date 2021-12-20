// Create a Schema
import mongooseModules from 'mongoose';
const { Schema, model } = mongooseModules;

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
          size: String,
          stock: Number
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