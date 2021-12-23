import express from 'express';
import cors from 'cors';
import mongooseModules from 'mongoose';
import createError from 'http-errors'

// Connect mongoDB
import dotenv from 'dotenv'
dotenv.config() // Load .env file
const mongoURI = process.env.MONGO_URI;
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};


const { connect } = mongooseModules;
connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log('Error', err);
  console.log(`Connected to MongoDB`);
});

const app = express();
app.use(cors());

/**  Use body-parser to Parse POST Requests */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API
import { router as productsAPI } from './backendSrc/routes/products.route.js'
import { router as cartAPI } from './backendSrc/routes/cart.route.js'
import { router as ordersAPI } from './backendSrc/routes/orders.route.js'
app.use('/', productsAPI)
app.use('/cart', cartAPI)
app.use('/orders', ordersAPI)

// Create port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


import createData from './backendSrc/database/generateProducts.js'
createData();

// import createOrdersData from './backendSrc/database/generateOrders.js'
// createOrdersData();