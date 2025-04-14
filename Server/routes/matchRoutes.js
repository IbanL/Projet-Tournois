import express from "express";
const router = express.Router();
import validateRequest from "../middlewares/validateRequest.js";

import protect from "../middlewares/authMiddleware.js";

import { validateMatchId } from "../validations/matchValidation.js";

import {
    getMatches,
    getMatch,
    updateMatch,
} from "../controllers/matchController.js";

router.get("/", getMatches);
router.get("/:id",validateMatchId, validateRequest, getMatch);
router.put("/:id",updateMatch);

export default router;