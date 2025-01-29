const express = require('express');
const controller = require('../controller/shop-controller');
const router = express.Router();

router.use('/deleted-book-insert', controller.deletedBookInsert);

module.exports = router ; 