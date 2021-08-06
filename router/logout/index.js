const router = require('express').Router();
const logoutController = require('../../controllers/logout');

router.get('/', logoutController);

module.exports = router;
