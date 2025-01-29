const express = require('express');
const router = express.Router();
const controller = require('../controller/start-page-controller.js')


router.use('/start-page', controller.renderStartPage)

module.exports = router ; 