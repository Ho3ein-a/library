const express = require('express');
const controller = require('../controller/book-order-controller');
const router = express.Router();

router.use('/orederd-books', controller.orderedBooksRender);

module.exports = router ; 