const { user_game } = require('../../models');
const bcrypt = require('bcrypt');
const layout = 'layouts/main';

function format(user) {
  const { id, username } = user;
  return {
    id,
    username,
    accessToken: user.generateToken(),
  };
}

module.exports = {
  loginPage: (req, res) => {
    if (req.cookies.flashMsg) {
      const flashMessage = req.cookies.flashMsg;
      res.cookie('flashMsg', '', { expires: new Date(0) });
      res.render('login', {
        layout,
        title: 'LOG IN',
        message: flashMessage,
        messageClass: 'alert-danger',
        login: false,
      });
    } else {
      res.render('login', {
        title: 'LOG IN',
        layout,
        message: '',
        login: false,
      });
    }
  },
  loginForm: async (req, res) => {
    const { username, password } = req.body;
    const query = {
      where: {
        username: username,
      },
    };
    const user = await user_game.findOne(query);
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const authToken = format(user);
        await res.cookie('AuthToken', authToken.accessToken, { maxAge: 3600000, httpOnly: true });
        console.log(req.cookies.AuthToken);
        res.redirect('/dashboard');
      } else {
        res.cookie('flashMsg', 'Invalid Password');
        res.redirect('/login');
      }
    } else {
      res.cookie('flashMsg', "User doesn't exist!");
      res.redirect('/login');
    }
  },
};
