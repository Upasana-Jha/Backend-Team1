var express = require('express');
var router = express.Router();
var path = require('path');
//var {addEmployee,getEmployees,updateEmployee,deleteEmployee,getEmployeeById} = require('../service/employee-psql.js')
var {addLeaves,getLeaves,deleteLeaves,getLeavesByEmployeeId,updateLeaves} = require('../service/leaves-psql.js')


//api/employee
router.get('/', async (req, res, next) => {
  let records = await getLeaves();
  res.send(records);
});
router.get('/', async (req, res, next) => {
  let records = await getLeaves();
  res.send(records);
});

router.get('/:id', async function (req, res) {
  console.log("id:"+req.params.id);
  let record = await getLeavesByEmployeeId(req.params.id);
  res.send(record);
});

router.post('/', async function (req, res) {
  await addLeaves(req.body);
  res.send({result:"ok", msg:"Leave added ok"});
});

router.put('/', async function (req, res) {
  await updateLeaves(req.body);
  res.send({result:"ok", msg:"Leave updated ok"});
});


router.delete('/', async function (req, res) {
  await deleteLeaves(req.body)
  res.send({result:"ok", msg:"Leave deleted ok"}); //response to client
});


module.exports = router;