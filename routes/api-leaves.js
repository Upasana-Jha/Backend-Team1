var express = require('express');
var router = express.Router();
var path = require('path');

const { Sequelize } = require('sequelize');
const Leaves= require('../models/leaves')


router.get('/', async (req, res, next) => {
   await Leaves.findAll().then((records)=>{
    res.send(records);
   });
  
});
router.get('/:id', async function (req, res) {
  await Leaves.findOne({where:{employeeid:req.params.id}}).then((records)=>{
    res.send(records);
   });
});






module.exports = router;