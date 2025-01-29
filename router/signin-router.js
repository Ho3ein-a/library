const express = require('express');
const router = express.Router();
const controller = require('../controller/signin-controller');

router.use('/sign-in', controller.renderSingIn);

module.exports = router ; 