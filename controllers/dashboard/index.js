const layout = 'layouts/main';
const { user_game, user_biodata } = require('../../models');

module.exports = {
  dashboard: async (req, res) => {
    const users = await user_game.findAll({ include: user_biodata });
    res.render('dashboard', {
      layout,
      title: 'dashboard',
      login: true,
      users,
    });
  },
  createUserPage: (req, res) => {
    if (req.cookies.flashMsg) {
      const flashMessage = req.cookies.flashMsg;
      res.cookie('flashMsg', '', { expires: new Date(0) });
      res.render('createUser', {
        layout,
        title: 'create user',
        login: true,
        message: flashMessage,
      });
    } else {
      res.render('createUser', {
        layout,
        title: 'create user',
        login: true,
        message: '',
      });
    }
  },
  createUserForm: async (req, res) => {
    const { firstname, lastname, country, username, password } = await req.body;
    const newUser = await { username, password };
    const users = await user_game.findAll();
    if (users.find((i) => i.username === username)) {
      res.cookie('flashMsg', 'Username Already Registered!');
      res.redirect('/dashboard/create-user');
    } else {
      await user_game.signup(newUser);
      const user = await user_game.findOne({
        where: { username: username },
      });
      user_biodata.create({ firstname, lastname, country, userId: user.id });
      res.redirect('/dashboard');
    }
  },
  editUserPage: (req, res) => {
    const userId = req.params.id;
    if (req.cookies.flashMsg) {
      user_game.findOne({ where: { id: userId }, include: user_biodata }).then((user) => {
        const flashMessage = req.cookies.flashMsg;
        res.cookie('flashMsg', '', { expires: new Date(0) });
        res.render('editUser', {
          layout,
          title: 'EDIT USER',
          userId,
          user,
          login: true,
          message: flashMessage,
        });
      });
    } else {
      user_game.findOne({ where: { id: userId }, include: user_biodata }).then((user) => {
        res.render('editUser', {
          layout,
          title: 'EDIT USER',
          userId,
          user,
          login: true,
          message: '',
        });
      });
    }
  },
  editUserForm: async (req, res) => {
    const { username, firstname, lastname, country } = await req.body;
    const id = await req.params.id;
    const query = {
      where: {
        id: id,
      },
    };
    const users = await user_game.findAll();
    if (users.find((i) => i.username === username)) {
      res.cookie('flashMsg', 'Username Already Registered!');
      res.redirect(`/dashboard/edit-user/${id}`);
    } else {
      await user_game.update({ username }, query);
      user_biodata.update({ firstname, lastname, country }, query);
      res.redirect('/dashboard');
    }
  },
  deleteUSer: async (req, res) => {
    const queryUser = {
      where: { id: await req.params.id },
    };
    const queryBiodata = {
      where: { userId: await req.params.id },
    };
    await user_game.destroy(queryUser);
    await user_biodata.destroy(queryBiodata);

    res.redirect('/dashboard');
  },
};
