import express from "express";
const router = express.Router();
import validateRequest from "../middlewares/validateRequest.js";

import {
    getMatches,
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch,
} from "../controllers/matchController.js";

router.get("/", getMatches);
router.post("/", createMatch);
router.get("/:id", getMatch);
router.put("/:id",updateMatch);
router.delete("/:id", deleteMatch);

export default router;