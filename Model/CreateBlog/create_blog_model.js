const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  estimatedTime: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;