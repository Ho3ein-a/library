const express = require('express');
const controller = require('../controller/reports-controller');
const router = express.Router();

router.use('/category-buyer', controller.categoryBuyerNumber);

module.exports = router;