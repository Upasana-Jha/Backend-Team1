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




module.exports = router;

