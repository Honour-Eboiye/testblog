const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema
(
  {
    "firstname":{
      type:String,
      required:[true, "Please enter your firstname"]
    },
    "lastname":{
      type:String,
      required:[true, "Please enter your lastname"]
    },
    "email":{
      type:String,
      unique: [ true, "This email already exists"],
      required:[true, "Please enter your email"],
      validate:[validator.isEmail, "Please enter a valid email address"],
    },
    "password":{
      type:String,
      required:[true, "Please enter your password"],
      minLength:8,
      maxLength:16
    },
  }, 
  {timestamps:true}
) 

userSchema.pre("save", async function (next){
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  // next()
}),

userSchema.methods.comparism = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.genToken = function(){
  return jwt.sign(
    {
      userId:this._id,
      name:this.firstname
    },
    process.env.happy_boy,
    {expiresIn:"10d"}
  )
}

module.exports = {
  users:mongoose.model("users", userSchema),
  userSchema
}