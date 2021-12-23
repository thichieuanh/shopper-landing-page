import lodashPkg from 'lodash';
const { random, round } = lodashPkg;

import fakerPkg from 'faker';
const { name: _name, date: _date, lorem } = fakerPkg;

import { productInfo } from './productInfo.js';
import { ProductModel } from '../models/models.js'

let controlVariantId = 0;

/* Get image URLs */
function getImages(productIndex, colorIndex, group) {
  let array = [];
  for (let i = 1; i <= 4; i++) {
    array.push(`/img/products/${group}/product${productIndex + 1}-color${colorIndex + 1}-${i}.jpeg`)
  }
  return array;
}

/* Get product status (new or sale) */
let productStatus = {
  isNewProduct: undefined,
  price: undefined,
  discountVal: undefined,
  priceAfterDiscount: undefined
}

function getProductStatus() {
  /* New */
  const newExpression = Math.random() >= 0.5; // Expression will return true 50% of the time, and false the other 50%
  productStatus.isNewProduct = newExpression;

  /* Discount */
  const discountExpression = Math.random() >= 0.5
  let isDiscounted = productStatus.isNewProduct ? false : discountExpression; // New product is not discounted
  productStatus.discountVal = isDiscounted ? round(random(0.1, 0.7), 2) : 0

  /* Price */
  productStatus.price = (random(30, 500));
  productStatus.priceAfterDiscount = productStatus.price * (1 - productStatus.discountVal);
}

/* Sizes */
function getSizes(category) {
  switch (category) {
    case 'Shoes':
    case 'Sneakers':
    case 'Sandals':
      return ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14'];
    case 'Dresses':
    case 'Sweats':
    case 'Skirts':
    case 'Shirts':
    case 'Pants':
    case 'Coats':
    case 'Jackets':
    case 'T-Shirts':
    case 'Shorts':
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    case 'Headbands':
    case 'Hats':
      return ['Free size']
    default:
      return ['One size']
  }
}

/* Stock */
function getStock(sizeList) {
  return sizeList.reduce((stockArray, size) => {
    stockArray.push({
      sizeName: size,
      sizeStock: random(0, 5)
    })
    return stockArray;
  }, [])
}


/* Variants */
function getVariants(colorList, sizeList, productIndex, group) {
  return colorList.reduce((variantArray, color, colorIndex) => {
    variantArray.push({
      variantId: controlVariantId++,
      variantColor: color,
      variantImages: getImages(productIndex, colorIndex, group),
      stock: getStock(sizeList)
    })
    return variantArray;
  }, [])
}

/* Reviews */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getReviews() {
  let reviews = []
  let reviewCount = random(0, 3);

  if (reviewCount) {
    for (let i = 0; i < reviewCount; i++) {
      reviews.push({
        rating: random(1, 5),
        reviewer: _name.findName(),
        date: _date.past(),
        title: capitalizeFirstLetter(lorem.words()),
        text: lorem.sentences(),
        likeCount: random(0, 10),
        dislikeCount: random(0, 5),
        commentCount: random(0, 5)
      })
    }
  }
  return reviews
}

/* DATA GENERATING */
// Generate data for a single product
function createProductData(group, product, index) {
  let productData = {};
  let category = ''
  let sizes = []
  let variants = [];
  let colors = [];

  getProductStatus();
  category = product.category;
  sizes = getSizes(category);
  colors = product.colors;
  variants = getVariants(colors, sizes, index, group);

  productData.productGroup = group;
  productData.category = category;
  productData.name = product.productName;
  productData.pricing = {
    price: productStatus.price,
    discount: productStatus.discountVal,
    priceAfterDiscount: productStatus.priceAfterDiscount
  };
  productData.variants = variants;
  productData.reviews = getReviews();
  productData.isNewProduct = productStatus.isNewProduct;
  productData.isWishlisted = false;
  return productData;
}

// Create data
export default async function createData() {
  for (const key of Object.keys(productInfo)) {
    for (let [i, product] of productInfo[key].entries()) {
      // Use Array.entries() to iterate over both index and value of elements
      // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
      const data = createProductData(key, product, i);

      // Check if the product is already existed in database
      const currentProduct = await ProductModel.findOne({ name: data.name }).exec();
      if (!currentProduct) {
        ProductModel.create(data, (error) => {
          if (error) console.log("Error", error);
        })
      }
    }
  }
}