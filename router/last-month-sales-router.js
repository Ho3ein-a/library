const express = require('express');
const controller = require('../controller/reports-controller');
const router = express.Router()

router.use('/last-month-sales', controller.lastMonthSales);

module.exports = router;