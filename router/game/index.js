const router = require('express').Router();
const gameController = require('../../controllers/game');

router.get('/', gameController);

module.exports = router;
