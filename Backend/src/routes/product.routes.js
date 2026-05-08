import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateCreateProduct } from "../validator/product.validator.js";
import { createProductController } from "../controller/product.controller.js";
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const router = Router();

router.post('/', authMiddleware, upload.array('images', 7), validateCreateProduct, createProductController);

export default router;