import { body, param } from "express-validator";

export const validateTournamentId = [
        param("id").isMongoId().withMessage("id du tournoi non valide"),
    ];
    
export const createTournamentValidation = [
        body("name").isLength({ min: 3, max: 200 }).withMessage("le nom faire entre 3 et 200 characteres"),
        body("date").isDate().withMessage("date invalide"),
        body("location").isLength({ min: 3, max: 200 }).withMessage("le lieu faire entre 3 et 200 characteres"),
        body("nbParticipants").isNumeric().withMessage("le nombre de participants doit etre un nombre"),
        body("bracketType").isLength({ min: 3, max: 200 }).withMessage("le type de bracket faire entre 3 et 200 characteres"),
]

export const updateTournamentValidation = [
        param("id").isMongoId().withMessage("id du tournoi non valide"),
        body("name").isLength({ min: 3, max: 200 }).withMessage("le nom faire entre 3 et 200 characteres"),
        body("date").isDate().withMessage("date invalide"),
        body("location").isLength({ min: 3, max: 200 }).withMessage("le lieu faire entre 3 et 200 characteres"),
]

export const removePlayerValidation = [
        param("id").isMongoId().withMessage("id du tournoi non valide"),
]