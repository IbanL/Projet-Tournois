import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: true },
    player1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    level: { type: String, required: true },
}, {
    timestamps: true,
});

export default mongoose.model("Match", matchSchema);