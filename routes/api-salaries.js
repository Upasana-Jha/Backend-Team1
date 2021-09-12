var express = require('express');
var router = express.Router();
var path = require('path');

const { Sequelize } = require('sequelize');
const Salaries = require('../models/salaries')


//api/employee
router.get('/', async (req, res, next) => {
   await Salaries.findAll().then((records)=>{
    res.send(records);
   });
  
});
router.get('/:id/:monthyear', async function (req, res) {
  await Salaries.findOne({where:{employeeid:req.params.id,monthyear:req.params.monthyear}}).then((records)=>{
    res.send(records);
   });
});

router.post('/', async function (req, res) {
  await Salaries.create(req.body);
  res.send({result:"ok", msg:"Salaries added ok"});
});

router.delete('/', async function (req, res) {
  await Salaries.destroy({where:{id:req.body.id}}).then(result=>
    res.send({result:'success',msg:"Salaries deleted successfully"}),
    err =>
    res.send({result:'fail',msg:"Salaries deletion failed"}))
 
});

router.put('/', async function (req, res) {
  await Salaries.update(req.body,{where :{id:req.body.id}}).then(result =>
    res.send({result:'success', msg:"Salaries updated successfully"}),
  err =>
    res.send({result:'fail', msg:"Salaries updatation failed"})
  );
  
});

module.exports = router;
