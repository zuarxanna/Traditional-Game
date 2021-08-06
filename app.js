const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const app = express();
const morgan = require('morgan');

// logger
app.use(morgan('dev'));

// view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
// To support URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

// To get static file
app.use(express.static(__dirname + '../public'));
app.use(express.static('public'));

// Router
const router = require('./router/index');
app.use(router);

// 404 handler
app.use((req, res, next) => {
  next(
    res.status(404).render('notFound', {
      title: 'NOT FOUND',
      layout: 'layouts/main',
      login: req.cookies.AuthToken !== undefined,
    })
  );
});

// 500 handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).render('error', {
    title: 'NOT FOUND',
    layout: 'layouts/main',
    login: req.cookies.AuthToken !== undefined,
  });
});

// server
const port = 3000;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
