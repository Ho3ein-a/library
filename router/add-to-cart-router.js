const epxress = require('express');
const router = epxress.Router();
const controller = require('../controller/shop-controller');

router.use('/add-to-cart', controller.checkUserForAddToCart);

module.exports = router;