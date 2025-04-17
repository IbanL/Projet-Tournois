import express from "express";
const router = express.Router();
import validateRequest from "../middlewares/validateRequest.js";
import protect from "../middlewares/authMiddleware.js";
import {
    getTournaments,
    getTournament,
    createTournament,
    userRegisterTournament,
    updateTournament,
    removePlayer,
    deleteTournament,
    startTournament,
} from "../controllers/tournamentController.js";

import {
    validateTournamentId,
    createTournamentValidation,
    updateTournamentValidation,
    removePlayerValidation,
} from "../validations/tournamentValidation.js";

router.get("/", getTournaments);
router.post("/", protect, createTournamentValidation,  validateRequest,  createTournament);
router.get("/:id", validateTournamentId, validateRequest, getTournament);
router.post("/:id/register", protect, validateTournamentId, validateRequest, userRegisterTournament);
router.put("/:id", protect, updateTournamentValidation, validateRequest, updateTournament);
router.delete("/:id/player", protect, removePlayerValidation, validateRequest, removePlayer);
router.delete("/:id", protect, validateTournamentId, validateRequest, deleteTournament);
router.post("/:id/start", protect, validateTournamentId, validateRequest, startTournament);

export default router;