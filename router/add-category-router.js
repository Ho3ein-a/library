const express = require('express');
const router = express.Router();
const controller = require('../controller/category-controller');

router.use('/add-category', controller.addCategoryConteroller);

module.exports = router;