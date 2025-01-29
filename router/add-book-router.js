const express = require('express');
const router = express.Router();
const controller = require('../controller/add-book-controller');

router.use('/add-book', controller.addToShopThirdPage);

module.exports = router ;