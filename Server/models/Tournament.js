import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true },
    nbParticipants: { type: Number, required: true },
    bracketType: { type: String, required: true },
    nbRounds: { type: Number, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    matches: [{
        rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
        roundNb: { type: Number, required: true },
    }],

}, {
    timestamps: true,
});

export default mongoose.model("Tournament", tournamentSchema);