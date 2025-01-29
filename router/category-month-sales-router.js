const express = require('express');
const contorller = require('../controller/reports-controller');
const router = express.Router();

router.use('/category-month-sales', contorller.categorySales);

module.exports = router;