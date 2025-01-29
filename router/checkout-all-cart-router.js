const express = require('express');
const router = express.Router();
const controller = require('../controller/cart-controller');

router.use('/checkout-all-cart', controller.checkoutAllCartFirstPage);

module.exports = router;