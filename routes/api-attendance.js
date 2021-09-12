var express = require('express');
var router = express.Router();
var path = require('path');
const { Sequelize } = require('sequelize');
const Attendance = require('../models/attendance')

router.get('/', async (req, res, next) => {
   await Attendance.findAll().then((records)=>{
    res.send(records);
   });
  
});
router.get('/:id', async function (req, res) {
  await Attendance.findOne({where:{employeeid:req.params.id}}).then((records)=>{
    res.send(records);
   });
});




module.exports = router;
