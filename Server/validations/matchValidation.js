import {body, param} from "express-validator";

export const validateMatchId = [
    param("id").isMongoId().withMessage("id du match non valide"),
]