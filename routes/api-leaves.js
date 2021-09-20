var express = require('express');
var router = express.Router();
var path = require('path');

const { Sequelize } = require('sequelize');
const Leaves= require('../models/leaves')
const {authUser} = require('../service/authUser.js')


router.get('/:id',authUser, async function (req, res) {
  await Leaves.findOne({where:{employeeid:req.params.id}}).then((records)=>{
    res.send(records);
   });
});






module.exports = router;
