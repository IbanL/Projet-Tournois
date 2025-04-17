import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: true },
    number: { type: Number, required: true },
    player1: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
    player2: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},  
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
    round: { type: Number, required: true },
}, {
    timestamps: true,
});

export default mongoose.model("Match", matchSchema);