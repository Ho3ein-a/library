const express = require('express');
const router = express.Router();
const controller = require('../controller/add-book-controller');

router.use('/select-book', controller.addToShopSecondPage);

module.exports = router; 