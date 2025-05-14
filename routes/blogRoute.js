const express = require('express')
const router = express.Router()
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog
}  = require('../controller/blog')

router
 .route('/')
 .get(getAllBlogs)
 .post(createBlog)

router
 .route('/:blogId')
 .get(getSingleBlog)
 .patch(updateBlog)
 .delete(deleteBlog)

 module.exports = router