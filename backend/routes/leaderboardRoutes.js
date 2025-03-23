const express = require("express");
const UserStats = require("../models/UserStats");
const User = require("../models/User"); 

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const topUsers = await UserStats.find()
            .sort({ points: -1 }) 
            .limit(10) 
            .populate("userId", "name email"); 

        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
    }
});

module.exports = router;
