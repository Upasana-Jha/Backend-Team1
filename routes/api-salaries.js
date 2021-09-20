var express = require('express');
var router = express.Router();
var path = require('path');

const { Sequelize } = require('sequelize');
const Salaries = require('../models/salaries');

const {authUser} = require('../service/authUser.js')

//api/employee



router.get('/:id/:monthyear', authUser,async function (req, res) {
  await Salaries.findOne({where:{employeeid:req.params.id,monthyear:req.params.monthyear}}).then((records)=>{
    res.send(records);
   });
});



module.exports = router;
