import { Router } from 'express';

import { ProductModel } from '../models/products.js'
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
  }).clone();
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
  }).clone();
})

export { router }
