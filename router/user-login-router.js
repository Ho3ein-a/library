const express = require('express');
const router = express.Router();
const controller = require('../controller/users-controller');

router.use('/user-login', controller.userLoginController);

module.exports = router;