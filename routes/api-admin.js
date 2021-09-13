var express = require('express');
var router = express.Router();
var path = require('path');
const { Sequelize } = require('sequelize');
var md5 = require('md5');
//EMPLOYEE

const Employee = require('../models/employee')

router.get('/employee', async (req, res, next) => {
  await Employee.findAll().then((records)=>{
   res.send(records);
  });
 
});
router.get('/employee/:id', async function (req, res) {
 await Employee.findOne({where:{id:req.params.id}}).then((records)=>{
   res.send(records);
  });
});

router.post('/employee', async function (req, res) {
 d=new Date();
 req.body.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
 req.body.dateOfEntry= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
 req.body.password = md5(req.body.password);
 await Employee.create(req.body);
  res.send({result:"ok", msg:"employee added ok"});

});

router.delete('/employee', async function (req, res) {
 await Employee.destroy({where:{id:req.body.id}}).then(result=>
   res.send({result:'success',msg:"employee deleted successfully"}),
   err =>
   res.send({result:'fail',msg:"employee deletion failed"}))

});

router.put('/employee', async function (req, res) {
 d=new Date();
 req.body.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
 
 await Employee.update(req.body,{where :{id:req.body.id}}).then(result =>
   res.send({result:'success', msg:"employee updated successfully"}),
 err =>
   res.send({result:'fail', msg:"employee updatation failed"})
 );
 
});

//ATTENDANCE

const Attendance = require('../models/attendance')

router.get('/attendance', async (req, res, next) => {
   await Attendance.findAll().then((records)=>{
    res.send(records);
   });
  
});
router.get('/attendance/:id', async function (req, res) {
  await Attendance.findOne({where:{employeeid:req.params.employeeid}}).then((records)=>{
    res.send(records);
   });
});

router.post('/attendance', async function (req, res) {
  await Attendance.create(req.body);
  res.send({result:"ok", msg:"Attendance added ok"});
});

router.delete('/attendance', async function (req, res) {
  await Attendance.destroy({where:{id:req.body.id}}).then(result=>
    res.send({result:'success',msg:"Attendance deleted successfully"}),
    err =>
    res.send({result:'fail',msg:"Attendance deletion failed"}))
 
});

router.put('/attendance', async function (req, res) {
  await Attendance.update(req.body,{where :{employeeid:req.body.employeeid}}).then(result =>
    res.send({result:'success', msg:"Attendance updated successfully"}),
  err =>
    res.send({result:'fail', msg:"Attendance updation failed"})
  );
  
});

//LEAVES
const Leaves= require('../models/leaves')


router.get('/leaves', async (req, res, next) => {
   await Leaves.findAll().then((records)=>{
    res.send(records);
   });
  
});
router.get('/leaves/:id', async function (req, res) {
  await Leaves.findOne({where:{employeeid:req.params.employeeid}}).then((records)=>{
    res.send(records);
   });
});

router.post('/leaves', async function (req, res) {
  d=new Date();
  req.body.dateofmodify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  req.body.dateofentry= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  
  await Leaves.create(req.body);
  res.send({result:"ok", msg:"leaves added ok"});
});

router.delete('/leaves', async function (req, res) {
  await Leaves.destroy({where:{id:req.body.id}}).then(result=>
    res.send({result:'success',msg:"leaves deleted successfully"}),
    err =>
    res.send({result:'fail',msg:"leaves deletion failed"}))
 
});

router.put('/leaves', async function (req, res) {
  d=new Date();
  req.body.dateofmodify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString();
 
  await Leaves.update(req.body,{where :{employeeid:req.body.employeeid}}).then(result =>
    res.send({result:'success', msg:"leaves updated successfully"}),
  err =>
    console.log(err)
    //res.send({result:'fail', msg:"leaves updatation failed"})
  );
  
});



//SALARY

const Salaries = require('../models/salaries')

router.get('/salaries', async (req, res, next) => {
   await Salaries.findAll().then((records)=>{
    res.send(records);
   });
  
});
router.get('/salaries/:id/:monthyear', async function (req, res) {
  await Salaries.findOne({where:{employeeid:req.params.employeeid,monthyear:req.params.monthyear}}).then((records)=>{
    res.send(records);
   });
});

router.post('/salaries', async function (req, res) {
  d=new Date();
  req.body.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  req.body.dateOfEntry= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  await Salaries.create(req.body);
  res.send({result:"ok", msg:"Salaries added ok"});
});

router.delete('/salaries', async function (req, res) {
  await Salaries.destroy({where:{id:req.body.id}}).then(result=>
    res.send({result:'success',msg:"Salaries deleted successfully"}),
    err =>
    res.send({result:'fail',msg:"Salaries deletion failed"}))
 
});

router.put('/salaries', async function (req, res) {
  d=new Date();
  req.body.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  await Salaries.update(req.body,{where :{employeeid:req.body.employeeid}}).then(result =>
    res.send({result:'success', msg:"Salaries updated successfully"}),
  err =>
    res.send({result:'fail', msg:"Salaries updatation failed"})
  );
  
});

module.exports = router;
