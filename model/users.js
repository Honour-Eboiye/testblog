const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')
const isCorrect = validator.isEmail
const jwt = require('jsonwebtoken')



const userSchema = new Schema
(
  {
    "firstname":{
      type:String,
      required:[true, "Please input your firstname"]
    },
    "lastname":{
      type:String,
      required:[true, "Please input your lastname"]
    },
    "email":{
      type:String,
      required:[true, "Please input your email"],
      validate:[isCorrect, "Please enter a valid email address"]
    },
    "password":{
      type:String,
      required:[true, "Please input your password"],
      minLength:[8, "The minimum length is 8 characters"]
    }
  }, 
  {timestamps:true}
)
userSchema.pre("save", async function(next) {
  const salt  =  await bcrypt.genSalt()
  this.password =  await bcrypt.hash(this.password, salt)
  next()
})
userSchema.methods.comparePasswords = async function(userPassword) {
  return await bcrypt.compare(userPassword, this.password);
}
userSchema.methods.genToken = function(){
  return jwt.sign(
    {
      userId:this._id,
      name:this.firstname
    },
    process.env.happy_boy,
    {
      expiresIn:"10d"
    }
  )
}

const user = mongoose.model("users2", userSchema)
module.exports = {
  user,
  comparePasswords: userSchema.methods.comparePasswords
}
