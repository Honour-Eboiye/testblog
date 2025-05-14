const blogs = require('../model/blog2')
//create blog
const createNewBlog = async (req, res)=>{
  const {title, body, tag} = req.body
  if(!title || !body || !tag ){
    return res
     .status(400)
     .json({success:false, message:"Please fill the required information and try again"})
  }else{
    const {userId} = req.user
    req.body.createdBy = userId
    try {
      const newBlog = await blogs.create(req.body)
      res
      .status(200)
      .json({ success:true, message:"Blog Created Successfully", newBlog })
    } catch (error) {
      res
      .status(500)
      .json({ success:false, message:error.message })
    }
  }
}
//get all blogs
const getAllBlogs = async (req, res)=>{
  try {
    const  allBlogs = await blogs.find()
    res
    .status(200)
    .json({ success:true, allBlogs })
  } catch (error) {
    res
    .status(500)
    .json({ success:false, message:error.message })
  }
}
//get a single blog
const getSingleBlog = async (req, res)=>{
  const {blogId} = req.params

  try {
    const singleBlog = await blogs.findOne({_id:blogId})
    res
    .status(200)
    .json({ success:true, singleBlog })
  } catch (error) {
    res
    .status(500)
    .json({ success:true, message:error.message })
  }
}
//update a blog
const updateBlog = async (req, res)=>{
  //created by the user and has the same blogId
  const { userId } = req.user
  const { blogId } = req.params

  try {
    const updatedBlog = await blogs.findOneAndUpdate(
      { createdBy:userId, _id:blogId },
      req.body,
      { new:true, runValidators:true }
    )
    res
    .status(200)
    .json({ success:true, message:"Blog Updated Successfully!", updatedBlog })
  } catch (error) {
    res
    .status(500)
    .json({ success:false, message:error.message })
  }
}
//delete a blog
const deletedBlog = async (req, res)=>{
  const { userId } = req.user
  const { blogId } = req.params

  try {
    const deletedBlog = await blogs.findOneAndDelete(
      { createdBy:userId, _id:blogId },
      req.body,
      { new:true, runValidators:true }
    )
    res
    .status(200)
    .json({ success:true, message:"Blog Deleted Successfully!" })
  } catch (error) {
    res
    .status(500)
    .json({ success:true, message:error.message })
  }
}

module.exports = {
  createNewBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deletedBlog
}