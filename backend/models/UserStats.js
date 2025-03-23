const mongoose = require("mongoose");

const UserStatsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalDistance: { type: Number, default: 0 }, 
    totalEmissionsSaved: { type: Number, default: 0 }, 
    points: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("UserStats", UserStatsSchema);
