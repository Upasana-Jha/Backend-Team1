var express = require('express');
var router = express.Router();
var path = require('path');
var {addAttendance,getAttendance,deleteAttendance,getAttendanceByEmployeeId,updateAttendance} = require('../service/attendance-psql.js')


//api/employee
router.get('/', async (req, res, next) => {
  let records = await getAttendance();
  res.send(records);
});
router.get('/', async (req, res, next) => {
  let records = await getAttendance();
  res.send(records);
});

router.get('/:id', async function (req, res) {
  console.log("id:"+req.params.id);
  let record = await getAttendanceByEmployeeId(req.params.id);
  res.send(record);
});

router.post('/', async function (req, res) {
  await addAttendance(req.body);
  res.send({result:"ok", msg:"Attendance added ok"});
});

router.put('/', async function (req, res) {
  await updateAttendance(req.body);
  res.send({result:"ok", msg:"Attendance updated ok"});
});


router.delete('/', async function (req, res) {
  await deleteAttendance(req.body)
  res.send({result:"ok", msg:"Attendance deleted ok"}); //response to client
});


module.exports = router;