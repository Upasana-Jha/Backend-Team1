const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'HRMIS',
  password: 'toor',
  port: 5432,
})
var service = {};

service.getSalaries = function() {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from salaries', function (error, results, fields) {
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
service.addSalary = function(employee) {
  d=new Date();
  const text = 'INSERT INTO salaries(employeeid, monthyear, basic, hra, lta, variable, bonus, tds, tax, total, workingdaysinmonth, dateofentry, dateofmodify) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
  employee.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  employee.dateOfEntry= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  const values = [employee.employeeid,employee.monthyear,employee.basic,employee.hra,employee.lta,employee.variable,employee.bonus ,employee.tds, employee.tax,employee.total,employee.workingdaysinmonth,employee.dateOfEntry,employee.dateOfModify];
  try {
    return pool.query(text, values)
    
  } catch (err) {
    console.log(err.stack)
  }
};

service.deleteSalary = function({id}){
  const sql = "delete FROM salaries where id='"+id+"'";
  try {
    return pool.query(sql);
  } catch (err) {
    console.log(err.stack)
  }
};

service.getSalaryByEmployeeId = function(employeeid){
       return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from salaries where employeeid='+employeeid, function (error, results, fields) {
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

service.updateSalary = function(employee){
  const sql = 'UPDATE salaries set monthyear=$1, basic=$2, hra=$3, lta=$4 ,variable=$5, bonus=$6, tds=$7, tax=$8 ,total=$9,workingdaysinmonth=$9, "dateOfModify"=$10, WHERE employeeid = $12';
  d=new Date();
  employee.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString();
  const values = [employee.monthyear,employee.basic,employee.hra,employee.lta,employee.variable,employee.bonus,employee.tds,employee.tax,employee.total ,employee.workingdaysinmonth,employee.dateOfModify,employee.employeeid];
  try {
    return pool.query(sql, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
};



module.exports=service;

