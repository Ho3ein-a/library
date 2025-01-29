const express =  require('express');
const router = express.Router();
const controller = require('../controller/category-controller');

router.use('/category', controller.categoryFormRender);

module.exports = router;