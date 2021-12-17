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

    data.save((err, updatedPerson) => {
      if (err) console.log('Error when add review', err);
      res.json(updatedPerson)
      console.log('Review posted successfully')
    })
  }).clone();
})

export { router }
