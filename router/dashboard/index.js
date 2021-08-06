const router = require('express').Router();
const dashboardController = require('../../controllers/dashboard');

router.get('/', dashboardController.dashboard);
router.get('/create-user', dashboardController.createUserPage);
router.post('/create-user', dashboardController.createUserForm);
router.get('/edit-user/:id', dashboardController.editUserPage);
router.post('/edit-user/:id', dashboardController.editUserForm);
router.get('/delete-user/:id', dashboardController.deleteUSer);

module.exports = router;
