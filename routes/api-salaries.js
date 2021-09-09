var express = require('express');
var router = express.Router();
var path = require('path');
var {addSalary,getSalaries,updateSalary,deleteSalary,getSalaryByEmployeeId} = require('../service/salaries-psql.js')


//api/employee

router.get('/', async (req, res, next) => {
  let records = await getSalaries();
  res.send(records);
});

router.get('/:id', async function (req, res) {
  console.log("id:"+req.params.id);
  let record = await getSalaryByEmployeeId(req.params.id);
  res.send(record);
});

router.post('/', async function (req, res) {
  await addSalary(req.body);
  res.send({result:"ok", msg:"salary added ok"});
});

router.put('/', async function (req, res) {
  await updateSalary(req.body);
  res.send({result:"ok", msg:"employee updated ok"});
});


router.delete('/', async function (req, res) {
  await deleteSalary(req.body)
  res.send({result:"ok", msg:"employee deleted ok"}); //response to client
});


module.exports = router;
