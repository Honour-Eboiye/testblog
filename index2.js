const express = require('express')
require('dotenv').config()
const PORT  = process.env.PORT || 5000
const app =  express()
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter2')
const authenticate = require('./middleware/authenticator')
const blogRouter = require('./routes/blogroute2.js')
const notFound = require('./controller/utils/notFound.js')
const { userSchema } = require('./model/users2.js')
const productRoute = require('./routes/productRoute.js')
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2

//CLOUDINARY CONFIGURATION
cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
})

const start = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URI, { autoIndex: true })
    await mongoose.model("users", userSchema).syncIndexes()
    app.listen(PORT, ()=>console.log(`DB CONNECTED AND SEVER IS RUNNING ON PORT ${PORT}`))
  } catch (error) {
    console.log(error.message)
  }
}
start()

//MIDDLEWARES
app.use(fileupload({ useTempFiles:true }))
app.use(express.json())
app.use( '/api/v1', authRouter )
app.use( '/api/v1/blogs', authenticate, blogRouter )
app.use( '/api/v1/products', authenticate, productRoute )
app.use(notFound)

