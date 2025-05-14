const {
  users
  
} = require('../model/users2')

const handleError = require('./utils/handleError')

const login = async (req, res)=>{
  const {email, password} = req.body
  
  if(!email || !password){
    res
    .status(400)
    .json({success:false, message:"Kindly fill the required information and try again"})
  }else{
    const userExists = await users.findOne({email})

    if(userExists){
      const isAuthenticated = await userExists.comparism(password)

      if(isAuthenticated){
        const jwt = userExists.genToken()
        res
        .status(200)
        .json({success:true, message:`Welcome ${userExists.firstname}`, token:jwt})
      }else{
        try {
          throw new Error('invalid credentials')
        } catch (error) {
          const errors = handleError(error)
          res
          .status(401)
          .json({errors})
        }
      }
    }else{
      try{
        throw new Error('not registered')
      }catch(error){
        const errors = handleError(error)
        res
        .status(404)
        .json({errors})
      }
    }
  }
}

const register  = async (req, res)=>{
  const {firstname, lastname, email, password} = req.body
  if(!firstname || !lastname || !email || !password){
    // res
    // .status(400)
    // .json({success:false, message:"Please input all required field"})
    try {
      throw new Error('empty fields')
    } catch (error) {
      const errors = handleError(error)
      res
      .status(500)
      .json({ errors })
    }
  }else{
    const alreadyRegistered = await users.findOne({email})
    if(alreadyRegistered){
      try{
        throw new Error('email exists')
      }catch(error){
        const errors = handleError(error)
       return res
        .status(500)
        .json({errors})
      }
    }

    try {
      const newUser = await users.create({firstname, lastname, email, password})
      res.status(200).json({success:true, message:"User Created Successfully!!!", newUser})
    } catch (error) {
      const errors = handleError(error)
      res
      .status(500)
      .json({errors})
    }
  }
}

module.exports = {
  login,
  register
}