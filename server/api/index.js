const express = require('express');
const router = express.Router();

const authMiddleware = require('./../route/auth.js');
const invoiceApi = require('./invoice.js');
const productApi = require('./product.js');
const publicApi = require('./public.js');
const reservationApi = require('./reservation.js');
const statApi = require('./stat.js');
const userApi = require('./user.js')

router.use('/public/', publicApi);

router.use(authMiddleware);

router.use('/invoice/', invoiceApi);
router.use('/product/', productApi);
router.use('/reservation/', reservationApi);
// router.use('/stat/', statApi);
router.use('/user/', userApi);

module.exports = router;