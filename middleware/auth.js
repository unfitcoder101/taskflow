const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
 const authHeader = req.headers.authorization

if(!authHeader){
  return res.status(401).json({error:"No token"})
}

const token = authHeader.split(" ")[1]  // 🔥 important

  try{
    const decoded = jwt.verify(token, "secretkey")
    req.userId = decoded.userId
    next()
  }catch(err){
    res.status(401).json({error:"Invalid token"})
  }
}

module.exports = auth