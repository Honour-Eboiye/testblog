const jwt = require('jsonwebtoken')

const authenticate = (req, res, next)=>{
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    res
    .status(401)
    .json({success:false, message:"Auth Failed"})
  }else{
    //seperate the token form the authorization head
    const token  = authHeader.split(" ")[1]
    //verify the token to see if its correct
    try {
      const decoded = jwt.verify(token, process.env.happy_boy)
      req.user = decoded
      next()
    } catch (error) {
      res
      .status(401)
      .json({success:false, message:"Auth Failed!"})
    }
  }

}

module.exports = authenticate