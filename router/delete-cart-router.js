const express = require('express');
const router = express.Router();
const controller = require('../controller/cart-controller');

router.use('/delete-cart', controller.deleteCart);

module.exports = router;