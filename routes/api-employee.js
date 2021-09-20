var express = require('express');
var router = express.Router();
var path = require('path');
const { Sequelize } = require('sequelize');
const Employee = require('../models/employee')
const {authUser} = require('../service/authUser.js')


//api/employee

router.get('/:id', authUser, async function (req, res) {
  await Employee.findOne({where:{employeeid:req.params.id}}).then((records)=>{
    res.send(records);
   });
});




module.exports = router;

