const jwt = require('jsonwebtoken');
let secret = "bxu9en@3sinjo";

function checkAuth(req,res,next){
  const token=req.headers.authorization;
  if(!token){
    return res.status(401).json({message:"token is not provided",status:401 }) 
  }

  const decoded=jwt.verify(token,secret)
  if(!decoded){
     return res.status(401).json({message:"token has not been decoded",status:401 }) 
    
  }
  req.email=decoded.email;

  next()
  
}

module.exports=checkAuth;
