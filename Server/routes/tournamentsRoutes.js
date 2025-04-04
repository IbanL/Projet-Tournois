import express from "express";
const router = express.Router();
import validateRequest from "../middlewares/validateRequest.js";

import {
    getTournaments,
    getTournament,
    createTournament,
    updateTournament,
    deleteTournament,
} from "../controllers/tournamentController.js";

router.get("/", getTournaments);
router.post("/", createTournament);
router.get("/:id", getTournament);
router.put("/:id",updateTournament);
router.delete("/:id", deleteTournament);


export default router;