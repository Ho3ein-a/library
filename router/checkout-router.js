const express = require('express');
const router = express.Router();
const controller = require('../controller/cart-controller');

router.use('/checkout', controller.checkoutController);

module.exports = router;