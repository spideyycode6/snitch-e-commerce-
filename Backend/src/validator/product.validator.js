import { body, validationResult } from "express-validator";



function validateResult(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: result.array() });
}

export const validateCreateProduct = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").isNumeric().withMessage("Price amount must be a number"),
    body("priceCurrency").notEmpty().withMessage("Price currency is required"),

    validateResult
]
