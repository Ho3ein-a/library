const express = require('express');
const router = express.Router();
const controller = require('../controller/users-controller');

router.use('/add-user', controller.userSignInController);

module.exports = router ;