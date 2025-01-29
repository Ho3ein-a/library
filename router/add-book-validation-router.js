const epxress = require('express');
const router = epxress.Router();
const controller = require('../controller/add-book-controller');

router.use('/add-book-validation', controller.addBookValidation);

module.exports = router ;