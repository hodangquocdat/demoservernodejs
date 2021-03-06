var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('json spaces', 2)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/apple-app-site-association', function (req, res) {
  res.send({
    applinks: {
         apps: [],
          details: [
             {
                 appID:'V2GWF78A6U.com.entertainmentsoc.esoc',
                 paths:[ '/SignupInterstitial',
                          'NOT *',
                        'NOT /',
                      'NOT /hodangquocdat/*']
             }
           ]
      }
  })
})
app.get('/SignupInterstitial.jsp', function (req, res) {
  res.send({ some: 'json' })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
