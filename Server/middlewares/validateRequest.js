import validator from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export default validateRequest