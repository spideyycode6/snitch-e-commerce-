import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateCreateProduct } from "../validator/product.validator.js";
import { createProductController, getAllProductsController, getSellerProductsController , getproductByIdController} from "../controller/product.controller.js";
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const router = Router();


/*
    *@route POST /api/product/ 
*@desc Create a new product (seller only)
*@access Private (seller only)
 */

router.post('/create-product', authMiddleware, upload.array('images', 7), validateCreateProduct, createProductController);

/*
* @route GET /api/product/seller-products
* @desc Get all products for the authenticated seller
* @access Private (seller only)
*/


router.get('/seller-products', authMiddleware, getSellerProductsController);

/*
* @route GET /api/product/all-products
* @desc Get all products for the authenticated seller
* @access public
*/

router.get('/', getAllProductsController);


router.get('/product/:id', getproductByIdController);

export default router;