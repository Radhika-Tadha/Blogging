const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer'); // import multer config
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");

// PUT: Update Profile (name, dob, bio, image)
router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("ooo", userId);

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    console.log("ooo", updatedUser);
    return res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});



// Update profile with image
router.put("/update-profile", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, dob, bio } = req.body;

    console.log("BODY:", req.body); // ✅ Check if values are missing
    console.log("FILE:", req.file); // ✅ Check if image file uploaded

    const userId = req.userId;
    const updateData = {
      name: req.body.name,
      dob: req.body.dob,
      bio: req.body.bio,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });

  } catch (err) {
    console.error("Update profile error", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

