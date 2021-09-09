
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


var apiEmployee = require('./routes/api-employee');
var apiSalaries = require('./routes/api-salaries');
var apiLeaves = require('./routes/api-leaves');
var apiAttendance = require('./routes/api-attendance');

var cors = require('cors')


//var session = require('cookie-session')
var app = express();


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

/*
app.use((req,res,next)=>{
console.log("security point");
if(typeof(req.session.user) == 'string')
{
  next();
}
else
{
  res.send({result:"fail",msg:"you do not have access to api"})
}
})
*/
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
