var express = require('express');
var router = express.Router();
var path = require('path');
var {addEmployee,getEmployees,updateEmployee,deleteEmployee,getEmployeeById} = require('../service/employee-psql.js')


//api/employee
router.get('/', async (req, res, next) => {
  let records = await getEmployees();
  res.send(records);
});
router.get('/', async (req, res, next) => {
  let records = await getEmployees();
  res.send(records);
});

router.get('/:id', async function (req, res) {
  console.log("id:"+req.params.id);
  let record = await getEmployeeById(req.params.id);
  res.send(record);
});

router.post('/', async function (req, res) {
  await addEmployee(req.body);
  res.send({result:"ok", msg:"employee added ok"});
});

router.put('/', async function (req, res) {
  await updateEmployee(req.body);
  res.send({result:"ok", msg:"employee updated ok"});
});


router.delete('/', async function (req, res) {
  await deleteEmployee(req.body)
  res.send({result:"ok", msg:"employee deleted ok"}); //response to client
});


module.exports = router;
