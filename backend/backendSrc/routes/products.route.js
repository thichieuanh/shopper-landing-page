import { Router } from 'express';

import { ProductModel } from '../models/products.js'
const productsRoute = Router();

productsRoute.route('/').get((req, res) => {
  ProductModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

export { productsRoute }
