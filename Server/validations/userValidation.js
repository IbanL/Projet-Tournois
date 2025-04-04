import { body, param } from "express-validator";

export const validateUserId = [
  param("id").isMongoId().withMessage("id non valide"),
]

export const registerValidation = [
  body("email").isEmail().withMessage("email invalide"),

  body("password").isLength({ min: 6, max: 200 }).withMessage("le mot de pass doit contenire entre 6 et 200 characteres"),

  body("name").isLength({ min: 3, max: 200 }).withMessage("le nom faire entre 3 et 200 characteres"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("les mot de passes ne correspondent pas");
    }
    return true;
  })];


export const updateValidation = [
  param("id").isMongoId().withMessage("id non valide"),

  body("email").isEmail().withMessage("email invalide"),

  body("password").isLength({ min: 6, max: 200 }).withMessage("le mot de pass doit contenire entre 6 et 200 characteres"),

  body("name").isLength({ min: 3, max: 200 }).withMessage("le nom faire entre 3 et 200 characteres"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("les mot de passes ne correspondent pas");
    }
    return true;
  })];

export const loginValidation = [
  body("email").isEmail().withMessage("email invalide"),

  body("password").isLength({ min: 6, max: 200 }).withMessage("le mot de pass doit contenire entre 6 et 200 characteres"),
];

