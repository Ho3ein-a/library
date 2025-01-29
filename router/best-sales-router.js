const epxress = require('express');
const controller = require('../controller/reports-controller');
const router = epxress.Router();

router.use('/best-sales', controller.bestSalesReport);

module.exports = router;