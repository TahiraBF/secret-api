var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
const passport   = require('./config/passport');


var auth         = require('./routes/auth');
var index        = require('./routes/index');
var profile      = require('./routes/profile');
var secrets      = require('./routes/secrets');
var cors         = require('cors');


require('./config/database');
var app = express();

var corsOptions = {credentials: true, origin: 'http://localhost:4200'};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(passport.initialize());



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/', auth);
app.use('/api/profile', passport.authenticate('jwt', { session: false }), profile);
app.use('/api/secrets', passport.authenticate('jwt', { session: false }), secrets);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
