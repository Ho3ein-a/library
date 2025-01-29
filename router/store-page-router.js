const express = require('express');
const router = express.Router();
const controller = require('../controller/book-order-controller');

router.use('/store', controller.storePageRender);

module.exports = router ; 