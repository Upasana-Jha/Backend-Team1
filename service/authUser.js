const { getId,getRole } = require('../service/userDetails.js');
var service = {}

service.authUser = async (req,res,next)=>{
    let userId = req.params.id;
    userId = userId.toString();
    console.log("user id: ", userId)
    let employeeid = await getId();
    employeeid = employeeid.toString();
    let role = await getRole();
    console.log("after get id employeeid",employeeid)
    if(userId === employeeid || role === "admin")
    {
      console.log("inside of authUser")
      next();
    }
    else{
      return res.status(401).json("You do not have permission!");
    }
  
  }
 
module.exports=service;
