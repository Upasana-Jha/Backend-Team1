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

router.post('/', async function (req, res) {
  await Attendance.create(req.body);
  res.send({result:"ok", msg:"Attendance added ok"});
});

router.delete('/', async function (req, res) {
  await Attendance.destroy({where:{id:req.body.id}}).then(result=>
    res.send({result:'success',msg:"Attendance deleted successfully"}),
    err =>
    res.send({result:'fail',msg:"Attendancedeletion failed"}))
 
});

router.put('/', async function (req, res) {
  await Attendance.update(req.body,{where :{id:req.body.id}}).then(result =>
    res.send({result:'success', msg:"Attendance updated successfully"}),
  err =>
    res.send({result:'fail', msg:"Attendance updatation failed"})
  );
  
});


module.exports = router;
