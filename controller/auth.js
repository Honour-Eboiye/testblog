const {
  user,
  comparePasswords
} = require('../model/users')
const login = async (req, res)=>{
  const {email, password} = req.body
  if(!email || !password){
    res
    .status(400)
    .json({success:false, message:"Kindly fill the required information"})
  }else{
    //user is not register
    //invalid credentials

    //CHECK IF USER EXISTS
    const userExist = await user.findOne({email})


    if(!userExist){
      res
      .status(404)
      .json({success:false, message:"User not found"})
    }else{
      const authenticated = await userExist.comparePasswords(password); // Ensure comparePassword is defined in the user model

      //IF USER (EMAIL) EXIST CHECK IF THE PASWORD IS CORRECT
      if(authenticated){
        const jwt = userExist.genToken()
        res
        .status(200)
        .json({success:true, message:`Welcome ${userExist.firstname}`,token:jwt})
      }else{
        res
        .status(401)
        .json({success:false, message:"Invalid email or password" })
      }
    }

  }
}

const register =  async (req, res)=>{
  const {firstname, lastname, email, password} = req.body
  if(!firstname || !lastname || !email || !password){
    res.status(400).json({success:false, message:"Please input all required fields and try again!"})
  }else{
    try {
      const newUser = await user.create({ firstname, lastname, email, password })
      res.status(200).json({success:true, user:newUser})
    } catch (error) {
      res.status(400).json({success:false, message:error.message})
    }
  }
}

module.exports = {
  login,
  register
}