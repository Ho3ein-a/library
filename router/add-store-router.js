const express = require('express');
const controller = require('../controller/book-order-controller');
const router = express.Router();

router.use('/add-to-store', controller.addFromOrderToStoreController);

module.exports = router; 