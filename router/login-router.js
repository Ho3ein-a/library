const express = require('express');
const router = express.Router();
const controller = require('../controller/login-controller');

router.use('/login', controller.renderLogIn);

module.exports = router ; 