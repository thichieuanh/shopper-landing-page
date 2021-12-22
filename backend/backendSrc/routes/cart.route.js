import { Router } from 'express';

import { CartModel } from '../models/cart.js'
import { ProductModel } from '../models/product.js'

const router = Router();

router.get('/', (req, res) => {
  CartModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

async function checkStock(productModel, req) {
  const product = await productModel.findById(req.body.productId).exec();
  if (!product) return; // This will be used in case the product has been placed in cart for a while but then sold out, code updated later.

  const stocks = product.variants.flatMap(item => item.stock);
  const sizeStock = stocks.find(item => item._id == req.body.size._id).sizeStock
  return sizeStock;
}


router.post('/add-to-cart', async (req, res, next) => {
  // Check if selected item already existed in cart
  const queryConditions = {
    productId: req.body.productId,
    variantColor: req.body.variantColor,
    size: req.body.size.size
  }
  const query = await CartModel.findOne(queryConditions).exec();

  if (query) {
    // If existed, check stock then increase quantity in cart
    const updatedQuantity = query.quantity + req.body.quantity;
    const sizeStock = await checkStock(ProductModel, req);

    if (updatedQuantity > sizeStock) {
      res.json({
        status: 'Not enough stock remaining',
      })
    } else {
      query.updateOne({ $inc: { quantity: req.body.quantity } }, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json({
            status: 'Increased quantity',
            data
          })
        }
      })
    }
  } else {
    // If not existed then add product to cart
    CartModel.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json({
          status: 'Added to cart',
          data
        })
      }
    })
  }
})

router.put('/edit-cart/:id', async (req, res, next) => {
  // Query item needs updating in cart
  const updatingItem = await CartModel.findById(req.params.id).exec();
  const replacingItem = req.body;

  const isUpdatingAndNewItemsIdentical = updatingItem.size._id === replacingItem.size._id;

  if (isUpdatingAndNewItemsIdentical) {
    if (updatingItem.quantity === replacingItem.quantity) {
      res.json({
        status: 'Duplicated item',
      })
      return;
    }
  }
  // Check if the new selected variation already existed as another item in cart
  // UPDATE THIS TO QUERY BY SIZE ID
  const queryConditions = {
    productId: req.body.productId,
    variantColor: req.body.variantColor,
    size: req.body.size
  }
  const query = await CartModel.findOne(queryConditions).exec();

  if (query) {
    // If existed, check stock then update quantity in cart
    let updatedQuantity = isUpdatingAndNewItemsIdentical ? req.body.quantity : query.quantity + req.body.quantity;

    const sizeStock = await checkStock(ProductModel, req);
    if (updatedQuantity > sizeStock) {
      updatedQuantity = sizeStock
    }

    query.updateOne({ $set: { quantity: updatedQuantity } }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json({
          status: 'Cart updated',
          data
        })
      }
    })
  } else {
    // If not existed then totally change to new item
    updatingItem.updateOne({ $set: req.body }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json({
          status: 'Cart updated',
          data
        })
      }
    })
  }
})


router.delete('/remove-from-cart/:id', (req, res, next) => {
  CartModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export { router }
