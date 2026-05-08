import { body, validationResult } from "express-validator";



function validateResult(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: result.array() });
}


export const validateRegisterUser = [
    body("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long")
        .toLowerCase()
        .withMessage("First name cannot have numbers or special characters")
        .trim(),

    body("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long")
        .toLowerCase()
        .withMessage("Last name cannot have numbers or special characters")
        .trim(),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid")
        .toLowerCase()
        .trim(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .isStrongPassword()
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number")
        .trim(),

    body("contact")
        .notEmpty()
        .withMessage("Contact is required")
        .matches(/^\d{10}$/)
        .withMessage("Contact must be 10 digits number")
        .customSanitizer((value) => {
            return `+91${value}`;
        })
        .trim(),
    
    validateResult
];

export const validateLoginUser = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid")
        .toLowerCase()
        .trim(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .isStrongPassword()
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number")
        .trim(),

    validateResult
];