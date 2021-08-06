const router = require('express').Router();
const signupController = require('../../controllers/signup');

router.get('/', signupController.signupPage);
router.post('/', signupController.signupForm);

module.exports = router;
