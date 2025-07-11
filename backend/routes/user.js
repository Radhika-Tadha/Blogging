const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer'); // import multer config
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");
const bcrypt = require("bcrypt");


// Update profile with image
router.put("/update-profile", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, dob, bio } = req.body;

    console.log("BODY:", req.body); // ✅ Check if values are missing
    console.log("FILE:", req.file); // ✅ Check if image file uploaded

    const updateData = {
      name,
      phone,
      dob,
      bio,
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
// forgot password
router.put("/forgot-password", async (req, res) => {
  try {
    const userId = req.userId;
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", password);


    if (!email || !password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // user.password = hashedPassword;
    // await user.save(); // important: must save!
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true, runValidators: false }
    );

    res.json({ message: "Password Reset.." });

  } catch (error) {
    console.error("Update password error", error);
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = router;

