const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  dob: {
    type: String, // Store as YYYY-MM-DD string
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  image: {
    type: String, // filename like "1234567.png"
    default: "",
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model("User", userSchema);
