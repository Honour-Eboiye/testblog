const jwt  = require('jsonwebtoken')

const authenticate2 = (req, res, next)=>{
  const authorizationHead = req.headers.authorizationHead
  if (!authorizationHead || !authorizationHead.startsWith('Bearer ')) {
    res
    .status(401)
    .json({success:false, message:'Auth Failed!'})
  } else {
    try {
      const token  = authorizationHead.split(' ')[1]
      const decoded = jwt.verify(token, process.env.happy_boy)
      req.user = decoded
      res
      .status(200)
      .json({success:true, message:req.user})
      next()
    } catch (error) {
      res
      .status(401)
      .json({success:false, message:'Auth Failed!' })
    }
  }
}

module.exports = authenticate2