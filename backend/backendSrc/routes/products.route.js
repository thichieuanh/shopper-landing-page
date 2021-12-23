import { Router } from 'express';

import { ProductModel } from '../models/models.js'
const router = Router();

// router.route('/').get((req, res) => {
//   ProductModel.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })

router.get('/products', async (req, res) => {
  ProductModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.get('/product/:id', (req, res) => {
  ProductModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
})

router.get('/product-reviews/:id', (req, res) => {
  ProductModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data.reviews)
    }
  });
})

router.post('/add-review/:id', (req, res) => {
  ProductModel.findById(req.params.id, (error, data) => {
    if (error) return next(error);
    data.reviews.push(req.body);
    data.markModified('reviews');

    data.save((err, updatedProduct) => {
      if (err) console.log('Error when add review', err);
      res.json(updatedProduct)
      console.log('Review posted successfully')
    })
  });
})

router.put('/update-wishlist/:id', (req, res, next) => {
  ProductModel.findById(req.params.id, (error, data) => {
    if (error) return next(error);
    data.isWishlisted = !data.isWishlisted;

    data.save((err, updatedProduct) => {
      if (err) console.log('Error when update wishlist', err);
      res.json(updatedProduct)
      console.log('Wishlist updated successfully')
    })
  });
})

router.get('/item-stock/:id', async (req, res) => {
  const products = await ProductModel.find({});
  const getStockById = (id) => products.flatMap(it => it.variants).flatMap(it => it.stock).find(it => it._id == id);
  const stock = getStockById(req.params.id);
  res.json(stock)
})

export { router }
