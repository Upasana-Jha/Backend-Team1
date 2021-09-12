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
  const text = 'INSERT INTO leaves(employeeid,"startdate","enddate",count,year,"dateofentry","dateofmodify") VALUES($1, $2, $3, $4, $5,$6,$7) RETURNING *';
  employee.dateofmodify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  employee.dateofentry= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  const values = [employee.employeeid,employee.startdate,employee.enddate,employee.count,employee.year,employee.dateofentry,employee.dateofmodify];
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
            resolve(results.rows);
          }
        });
    })
};

service.updateLeaves = function(employee){
  const sql = 'UPDATE leaves set startdate=$1, enddate=$2, count=$3, year=$4 , "dateofentry"=$5, "dateofmodify"=$6 WHERE employeeid = $7';
  d=new Date();
   employee.dateofentry= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  employee.dateofmodify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString();
  const values = [employee.startdate,employee.enddate,employee.count,employee.year, employee.dateofentry,employee.dateofmodify,employee.employeeid];
  try {
    return pool.query(sql, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
};



module.exports=service;
