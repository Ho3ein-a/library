const express = require('express');
const router = express.Router();
const controller = require('../controller/reports-controller');

router.use('/most-expensive', controller.mostExpensiveOfCategory);

module.exports = router;