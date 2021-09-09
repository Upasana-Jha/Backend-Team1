var express = require('express');
var router = express.Router();
var app = express();
var {getPasswordByEmail} = require('../service/employee-psql.js')
var jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("user router");
  res.send('respond with a resource from user router');
});
app.set('superSecret', 'trainingIsGood'); // secret variable

router.post('/authenticate', async function(req, res, next) {
  console.log(req.body);
let email = req.body.email;
  let record = await getPasswordByEmail(email);
password= record[0].password;

  if(req.body.password === password && typeof(req.body.email) != 'undefined'){
    //req.session.user = req.body.username;
    //generating token
    var payload = {
      admin: req.body.username  
    }
    var token = jwt.sign(payload, app.get('superSecret'), {
      expiresIn: 86400 // expires in 24 hours
    });
    res.json({
      success: true,
      message: 'User login successful! Enjoy your token!',
      token: token
    });

  }else{
    res.json({ success: false, message: 'Authentication failed. User not found.' });
  }
});

module.exports = router;
