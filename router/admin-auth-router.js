const express = require('express');
const router = express.Router();
const controller = require('../controller/admin-login-page');
const bp = require('body-parser');

router.use('/admin-auth', bp.urlencoded({extended:false}), controller.adminAuthentication);

module.exports = router