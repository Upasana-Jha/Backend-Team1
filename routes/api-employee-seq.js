var express = require('express');
var router = express.Router();
var path = require('path');
const { Sequelize } = require('sequelize');
const Employee = require('../models/employee')


//api/employee
router.get('/', async (req, res, next) => {
   await Employee.findAll().then((records)=>{
    res.send(records);
   });
  
});
router.get('/:id', async function (req, res) {
  await Employee.findOne({where:{id:req.params.id}}).then((records)=>{
    res.send(records);
   });
});

router.post('/', async function (req, res) {
  await Employee.create(req.body);
  res.send({result:"ok", msg:"employee added ok"});
});

router.delete('/', async function (req, res) {
  await Employee.destroy({where:{id:req.body.id}}).then(result=>
    res.send({result:'success',msg:"employee deleted successfully"}),
    err =>
    res.send({result:'fail',msg:"employee deletion failed"}))
 
});

router.put('/', async function (req, res) {
  await Employee.update(req.body,{where :{id:req.body.id}}).then(result =>
    res.send({result:'success', msg:"customer updated successfully"}),
  err =>
    res.send({result:'fail', msg:"customer updatation failed"})
  );
  
});



module.exports = router;

