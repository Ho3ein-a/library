const express = require('express'); 
const controller = require('../controller/cart-controller');
const router = express.Router();

router.use('/complete-all-checkout', controller.checkoutAllCartSecondPage);

module.exports = router;