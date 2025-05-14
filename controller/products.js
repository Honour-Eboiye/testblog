const products = require('../model/products')
const cloudinary = require('cloudinary')
const handleError = require('../controller/utils/handleError')
const fs = require('fs')


const createNewProduct = async ( req, res )=>{
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename:true,
        folder:"Nike"
      }
    )
    const { userId } = req.user
    req.body.image = result.secure_url
    req.body.brand = userId
    const product = await products.create(req.body)
    res
    .status(200)
    .json({ success:true, productCreated:product })
    fs.unlinkSync(req.files.image.tempFilePath)
    
  } catch (error) {
    const errors = handleError(error)
    res
    .status(500)
    .json({ success:false, errors })
  }
}

const getAllProduct = async ( req, res )=>{
  try {
    const allProduct = await products.find()
    res
    .status(200)
    .json({ success:true, allProduct })
  } catch (error) {
    const errors = handleError(error)
    res
    .status(500)
    .json({ success:false, errors })
  }
}

const singleProduct = async = ( req, res )=>{
  
}

module.exports = {
  createNewProduct,
  getAllProduct,
  singleProduct
}