import express from "express";
const router = express.Router();
import validateRequest from "../middlewares/validateRequest.js";

import protect from "../middlewares/authMiddleware.js";

import { validateMatchId, validateMatchWinner } from "../validations/matchValidation.js";

import {
    getMatches,
    getMatch,
    setWinnerMatch,
} from "../controllers/matchController.js";

router.get("/", getMatches);
router.get("/:id",validateMatchId, validateRequest, getMatch);
router.put("/:id",validateMatchWinner, validateRequest, setWinnerMatch);

export default router;