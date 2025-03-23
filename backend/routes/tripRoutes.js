const express = require("express");
const Trip = require("../models/Trip");
const UserStats = require("../models/UserStats");
const emissionFactors = require("../helpers/emissionFactors");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const calculatePoints = (emissionsSaved) => Math.floor(emissionsSaved * 10);

const assignBadges = (userStats) => {
    const { totalDistance, totalEmissionsSaved, points } = userStats;
    const newBadges = [];
    if (totalDistance >= 100) newBadges.push("Explorer");
    if (totalEmissionsSaved >= 50) newBadges.push("Eco Warrior");
    if (points >= 500) newBadges.push("Sustainability Champion");
    return newBadges;
};

router.post("/log", authMiddleware, async (req, res) => {
    try {
        const { transportType, distance } = req.body;
        const userId = req.user.userId;

        const emissions = distance * emissionFactors[transportType];

        const carEmissions = distance * emissionFactors["car"];

        const emissionsSaved = carEmissions - emissions;

        const validEmissionsSaved = emissionsSaved > 0 ? emissionsSaved : 0;

        const pointsEarned = Math.floor(validEmissionsSaved * 10); 

        const newTrip = new Trip({ userId, transportType, distance, emissions });
        await newTrip.save();

        let userStats = await UserStats.findOne({ userId });
        if (!userStats) {
            userStats = new UserStats({
                userId,
                totalDistance: distance,
                totalEmissionsSaved: validEmissionsSaved,
                points: pointsEarned,
                badges: []
            });
        } else {
            userStats.totalDistance += distance;
            userStats.totalEmissionsSaved += validEmissionsSaved;
            userStats.points += pointsEarned;
        }

        userStats.badges = assignBadges(userStats);
        await userStats.save();
        
        res.json({ message: "Trip logged successfully", trip: newTrip });
    } catch (error) {
        res.status(500).json({ message: "Error logging trip", error: error.message });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const trips = await Trip.find({ userId: req.user.userId });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trips", error: error.message });
    }
});

module.exports = router;
