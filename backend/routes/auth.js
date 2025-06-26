const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');

//POST for signup 
router.post('/signup', async (req, res) => {
    try {
        console.log("Incoming signup data:", req.body);
        const { name, email, password } = req.body;
        //check user exist
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'user already exist' });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ message: 'user created' });
    } catch (error) {
        console.error("Signup failed....:", error);
        return res.status(500).json({ message: 'internal server error' });
    }
});

module.exports = router;