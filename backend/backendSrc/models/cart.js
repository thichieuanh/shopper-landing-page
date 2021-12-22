import mongooseModules from 'mongoose';
const { Schema, model } = mongooseModules;

export const cartSchema = new Schema({
  productId: String,
  image: String,
  name: String,
  variantColor: String,
  size: Schema.Types.Mixed,
  sizeName: String,
  quantity: Number,
  sizeStock: Number,
  price: Number,
}, {
  collection: 'cart'
});

export const CartModel = model('Cart', cartSchema)