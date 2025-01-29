const express = require('express');
const controller = require('../controller/add-book-controller')
const router = express.Router();

router.use('/select-book-ISBN', controller.addToShopFirstPage) ; 

module.exports = router ; 

