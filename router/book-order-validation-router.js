const express = require('express');
const router = express.Router();
const controller = require('../controller/book-order-controller');

router.use('/book-order-validation', controller.bookOrderValidationController);

module.exports = router ; 