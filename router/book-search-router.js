const express = require('express');
const router = express.Router();
const controller = require('../controller/book-order-controller');

router.use('/result-page', controller.bookSearch);

module.exports = router;