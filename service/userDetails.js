
var service ={}
const details = {id:"",role:""}
service.setDetails = (id,role) => {
  return new Promise((resolve, reject) => {
    details.id = id;
    details.role = role;
  
  console.log("after setdetails",details.id,details.role);
    resolve();
})
}

service.setRole = (role) => {
  return new Promise((resolve, reject) => {
  details.role = role;
  console.log("after setrole",details.role)
  resolve();
});
}

service.getId = () => {
  return new Promise((resolve, reject) => {
  console.log("in get id : ", details.id)

   
    resolve(details.id);
  })
}
service.getRole= () => {
  console.log("get role called")
  return new Promise((resolve, reject) => {
  console.log("in getRole : ", details.role)
  resolve(details.role);})
}
module.exports=service;