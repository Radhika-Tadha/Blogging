const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer'); // import multer config
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");

// Update profile with image
router.put("/update-profile", authMiddleware, upload.single("image"), async (req, res) => {
  try {
     const userId = req.userId;
    const { name, phone, dob, bio } = req.body;

    console.log("BODY:", req.body); // ✅ Check if values are missing
    console.log("FILE:", req.file); // ✅ Check if image file uploaded
   
    const updateData = {
      name ,
      phone,
      dob ,
      bio ,
      // ...(req.file && {image:req.file.filename})
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

