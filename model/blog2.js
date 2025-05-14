const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:[ true , "This field is required!" ],
      unique:[ true , "This title has been used before" ],
      minLength:[ 4 , "The minimum amount chracters for the title is four (4)" ]
    },
    body:{
      type:String,
      required:[ true , "This field is required!" ],
      unique:[ true , "This exact body has been used before" ],
      minLength:[ 20 , "The minimum amount of characters for the body is (20) twenty "]
    },
    tag:{
      type:String,
      required:[ true , "This field is required!" ],
      enum:[ "Entertainment" , "Lifestyle" , "Politics" , "Sport" ,  "Fashion" , "Trending" , "Music" ]
    },
    createdBy:{
      type:mongoose.Types.ObjectId,
      required:[ true , "This field is required!" ]
    }
  },{ timestamps:true }
)

module.exports = mongoose.model( "blogs2" , blogsSchema )