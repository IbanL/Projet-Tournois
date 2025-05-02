import express from "express";
const router = express.Router();
import validateRequest from "../middlewares/validateRequest.js";
import protect from "../middlewares/authMiddleware.js";

import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    loginUser,
    logoutUser,
} from "../controllers/userController.js";

import {
    validateUserId,
    registerValidation,
    updateValidation,
    loginValidation,
} from "../validations/userValidation.js";

router.get("/", getUsers);
router.post("/register",registerValidation, validateRequest, createUser);        
router.get("/:id",validateUserId, validateRequest, getUser);
router.put("/:id", protect, updateValidation, validateRequest, updateUser);
router.post("/login",loginValidation, validateRequest, loginUser);
router.post("/logout", protect, logoutUser);

export default router;