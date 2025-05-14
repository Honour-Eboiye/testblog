const express = require('express')
const router = express.Router()
const {
  createNewProduct,
  getAllProduct,
  singleProduct
} = require( '../controller/products' )

router
.route('/')
.get(getAllProduct)
.post(createNewProduct)

router
.route('/:productId')
.get(singleProduct)

module.exports = router