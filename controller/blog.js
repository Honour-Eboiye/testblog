const blogs = require('../model/blogs')

//create a singleblog
const createBlog = async (req, res)=>{
  try{
    const {userId} = req.user
    req.body.createdBy = userId
    const newBlog = await blogs.create(req.body)
    return res
     .status(200)
     .json({success:true, newBlog})
  }catch(error){
    return res
     .status(500)
     .json({success:false, message:error.message})
  }

}

//all blogs
const getAllBlogs = async (req, res) =>{
  try {
    const allBlogs = await blogs.find()
   return  res
     .status(200)
     .json({success:true, allBlogs})
  } catch (error) {
    return res
     .status(500)
     .json({success:false, message:error.message})
  }
}
//single blog
const getSingleBlog = async (req, res)=>{
  const {blogId} = req.params
  try {
    const singleBlog = await blogs.findById(blogId)
    return res
     .status(200)
     .json({success:true, singleBlog})
  } catch (error) {
    return res
     .status(500)
     .json({success:false, message:error.message})
  }
}
//update
const updateBlog = async (req, res)=>{
  const {blogId} = req.params
  if (!req.user) {
    return res.status(400).json({ success: false, message: "User information is missing" });
  }
  const {userId} = req.user
  
  try {
    const updatedBlog = await blogs.findOneAndUpdate(
      {_id:blogId},
      req.body,
      // Ensures that Mongoose runs validation on the updated fields
      {new:true, runValidators:true}
    )
    return res
     .status(200)
     .json({success:true, message:"Blog Updated Successfully", updatedBlog})
  } catch (error) {
    return res
     .status(500)
     .json({success:false, message:error.message})
  }
}
//delete
const deleteBlog = async (req, res) =>{
  const {blogId} = req.params
  const {userId} = req.user
  try {
    const deletedBlog = await blogs
     .findOneAndDelete({ _id:blogId},
      {new:true, runValidators:true}
     )
    return res
     .status(200)
     .json({success:true, deletedBlog})
  } catch (error) {
    return res
     .status(500)
     .json({success:true, message:error.message})
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog
}
