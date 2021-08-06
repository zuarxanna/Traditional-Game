const router = require('express').Router();
const loginController = require('../../controllers/login');

router.get('/', loginController.loginPage);
router.post('/', loginController.loginForm);

module.exports = router;
