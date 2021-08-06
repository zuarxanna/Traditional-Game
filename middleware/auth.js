const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.AuthToken;
  if (token) {
    jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err) {
        res.cookie('flashMsg', 'Please Login To Continue');

        res.redirect('/login');
      } else {
        req.user = decodedToken;
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.cookie('flashMsg', 'Please Login To Continue');
    res.redirect('/login');
  }
};
