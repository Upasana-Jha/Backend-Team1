const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'HRMIS',
  password: 'Ganesh@0508',
  port: 5432,
})
var service = {};

service.getLeaves = function() {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from leaves', function (error, results, fields) {
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
service.addLeaves = function(employee) {
  d=new Date();
  const text = 'INSERT INTO leaves(employeeid,"startDate","endDate",count,year,"dateOfEntry","dateOfModify") VALUES($1, $2, $3, $4, $5,$6,$7) RETURNING *';
  leaves.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  leaves.dateOfEntry= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  const values = [employee.employeeid,employee.startDate,employee.endDate,employee.count,employee.year,employee.dateOfEntry,employee.dateOfModify];
  try {
    console.log("HII");
    return pool.query(text, values)
    
  } catch (err) {
    console.log(err.stack)
  }
};

service.deleteLeaves = function({id}){
  const sql = "delete FROM leaves where id='"+id+"'";
  try {
    return pool.query(sql);
  } catch (err) {
    console.log(err.stack)
  }
};

service.getLeavesByEmployeeId = function(employeeid){
       return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from leaves where employeeid='+employeeid, function (error, results, fields) {
          if (error) {
            resolve({});
            throw error;
          }else{
            if(results.rows.length > 0){
              resolve(results.rows[0]);
            }else{
              resolve({});
            } 
          }
        });
    })
};

service.updateLeaves = function(employee){
  const sql = 'UPDATE leaves set startDate=$1, endDate=$2, count=$3, year=$4 , "dateOfEntry"=$5, "dateOfModify"=$6 WHERE employeeid = $8';
  d=new Date();
   employee.dateOfEntry= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  employee.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString();
  const values = [employee.startDate,employee.endDate,employee.count,employee.year, employee.dateOfEntry,employee.dateOfModify];
  try {
    return pool.query(sql, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
};



module.exports=service;