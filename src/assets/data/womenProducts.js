function getImg(idx) {
  const path = `@/assets/img/products/product${idx}.jpeg'`
  return path;
}
getImg(2);

// Do this later ^

export default [
  {
    img: require('@/assets/img/products/product1a.jpeg'),
    imgOnHover: require('@/assets/img/products/product1b.jpeg'),
    category: 'Shoes',
    name: 'Leather mid-heel Sandals',
    price: '$129.00',
    discountedPrice: null,
  },
  {
    img: require('@/assets/img/products/product2a.jpeg'),
    imgOnHover: require('@/assets/img/products/product2b.jpeg'),
    category: 'Dresses',
    name: 'Cotton floral print Dress',
    price: '$40.00',
    discountedPrice: null,
  },
  {
    img: require('@/assets/img/products/product3a.jpeg'),
    imgOnHover: require('@/assets/img/products/product3b.jpeg'),
    category: 'Shoes',
    name: 'Leather Sneakers',
    price: '$85.00',
    discountedPrice: '$80.00',
  },
  {
    img: require('@/assets/img/products/product4a.jpeg'),
    imgOnHover: require('@/assets/img/products/product4b.jpeg'),
    category: 'Tops',
    name: 'Cropped cotton Top',
    price: '$29.00',
    discountedPrice: null,
  },
  {
    img: require('@/assets/img/products/product5a.jpeg'),
    imgOnHover: require('@/assets/img/products/product5b.jpeg'),
    category: 'Dresses',
    name: 'Floral print midi Dress',
    price: '$50.00',
    discountedPrice: null,
  },
  {
    img: require('@/assets/img/products/product6a.jpeg'),
    imgOnHover: require('@/assets/img/products/product6b.jpeg'),
    category: 'Bags',
    name: 'Suede cross body Bag',
    price: '$79.00',
    discountedPrice: '$49.00',
  },
  {
    img: require('@/assets/img/products/product7a.jpeg'),
    imgOnHover: require('@/assets/img/products/product7b.jpeg'),
    category: 'Dresses',
    name: 'Floral print midi Dress',
    price: '$50.00',
    discountedPrice: null,
  },
  {
    img: require('@/assets/img/products/product8a.jpeg'),
    imgOnHover: require('@/assets/img/products/product8b.jpeg'),
    category: 'Skirts',
    name: 'Printed A-line Skirt',
    price: '$79.00',
    discountedPrice: null,
  }
]
