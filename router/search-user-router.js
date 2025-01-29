const epxress = require('express');
const controller = require('../controller/users-controller');
const router = epxress.Router();

router.use('/search-user', controller.searchUser);

module.exports = router; 