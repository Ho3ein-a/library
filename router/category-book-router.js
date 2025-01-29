const express = require('express');
const controller = require('../controller/reports-controller');
const router =  express.Router();

router.use('/category-book', controller.numberOfEachCategoryReport);

module.exports = router;