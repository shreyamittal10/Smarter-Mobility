const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;  

router.post("/signup", async (req, res) => {
    try {
        let { name, email, password } = req.body;

        name = name.trim();
        email = email.trim();
        password = password.trim();

        if (!email.includes("@") || !email.includes(".")) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, message: "Signup successful!" });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Signup failed", error: error.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email.trim();
        password = password.trim();

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
});

module.exports = router;
