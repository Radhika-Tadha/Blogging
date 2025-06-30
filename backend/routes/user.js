const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");

// Update profile with image
router.put("/update-profile", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = {
      name: req.body.name,
      dob: req.body.dob,
      bio: req.body.bio,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
