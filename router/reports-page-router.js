const epxress = require('express');
const controller = require('../controller/reports-controller');
const router = epxress.Router();

router.use('/reports', controller.reportsPageRender);

module.exports = router ; 