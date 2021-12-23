import { Router } from 'express';
import { OrderModel } from '../models/models.js'

const router = Router();

router.get('/', (req, res) => {
  OrderModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.get('/:orderNo', (req, res, next) => {
  OrderModel.findOne({ orderNo: req.params.orderNo }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
})

export { router }