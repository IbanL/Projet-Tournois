import {body, param} from "express-validator";

export const validateMatchId = [
    param("id").isMongoId().withMessage("id du match non valide"),
]
export const validateMatchWinner = [
    param("id").isMongoId().withMessage("id du match non valide"),
    body("winner").isMongoId().withMessage("id de l'utilisateur non valide"),
]