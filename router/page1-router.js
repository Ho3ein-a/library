const epxress = require('express');
const controller = require('../controller/pages-controller');
const router = epxress.Router();

router.use('/page1', controller.page1);

module.exports = router;