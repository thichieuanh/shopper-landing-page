import lodashPkg from 'lodash';
const { random } = lodashPkg;

import faker from 'faker'
import { OrderModel } from '../models/models.js'

const statuses = ['In Processing', 'Awating Pickup', 'Partially Shipped', 'Shipped', 'Delivered', 'Cancelled'];

const itemList = [
  {
    productId: "61c15271426caa72ca94bd14",
    image: "/img/products/women/product7-color2-1.jpeg",
    name: "Ambrosio High-Low Maxi Skirt",
    variantColor: "Light Orange",
    size: {
      sizeName: "M",
      sizeStock: 2,
      _id: "61c15271426caa72ca94bd1f"
    },
    quantity: 2,
    price: 102,
  },
  {
    productId: "61c15272426caa72ca94bd27",
    image: "/img/products/women/product8-color1-1.jpeg",
    name: "Shasta Suede Ankle Booties",
    variantColor: "Taupe",
    size: {
      sizeName: "7",
      sizeStock: 2,
      _id: "61c15272426caa72ca94bd2b"
    },
    quantity: 1,
    price: 145,
  },
  {
    productId: "61c15271426caa72ca94bce3",
    image: "/img/products/women/product4-color1-1.jpeg",
    name: "Twist Connection Washed Burgundy Backless Cropped Sweater Top",
    variantColor: "Washed Burgundy",
    size: {
      sizeName: "XXL",
      sizeStock: 3,
      _id: "61c15271426caa72ca94bcea"
    },
    quantity: 1,
    price: 218,
  },
  {
    productId: "61c15273426caa72ca94be24",
    image: "/img/products/men/product4-color1-1.jpeg",
    name: "Essential Fleece Pullover",
    variantColor: "Washed Teal",
    size: {
      sizeName: "L",
      sizeStock: 4,
      _id: "61c15273426caa72ca94be29"
    },
    quantity: 1,
    price: 479,
    __v: 0
  },
  {
    _id: "61c3d9b5e108581dd75b156a",
    productId: "61c15273426caa72ca94be44",
    image: "/img/products/men/product6-color1-1.jpeg",
    name: "Rodeo Jacket",
    variantColor: "White",
    size: {
      sizeName: "XL",
      sizeStock: 3,
      _id: "61c15273426caa72ca94be4a"
    },
    quantity: 1,
    price: 371,
  },
  {
    productId: "61c15272426caa72ca94bde8",
    image: "/img/products/men/product2-color3-1.jpeg",
    name: "Worker Chino",
    variantColor: "Washed Olive",
    size: {
      sizeName: "M",
      sizeStock: 4,
      _id: "61c15272426caa72ca94bdfa"
    },
    quantity: 1,
    price: 475,
  },
  {
    productId: "61c15273426caa72ca94be3c",
    image: "/img/products/men/product5-color1-1.jpeg",
    name: "Fosters Bum Bag",
    variantColor: "Lcn fos vintage white",
    size: {
      sizeName: "One size",
      sizeStock: 4,
      _id: "61c15273426caa72ca94be3e"
    },
    quantity: 3,
    price: 40.67,
  },
  {
    productId: "61c15274426caa72ca94bfa6",
    image: "/img/products/kids/product4-color1-1.jpeg",
    name: "Classic Homeboots",
    variantColor: "Silver Sage",
    size: {
      sizeName: "7.5",
      sizeStock: 4,
      _id: "61c15274426caa72ca94bfab"
    },
    quantity: 1,
    price: 93,
  },
  {
    productId: "61c15274426caa72ca94bf9a",
    image: "/img/products/kids/product3-color1-1.jpeg",
    name: "Libby Sleeveless Dress",
    variantColor: "Indigo Blue Wash",
    size: {
      sizeName: "XS",
      sizeStock: 4,
      _id: "61c15274426caa72ca94bf9c"
    },
    quantity: 3,
    price: 84,
  },
  {
    productId: "61c15273426caa72ca94bf91",
    image: "/img/products/kids/product2-color1-1.jpeg",
    name: "Kids Hooded Towel",
    variantColor: "Musk Melon Rainbow",
    size: {
      sizeName: "One size",
      sizeStock: 5,
      _id: "61c15273426caa72ca94bf93"
    },
    quantity: 1,
    price: 115,
  }
]

const shippingOptions = [
  {
    method: 'Standard Shipping (5-7 days)',
    deliveryPrice: 8,
  },
  {
    method: 'Express Shipping (3-5 days)',
    deliveryPrice: 12,
  },
  {
    method: '1-2 day Shipping',
    deliveryPrice: 18,
  },
  {
    method: 'Free Shipping',
    deliveryPrice: 0,
  },
];

const paymentMethod = ['Debit Mastercard', 'Paypal']

function getItems() {
  let quantity = random(1, 5);
  let items = [];
  let randomSelection;
  while (items.length < quantity) {
    randomSelection = itemList[random(0, itemList.length - 1)]
    if (!items.some(item => item.size._id === randomSelection.size._id)) {
      items.push(randomSelection)
    }
  }
  return items;
}

function getAddress() {
  const billing = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    addressLine1: faker.address.streetAddress(),
    addressLine2: faker.address.streetAddress(),
    city: faker.address.city(),
    zipCode: faker.address.zipCodeByState(),
    country: faker.address.country(),
    phone: faker.phone.phoneNumber(),
    companyName: faker.company.companyName()
  };

  let isBillingAndShippingSame = faker.datatype.boolean();
  let shipping;

  if (isBillingAndShippingSame) {
    shipping = { ...billing };
  } else {
    shipping = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      addressLine1: faker.address.streetAddress(),
      addressLine2: faker.address.streetAddress(),
      city: faker.address.city(),
      zipCode: faker.address.zipCodeByState(),
      country: faker.address.country(),
      phone: faker.phone.phoneNumber(),
      companyName: faker.company.companyName()
    };
  }

  let addresses = { billing, shipping };
  return addresses;

}

function getShipping() {
  let index = random(0, shippingOptions.length - 1);
  return {
    shippingMethod: shippingOptions[index].method,
    shippingFee: shippingOptions[index].deliveryPrice,
  }
}

function getShippedDate(orderStatus) {
  const dateMark = new Date();
  const current = new Date(dateMark);
  dateMark.setDate(dateMark.getDate() + 10);

  const shippedDate = orderStatus === 'Delivered' || orderStatus === 'Cancelled' ? faker.date.past() : faker.date.between(current, dateMark);
  return shippedDate;
}


/* DATA GENERATING */
export default function createOrdersData() {
  let data = {};

  for (let i = 0; i <= 5; i++) {
    data.orderNo = faker.finance.routingNumber();
    data.status = statuses[random(0, statuses.length - 1)];
    data.items = getItems();
    data.shipping = getShipping();
    data.addresses = getAddress();
    data.shippedDate = getShippedDate(data.status);
    data.paymentMethod = paymentMethod[random(0, paymentMethod.length - 1)];
  }

  OrderModel.create(data, (error) => {
    if (error) console.log("Error", error);
  })
}

createOrdersData();