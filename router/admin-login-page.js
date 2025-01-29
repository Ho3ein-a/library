const express = require('express');
const router = express.Router();
const controller = require('../controller/admin-login-page');

router.use('/admin-login', controller.adminlogInFormController);

module.exports = router ;
