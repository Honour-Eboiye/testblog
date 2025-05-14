const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name:{
      type:String,
      required:[ true, " Name is required " ]
    },
    price:{
      type:Number,
      required:[ true, "Price is required" ]
    },
    brand:{
      type:mongoose.Types.ObjectId,
      required:[ true, "Brand is required" ]
    },
    image:{
      type:String,
      required:[ true, "Image is required" ]
    }
  }, {timeStamps:true}
)

module.exports = mongoose.model( "products", productSchema )
