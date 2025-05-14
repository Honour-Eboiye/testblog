const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "This field is required!!"],
      minLength: [4, "The mininum length is 4 characters"],
      unique: [true, "This name has been used"]
    },
    description: {
      type: String,
      minLength: [20, "The minimum length is 20 characters"],
      required: [true, "This field is required!"]
    },
    tag: {
      type: String,
      required: [true, "Select a tag from the list above!"],
      enum: ["Technology", "Health Care", "LifeStyle", "Politics", "E-commerce"]
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref:"User",
      required:[true, "Please provide a writer"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema)