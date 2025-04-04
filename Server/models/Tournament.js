import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true },
    nbParticipants: { type: Number, required: true },
    bracketType: { type: String, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
}, {
    timestamps: true,
});

export default mongoose.model("Tournament", tournamentSchema);