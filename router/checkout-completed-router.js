const express = require('express');
const controller = require('../controller/cart-controller');
const router = express.Router();

router.use('/checkout-completed', controller.checkoutCompleted);

module.exports = router