const epxress = require('express');
const controller = require('../controller/pages-controller');
const router = epxress.Router();

router.use('/page2', controller.page2);

module.exports = router;