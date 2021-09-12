const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'HRMIS',
  password: '123456',
  port: 5432,
})
var service = {};

service.getAttendance = function() {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from attendance', function (error, results, fields) {
          if (error) {
            resolve([]);
            throw error;
          }else{
            console.log(results.rows)
            resolve(results.rows);
          }
        });
       
    })
}

service.addAttendance = function(employee) {
    d=new Date();
    const text = 'INSERT INTO attendance(employeeid,"date","intimedate","outtime",totalhours) VALUES($1, $2, $3, $4, $5) RETURNING *';
    employee.intimedate= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
    employee.outtime= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
    const values = [employee.employeeid,employee.date,employee.intimedate,employee.outtime,employee.totalhours];
    try {
      console.log("HII");
      return pool.query(text, values)
      
    } catch (err) {
      console.log(err.stack)
    }
  };

service.deleteAttendance = function({id}){
  const sql = "delete FROM attendance where id='"+id+"'";
  try {
    return pool.query(sql);
  } catch (err) {
    console.log(err.stack)
  }
};

service.getAttendanceByEmployeeId = function(employeeid){
       return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from attendance where employeeid='+employeeid, function (error, results, fields) {
          if (error) {
            resolve({});
            throw error;
          }else{
            resolve(results.rows)
          }
        });
    })
};

service.updateAttendance = function(employee){
  d=new Date();
  employee.intimedate= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  employee.outtime= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString();
  const sql = 'UPDATE attendance set date=$1, intimedate=$2, outtime=$3,totalhours=$4 WHERE employeeid = $5';
  const values = [employee.date,employee.intimedate,employee.outtime,employee.totalhours,employee.employeeid];
  try {
    return pool.query(sql, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
};

module.exports=service;
