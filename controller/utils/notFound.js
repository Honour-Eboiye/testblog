const notFound = (req, res)=>{
  res
  .status(404)
  .send("ERROR 404 PAGE NOT FOUND")
}

module.exports = notFound