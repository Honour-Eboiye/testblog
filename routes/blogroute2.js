const express = require('express')
const router = express.Router()
const {
  createNewBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deletedBlog
} = require('../controller/blog2')

router
 .route('/')
 .get(getAllBlogs)
 .post(createNewBlog)

router
 .route('/:blogId')
 .get(getSingleBlog)
 .patch(updateBlog)
 .delete(deletedBlog)


module.exports = router