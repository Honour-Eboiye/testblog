require('dotenv').config();
const express = require('express');
const app  = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/authRouter')
const authenticate = require('./middleware/authenticator');
const error404 = require('./routes/error404')
const blogRouter = require('./routes/blogRoute')

//MIDDLEWARES
app.use(express.json())
app.use('/api/v1', authRouter)
app.use('/api/v1/blogs', authenticate, blogRouter)

// `console.log(typeof authenticate); // Should log 'function'
// console.log(typeof authRouter);       // Should log 'function'
// console.log(typeof blogRouter);   // Should log 'function'`

const start = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URI)
    app.listen(PORT, ()=>{
      console.log(`DB connected and server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()
