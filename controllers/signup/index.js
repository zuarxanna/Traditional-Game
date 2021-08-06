const layout = 'layouts/main';
const { user_game, user_biodata } = require('../../models');
const { getHashedPassword, generateAuthToken } = require('../../utils/users');

module.exports = {
  signupPage: (req, res) => {
    if (req.cookies.flashMsg) {
      const flashMessage = req.cookies.flashMsg;
      res.cookie('flashMsg', '', { expires: new Date(0) });
      res.render('signup', {
        layout,
        title: 'SIGN UP',
        login: false,
        message: flashMessage,
      });
    } else {
      res.render('signup', {
        layout,
        title: 'SIGN UP',
        login: false,
        message: '',
      });
    }
  },
  signupForm: async (req, res) => {
    const { firstname, lastname, country, username, password } = await req.body;
    const newUser = await { username, password };
    const users = await user_game.findAll();
    if (users.find((i) => i.username === username)) {
      res.cookie('flashMsg', 'Username Already Registered!');
      res.redirect('/signup');
    } else {
      await user_game.signup(newUser);
      const user = await user_game.findOne({
        where: { username: username },
      });
      user_biodata.create({ firstname, lastname, country, userId: user.id });
      res.cookie('flashMsg', 'Sign Up Success');
      res.redirect('/login');
    }
  },
};
