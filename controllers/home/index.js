const layout = 'layouts/main';

const home = (req, res) => {
  res.render('home', {
    layout,
    title: 'TRADITIONAL GAME',
    login: req.cookies.AuthToken !== undefined,
  });
};

module.exports = home;
