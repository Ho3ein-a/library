const express = require('express');
const controller = require('../controller/cart-controller');
const router = express.Router();

router.use('/boughts', controller.boughtsPageRender);

module.exports = router;