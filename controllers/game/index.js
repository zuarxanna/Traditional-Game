const layout = 'layouts/main';

const game = (req, res) => {
  res.render('game', {
    layout,
    title: 'ROCK PAPER SCISSOR',
    login: true,
  });
};

module.exports = game;
