const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  content: {
    type: String,
    required: true,
  },

  image: {
    type: String, // store filename or full URL
    default: "default.png",
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // refer to User model
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
