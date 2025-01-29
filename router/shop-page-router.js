const express = require('express');
const router = express.Router();
const controller = require('../controller/shop-controller');

router.use('/shop', controller.shopRenderController);

module.exports = router ; 