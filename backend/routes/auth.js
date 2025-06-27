const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//POST for signup 
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

//POST for login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "plz Enter fields" });
        }
        //check user login or not
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid Email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Correct Your Password" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ message: "login Success", token });

    } catch (err) {
        console.error("login failed:", err);
        return res.status(500).json({ message: 'internal server error' });
    }
});
module.exports = router;