var express = require('express');
var router = express.Router();
var path = require('path');
const { Sequelize } = require('sequelize');
const Attendance = require('../models/attendance')
const {authUser} = require('../service/authUser.js')


router.get('/:id',authUser, async function (req, res) {
  await Attendance.findOne({where:{employeeid:req.params.id}}).then((records)=>{
    res.send(records);
   });
});




module.exports = router;
