const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'HRMIS',
  password: 'toor',
  port: 5432,
})
var service = {};

service.getEmployees = function() {
     return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from employee', function (error, results, fields) {
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
service.addEmployee = function(employee) {
  d=new Date();
  const text = 'INSERT INTO employee(name, email,address,"dateOfBirth","dateOfJoining",education,type,role,password,"dateOfEntry","dateOfModify",active) VALUES($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12) RETURNING *';
  employee.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  employee.dateOfEntry= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString()
  const values = [employee.name,employee.email,employee.address,employee.dateOfBirth,employee.dateOfJoining,employee.education,employee.type,employee.role ,employee.password, employee.dateOfEntry,employee.dateOfModify,employee.active];
  try {
    console.log("HII");
    return pool.query(text, values)
    
  } catch (err) {
    console.log(err.stack)
  }
};

service.deleteEmployee = function({id}){
  const sql = "delete FROM employee where id='"+id+"'";
  try {
    return pool.query(sql);
  } catch (err) {
    console.log(err.stack)
  }
};

service.getEmployeeById = function(id){
       return new Promise((resolve, reject) => {
         //promise inside
         pool.query('SELECT * from employee where id='+id, function (error, results, fields) {
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

service.updateEmployee = function(employee){
  const sql = 'UPDATE employee set name=$1, email=$2, address=$3, dateOfBirth=$4 dateOfJoining=$5, education=$6, type=$7, role=$8 password=$9, dateOfEntry=$10, dateOfModify=$11, active=$12 WHERE id = $13';
  d=new Date();
  employee.dateOfModify= d.toISOString().slice(0,10)+" "+d.toLocaleTimeString();
  const values = [employee.name,employee.email,employee.address,employee.dateOfBirth,employee.dateOfJoining,employee.education,employee.type,employee.role ,employee.password, employee.dateOfEntry,employee.dateOfModify,employee.active];
  try {
    return pool.query(sql, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
};



module.exports=service;

