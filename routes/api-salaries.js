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
  await Salaries.findAll({where:{employeeid:req.params.employeeid,monthyear:req.params.monthyear}}).then((records)=>{
    res.send(records);
   });
});



module.exports = router;
