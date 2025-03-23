const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    transportType: { type: String, required: true, enum: ["car", "bus", "bike", "train", "walking"] },
    distance: { type: Number, required: true }, 
    emissions: { type: Number, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);
