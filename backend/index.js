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

import { productsRoute as productsAPI } from './backendSrc/routes/products.route.js'
const app = express();
app.use(cors());

/**  Use body-parser to Parse POST Requests */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API
app.use('/products', productsAPI)

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