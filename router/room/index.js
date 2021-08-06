const router = require('express').Router();
const roomController = require('../../controllers/room');

router.post('/generate', roomController.generate);
router.post('/join', roomController.join);
router.post('/fight', roomController.fight);
router.get('/result', roomController.result);

module.exports = router;
