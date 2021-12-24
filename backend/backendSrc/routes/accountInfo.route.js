import { Router } from 'express';
import { UserModel } from '../models/models.js'
import faker from 'faker'
const router = Router();

router.get('/', (req, res, next) => {
  UserModel.find({}, (error, data) => {
    if (!data.length) {
      UserModel.create({
        personalInfo: {
          firstName: 'Daniel',
          lastName: 'Robinson',
          email: 'user@email.com',
          password: 'thixinhxinh',
          dateOfBirth: new Date(1995, 7, 26),
          gender: 'Male'
        },
        addresses: [
          {
            firstName: 'Dale',
            lastName: 'Morissette',
            email: 'foo@gmail.com',
            addressLine1: '98608 Balistreri Turnpike',
            addressLine2: '29790 Devon Park',
            city: 'West Friedaborough',
            zipCode: '31224-0072',
            country: 'Saint Lucia',
            phone: '1-388-349-5393',
            companyName: 'Spinka, Ondricka and Morar',
          },
          {
            firstName: 'Elenora',
            lastName: 'Grimes',
            email: 'bar@gmail.com',
            addressLine1: '55440 Devyn Hills',
            addressLine2: '4062 Fay Drives',
            city: 'Phoebeberg',
            zipCode: '95649-2128',
            country: 'French Polynesia',
            phone: '1-817-437-4228 x472',
            companyName: 'Gleason - Ullrich',
          }
        ],
        paymentCards: [
          {
            cardNumber: faker.finance.creditCardNumber().split('-').join(' '),
            expiryDate: new Date(faker.date.future()),
            nameOnCard: faker.name.findName(),
          }
        ]
      }, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
      return;
    }

    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.get('/personal-info', (req, res, next) => {
  UserModel.findOne({}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data.personalInfo)
    }
  })
})


router.put('/update-personal-info', (req, res, next) => {
  UserModel.findOneAndUpdate({}, { $set: { personalInfo: req.body } }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      data.markModified('personalInfo');
      res.json({
        status: 'Personal info updated',
        data
      })
    }
  });
})

router.get('/addresses', (req, res, next) => {
  UserModel.findOne({}).select('addresses').exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data.addresses)
    }
  })
})

router.get('/addresses/:id', (req, res, next) => {
  UserModel.findOne({}).select('addresses').exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      let responseData = data.addresses.find(item => item._id == req.params.id)
      res.json(responseData)
    }
  })
})

router.get('/default-address', (req, res, next) => {
  UserModel.findOne({}).exec((error, data) => {
    if (error) return next(error);
    let responseData = data.defaultAddressID;
    res.json(responseData)
  })
})

router.put('/add-address', (req, res, next) => {
  console.log(req.body)
  UserModel.findOne({}).select('addresses').exec((error, data) => {
    if (error) return next(error);
    data.addresses.push(req.body.data);
    data.markModified('addresses');

    if (req.body.isDefault) {
      const lastIndex = data.addresses.length - 1;
      data.defaultAddressID = data.addresses[lastIndex]._id;
    }

    data.save((err, updatedProduct) => {
      if (err) console.log('Error when add new address', err);
      res.json({
        status: 'New address added successfully',
        data: updatedProduct
      })
    })
  })
})

export { router }