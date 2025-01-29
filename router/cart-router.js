const express = require('express');
const router = express.Router();
const controller = require('../controller/cart-controller');

router.use('/cart', controller.renderCart);

module.exports = router 