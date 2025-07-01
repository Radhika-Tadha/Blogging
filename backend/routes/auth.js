const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");


const router = express.Router();

///POST for signup 
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }
        //check user exist
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "user already exist" });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ message: 'Signup Successfully' });
    } catch (err) {
        console.error("signup failed:", err);
        return res.status(500).json({ message: 'internal server error' });
    }
});


// POST: Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log("Token:", token);
        return res.json({
            message: "Login success",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },

        });

    } catch (err) {
        console.error("Login failed:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// GET: Get Current User (used in profile page)
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.json({ user });
    } catch (err) {
        console.error("Fetch user failed:", err);
        return res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
