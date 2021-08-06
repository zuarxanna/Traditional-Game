const router = require('express').Router();
const auth = require('../middleware/auth.js');
const homeRouter = require('./home');
const signupRouter = require('./signup');
const loginRouter = require('./login');
const gameRouter = require('./game');
const dashboardRouter = require('./dashboard');
const logoutRouter = require('./logout');
const roomRouter = require('./room');

router.use('/', homeRouter);
router.use('/login', loginRouter);
router.use('/game', auth, gameRouter);
router.use('/dashboard', auth, dashboardRouter);
router.use('/logout', logoutRouter);
router.use('/signup', signupRouter);
router.use('/room', auth, roomRouter);

module.exports = router;
