var express = require('express');
var router = express.Router();
var app = express();
var {getPasswordByEmail} = require('../service/employee-psql.js')
var jwt = require('jsonwebtoken')
var md5 = require('md5')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("user router");
  res.send('respond with a resource from user router');
});
app.set('superSecret', 'trainingIsGood'); // secret variable

router.post('/authenticate', async function(req, res, next) {
let email = req.body.email;
let record = await getPasswordByEmail(email);


reqPassword = md5(req.body.password)
console.log("password",reqPassword);
employeeid = record[0].id;
emprole = record[0].role;
password = record[0].password;

  if(reqPassword === password && typeof(req.body.email) != 'undefined'){
    //req.session.user = req.body.username;
    //generating token
    var payload = {
      user: req.body.email,
      employeeid: employeeid,
      emprole:emprole  
    }
    var token = jwt.sign(payload, app.get('superSecret'), {
      expiresIn: 86400 // expires in 24 hours
    });
    res.json({
      success: true,
      message: 'User login successful! Enjoy your token!',
      token: token,
      id:employeeid
    });

  }else{
    res.json({ success: false, message: 'Authentication failed. User not found.' });
  }
});

module.exports = router;
