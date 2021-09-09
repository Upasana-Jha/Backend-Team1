
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var apiEmployee = require('./routes/api-employee');
var apiSalaries = require('./routes/api-salaries');
var apiLeaves = require('./routes/api-leaves');
var apiAttendance = require('./routes/api-attendance');

var cors = require('cors')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens


//var session = require('cookie-session')
var app = express();

app.set('superSecret', 'trainingIsGood'); // secret variable

// view engine setup

app.use(cors());
var sess = {
  secret: 'keyboard cat',
  cookie: {},
  proxy: true,
  resave: true,
  saveUninitialized: true
}
//app.use(session(sess));
app.use(logger('dev'));
app.use(express.json());

//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/',usersRouter);

app.use(function(req, res, next) {
console.log("security point");
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;  
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.'
    });
  }
});


app.use('/api/employee', apiEmployee);
app.use('/api/salaries', apiSalaries);
app.use('/api/leaves', apiLeaves);
app.use('/api/attendance',apiAttendance);



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
