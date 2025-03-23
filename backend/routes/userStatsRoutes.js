const express = require("express");
const UserStats = require("../models/UserStats");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const userStats = await UserStats.findOne({ userId: req.user.userId }); 

        if (!userStats) {
            return res.status(404).json({ message: "User stats not found." });
        }

        res.json(userStats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats", error: error.message });
    }
});

module.exports = router;
