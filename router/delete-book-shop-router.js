const express = require('express');
const router = express.Router();
const controller = require('../controller/shop-controller');

router.use('/delete-book-completed', controller.deleteBookFromShop);

module.exports = router